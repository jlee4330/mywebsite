import { useEffect, useRef, useState } from 'react';
import { BLOG_CONFIG } from '../config/blog.js';
import initialPosts from '../data/blogPosts.json';
import BlogEditor from './blog/BlogEditor.jsx';
import BlogPostDetail from './blog/BlogPostDetail.jsx';
import BlogPostList from './blog/BlogPostList.jsx';

function createEmptyPost() {
  return {
    title: '',
    category: 'Research',
    date: new Date().toISOString().slice(0, 7).replace('-', '.'),
    readTime: '3 min read',
    tags: '',
    teaser: '',
    videoUrl: '',
    summary: '',
    content: '',
  };
}

function loadPosts() {
  try {
    const savedPosts = localStorage.getItem(BLOG_CONFIG.postsStorageKey);
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      if (Array.isArray(parsedPosts)) return parsedPosts;
    }
  } catch (error) {
    console.error('Failed to load locally saved blog posts:', error);
  }

  return initialPosts || [];
}

export default function BlogSection({ selectedPostId, onSelectPost, onPostsChange }) {
  const [posts, setPosts] = useState(loadPosts);
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(BLOG_CONFIG.adminStorageKey) === 'true',
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [formData, setFormData] = useState(createEmptyPost);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [editorMode, setEditorMode] = useState('write');
  const [formError, setFormError] = useState('');
  const [mediaOpen, setMediaOpen] = useState(false);
  const contentInputRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    onPostsChange?.(posts);
  }, [posts, onPostsChange]);

  const savePosts = async nextPosts => {
    setPosts(nextPosts);

    try {
      localStorage.setItem(BLOG_CONFIG.postsStorageKey, JSON.stringify(nextPosts));
      await fetch(BLOG_CONFIG.saveEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts: nextPosts }),
      });
    } catch (error) {
      console.error('Failed to sync blog posts to the server:', error);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setPasswordInput('');
    setLoginError('');
  };

  const handleLogin = async event => {
    event.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(BLOG_CONFIG.loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (!response.ok) {
        const result = await response.json();
        setLoginError(result.error || 'Unable to log in.');
        return;
      }

      setIsAdmin(true);
      sessionStorage.setItem(BLOG_CONFIG.adminStorageKey, 'true');
      closeLoginModal();
    } catch (error) {
      console.error('Failed to log in:', error);
      setLoginError('Unable to connect to the local blog server.');
    }
  };

  const handleLogout = () => {
    fetch(BLOG_CONFIG.logoutEndpoint, { method: 'POST' }).catch(error => {
      console.error('Failed to close the blog session:', error);
    });
    setIsAdmin(false);
    sessionStorage.removeItem(BLOG_CONFIG.adminStorageKey);
    setIsEditing(false);
  };

  const resetEditorState = () => {
    setIsEditing(false);
    setEditingPostId(null);
    setEditorMode('write');
    setFormError('');
    setMediaOpen(false);
  };

  const startNewPost = () => {
    setEditingPostId(null);
    setFormData(createEmptyPost());
    setEditorMode('write');
    setFormError('');
    setMediaOpen(false);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditPost = (post, event) => {
    event?.stopPropagation();
    setEditingPostId(post.id);
    setFormData({
      title: post.title || '',
      category: post.category || 'Research',
      date: post.date || createEmptyPost().date,
      readTime: post.readTime || '3 min read',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      teaser: post.teaser || '',
      videoUrl: post.videoUrl || '',
      summary: post.summary || '',
      content: typeof post.content === 'string' ? post.content : '',
    });
    setEditorMode('write');
    setFormError('');
    setMediaOpen(Boolean(post.teaser || post.videoUrl));
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = (postId, event) => {
    event?.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    savePosts(posts.filter(post => post.id !== postId));
    if (selectedPostId === postId) onSelectPost(null);
  };

  const handleSavePost = event => {
    event.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Add a title before publishing this post.');
      titleInputRef.current?.focus();
      return;
    }

    const postId = editingPostId || (
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      || `post-${Date.now()}`
    );
    const post = {
      id: postId,
      title: formData.title.trim(),
      category: formData.category.trim() || 'General',
      date: formData.date.trim(),
      readTime: formData.readTime.trim() || '3 min read',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      teaser: formData.teaser.trim() || undefined,
      videoUrl: formData.videoUrl.trim() || undefined,
      summary: formData.summary.trim(),
      content: formData.content,
    };
    const nextPosts = editingPostId
      ? posts.map(currentPost => currentPost.id === editingPostId ? post : currentPost)
      : [post, ...posts];

    savePosts(nextPosts);
    resetEditorState();
    onSelectPost(post);
    setSaveSuccessMsg('Post saved successfully.');
    window.setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const insertMarkdown = (prefix, suffix = '', fallbackText = 'text', prefixEachLine = false) => {
    const input = contentInputRef.current;
    const start = input?.selectionStart ?? formData.content.length;
    const end = input?.selectionEnd ?? start;
    const selectedText = formData.content.slice(start, end) || fallbackText;
    const formattedText = prefixEachLine
      ? selectedText.split('\n').map(line => `${prefix}${line}`).join('\n')
      : `${prefix}${selectedText}${suffix}`;

    setFormData(current => ({
      ...current,
      content: `${current.content.slice(0, start)}${formattedText}${current.content.slice(end)}`,
    }));
    setEditorMode('write');

    requestAnimationFrame(() => {
      contentInputRef.current?.focus();
      contentInputRef.current?.setSelectionRange(start, start + formattedText.length);
    });
  };

  const updateFormField = (field, value) => {
    setFormData(current => ({ ...current, [field]: value }));
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);
  const categories = ['All', ...new Set(posts.map(post => post.category).filter(Boolean))];
  const filteredPosts = posts.filter(
    post => selectedCategory === 'All' || post.category === selectedCategory,
  );

  return (
    <section id="blog" className="content-section blog-section">
      {showLoginModal && (
        <div className="blog-modal-backdrop" onClick={closeLoginModal}>
          <div className="blog-modal" onClick={event => event.stopPropagation()}>
            <h3>Admin Login</h3>
            <p>Enter your password to add or edit blog posts.</p>
            <form onSubmit={handleLogin}>
              <label className="blog-modal-label" htmlFor="blog-admin-password">Password</label>
              <input
                id="blog-admin-password"
                type="password"
                className="blog-modal-input"
                value={passwordInput}
                onChange={event => setPasswordInput(event.target.value)}
                autoFocus
              />
              {loginError && <div className="blog-modal-error">{loginError}</div>}
              <div className="blog-modal-buttons">
                <button type="button" className="blog-btn-secondary" onClick={closeLoginModal}>Cancel</button>
                <button type="submit" className="blog-btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="blog-header-row">
        <h2 className="section-title">Blog & Thoughts</h2>
        {!isAdmin ? (
          <button className="blog-admin-btn" onClick={() => setShowLoginModal(true)} title="Admin Login">Admin</button>
        ) : (
          <div className="blog-header-actions">
            {!isEditing && <button className="blog-btn-primary" onClick={startNewPost}>New Post</button>}
            <button className="blog-admin-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {isAdmin && !isEditing && (
        <div className="blog-admin-banner">
          <span className="blog-admin-badge">Admin mode</span>
          <div className="blog-admin-actions">
            <button className="blog-btn-primary" onClick={startNewPost}>Write New Post</button>
          </div>
        </div>
      )}

      {saveSuccessMsg && <div className="blog-save-success" role="status">{saveSuccessMsg}</div>}

      {isEditing ? (
        <BlogEditor
          categories={categories}
          contentInputRef={contentInputRef}
          editorMode={editorMode}
          editingPostId={editingPostId}
          formData={formData}
          formError={formError}
          mediaOpen={mediaOpen}
          titleInputRef={titleInputRef}
          onCancel={resetEditorState}
          onFieldChange={updateFormField}
          onFormat={insertMarkdown}
          onMediaToggle={event => setMediaOpen(event.currentTarget.open)}
          onModeChange={setEditorMode}
          onSubmit={handleSavePost}
        />
      ) : selectedPost ? (
        <BlogPostDetail
          isAdmin={isAdmin}
          post={selectedPost}
          onBack={() => onSelectPost(null)}
          onDelete={event => handleDeletePost(selectedPost.id, event)}
          onEdit={event => startEditPost(selectedPost, event)}
        />
      ) : (
        <BlogPostList
          categories={categories}
          isAdmin={isAdmin}
          posts={filteredPosts}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onDelete={handleDeletePost}
          onEdit={startEditPost}
          onSelectPost={onSelectPost}
          onStartNewPost={startNewPost}
        />
      )}
    </section>
  );
}
