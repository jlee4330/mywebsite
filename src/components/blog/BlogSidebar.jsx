export default function BlogSidebar({ posts, onSelectPost }) {
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category).filter(Boolean)))];

  return (
    <div className="sidebar-section">
      <div className="blog-sidebar-section">
        <h3 className="sidebar-heading">• CATEGORIES</h3>
        <div className="blog-sidebar-categories">
          {categories.map(category => {
            const count = category === 'All'
              ? posts.length
              : posts.filter(post => post.category === category).length;

            return (
              <div key={category} className="blog-sidebar-category">
                <span>{category}</span>
                <span className="blog-sidebar-category-count">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="blog-sidebar-section">
          <h3 className="sidebar-heading">• RECENT POSTS</h3>
          <div className="blog-sidebar-recent">
            {posts.map(post => (
              <button
                type="button"
                key={post.id}
                className="blog-sidebar-link"
                onClick={() => {
                  onSelectPost(post.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="blog-sidebar-link-title">{post.title}</span>
                <span className="blog-sidebar-link-date">{post.date} · {post.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
