import FormattedContent from './FormattedContent.jsx';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  const pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(pattern);
  return match?.[2]?.length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
}

export default function BlogPostDetail({
  isAdmin,
  post,
  onBack,
  onDelete,
  onEdit,
}) {
  const videoEmbedUrl = getYouTubeEmbedUrl(post.videoUrl);

  const handleBack = () => {
    onBack();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="blog-detail">
      <div className="blog-detail-header">
        <button className="blog-back-btn" onClick={handleBack}>Back to all posts</button>
        {isAdmin && (
          <div className="blog-detail-actions">
            <button className="blog-btn-secondary blog-detail-action-btn" onClick={onEdit}>Edit</button>
            <button className="blog-btn-danger" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>

      <div className="blog-detail-meta">
        <span className="blog-post-category">{post.category}</span>
        <span>•</span>
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="blog-detail-title">{post.title}</h1>

      {videoEmbedUrl && (
        <div className="blog-detail-media">
          <div className="blog-detail-video-frame">
            <iframe
              src={videoEmbedUrl}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {post.teaser && !post.videoUrl && (
        <div className="blog-detail-media blog-detail-teaser">
          <img src={post.teaser} alt={post.title} />
        </div>
      )}

      <div className="blog-detail-content">
        {typeof post.content === 'string'
          ? <FormattedContent text={post.content} />
          : post.content}
      </div>

      {post.tags?.length > 0 && (
        <div className="blog-detail-tags">
          {post.tags.map(tag => <span key={tag} className="blog-post-tag">#{tag}</span>)}
        </div>
      )}

      <div className="blog-detail-footer">
        <button className="blog-back-btn" onClick={handleBack}>Back to all posts</button>
      </div>
    </article>
  );
}
