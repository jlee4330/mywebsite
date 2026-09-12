export default function BlogPostList({
  categories,
  isAdmin,
  posts,
  selectedCategory,
  onCategoryChange,
  onDelete,
  onEdit,
  onSelectPost,
  onStartNewPost,
}) {
  const openPost = post => {
    onSelectPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {categories.length > 1 && (
        <div className="blog-filter-bar" aria-label="Filter posts by category">
          {categories.map(category => (
            <button
              key={category}
              className={`blog-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="blog-posts-list">
        {posts.length > 0 ? posts.map(post => (
          <article key={post.id} className="blog-post-card" onClick={() => openPost(post)}>
            {post.teaser && (
              <div className="blog-post-teaser">
                <img src={post.teaser} alt={post.title} />
              </div>
            )}
            <div className="blog-post-body">
              <div className="blog-post-meta">
                <span className="blog-post-category">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="blog-post-title">{post.title}</h3>
              {post.summary && <p className="blog-post-summary">{post.summary}</p>}
              <div className="blog-post-footer">
                {post.tags?.map(tag => <span key={tag} className="blog-post-tag">#{tag}</span>)}
              </div>
              {isAdmin && (
                <div className="blog-post-card-admin" onClick={event => event.stopPropagation()}>
                  <button className="blog-card-action-btn" onClick={event => onEdit(post, event)}>Edit</button>
                  <button className="blog-card-action-btn blog-card-action-btn--danger" onClick={event => onDelete(post.id, event)}>Delete</button>
                </div>
              )}
            </div>
          </article>
        )) : (
          <div className="blog-empty-state">
            <p>No posts published yet.</p>
            {isAdmin ? (
              <button className="blog-btn-primary" onClick={onStartNewPost}>Write your first post</button>
            ) : (
              <p className="blog-empty-note">Posts will appear here soon.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
