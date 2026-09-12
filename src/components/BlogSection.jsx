import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { BLOG_CONFIG } from '../config/blog.js';
import initialPosts from '../data/blogPosts.json';
import { replaceBlogPosts, subscribeToBlogPosts } from '../services/blogRepository.js';
import { firebaseAuth } from '../services/firebase.js';
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

export default function BlogSection({ selectedPostId, onSelectPost, onPostsChange }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
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

  useEffect(() => onAuthStateChanged(firebaseAuth, user => {
    setIsAdmin(user?.email === BLOG_CONFIG.adminEmail);
  }), []);

  useEffect(() => subscribeToBlogPosts(({ initialized, posts: remotePosts }) => {
    setPosts(initialized ? remotePosts : (initialPosts || []));
    setIsLoadingPosts(false);
  }, error => {
    console.error('Failed to load blog posts from Firebase:', error);
    setIsLoadingPosts(false);
  }), []);

  const savePosts = async nextPosts => {
    const previousPosts = posts;
    setPosts(nextPosts);

    try {
      await replaceBlogPosts(nextPosts, previousPosts);
    } catch (error) {
      setPosts(previousPosts);
      console.error('Failed to save blog posts to Firebase:', error);
      throw error;
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
      await signInWithEmailAndPassword(
        firebaseAuth,
        BLOG_CONFIG.adminEmail,
        passwordInput,
      );
      closeLoginModal();
    } catch (error) {
      console.error('Failed to log in:', error);
      setLoginError('Incorrect password or Firebase Authentication is not configured yet.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
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

  const handleDeletePost = async (postId, event) => {
    event?.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await savePosts(posts.filter(post => post.id !== postId));
      if (selectedPostId === postId) onSelectPost(null);
    } catch {
      setSaveSuccessMsg('Unable to delete this post. Check Firebase permissions.');
      window.setTimeout(() => setSaveSuccessMsg(''), 5000);
    }
  };

  const handleSavePost = async event => {
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

    try {
      await savePosts(nextPosts);
      resetEditorState();
      onSelectPost(post);
      setSaveSuccessMsg('Post saved successfully.');
      window.setTimeout(() => setSaveSuccessMsg(''), 4000);
    } catch {
      setFormError('Unable to save this post. Check Firebase permissions and try again.');
    }
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

      {isLoadingPosts && <p className="blog-loading">Loading posts...</p>}

      {!isLoadingPosts && (isEditing ? (
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
      ))}
    </section>
  );
}
