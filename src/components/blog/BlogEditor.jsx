import FormattedContent from './FormattedContent.jsx';

export default function BlogEditor({
  categories,
  contentInputRef,
  editorMode,
  editingPostId,
  formData,
  formError,
  mediaOpen,
  titleInputRef,
  onCancel,
  onFieldChange,
  onFormat,
  onMediaToggle,
  onModeChange,
  onSubmit,
}) {
  const categoryOptions = Array.from(new Set([
    'Research',
    'Thoughts',
    'Project',
    ...categories.filter(category => category !== 'All'),
  ]));

  return (
    <div className="blog-editor">
      <div className="blog-editor-header">
        <div>
          <span className="blog-editor-eyebrow">Blog editor</span>
          <h3>{editingPostId ? 'Edit Post' : 'Create New Post'}</h3>
          <p>Write the essentials first, then add media only if you need it.</p>
        </div>
        <span className="blog-required-note"><strong>*</strong> Required</span>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {formError && <div className="blog-form-error" role="alert">{formError}</div>}

        <div className="blog-form-section">
          <SectionHeading number="1" title="Post details" description="The information readers use to identify your post." />

          <div className="blog-form-group">
            <label htmlFor="blog-title">Title <strong>*</strong></label>
            <input
              ref={titleInputRef}
              id="blog-title"
              type="text"
              className="blog-form-input blog-title-input"
              value={formData.title}
              onChange={event => onFieldChange('title', event.target.value)}
              autoFocus
              required
              aria-invalid={Boolean(formError)}
            />
          </div>

          <div className="blog-form-grid blog-form-grid--three">
            <div className="blog-form-group">
              <label htmlFor="blog-category">Category</label>
              <input
                id="blog-category"
                type="text"
                className="blog-form-input"
                list="blog-category-options"
                value={formData.category}
                onChange={event => onFieldChange('category', event.target.value)}
              />
              <datalist id="blog-category-options">
                {categoryOptions.map(category => <option key={category} value={category} />)}
              </datalist>
            </div>

            <div className="blog-form-group">
              <label htmlFor="blog-date">Publish date</label>
              <input
                id="blog-date"
                type="month"
                className="blog-form-input"
                value={formData.date.replace('.', '-')}
                onChange={event => onFieldChange('date', event.target.value.replace('-', '.'))}
              />
            </div>

            <div className="blog-form-group">
              <label htmlFor="blog-read-time">Reading time</label>
              <div className="blog-input-with-suffix">
                <input
                  id="blog-read-time"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={parseInt(formData.readTime, 10) || ''}
                  onChange={event => onFieldChange('readTime', event.target.value ? `${event.target.value} min read` : '')}
                />
                <span>min</span>
              </div>
            </div>
          </div>

          <div className="blog-form-group">
            <label htmlFor="blog-tags">Tags <span>Optional</span></label>
            <input
              id="blog-tags"
              type="text"
              className="blog-form-input"
              value={formData.tags}
              onChange={event => onFieldChange('tags', event.target.value)}
              aria-describedby="blog-tags-help"
            />
            <p className="blog-field-help" id="blog-tags-help">Separate multiple tags with commas.</p>
          </div>
        </div>

        <div className="blog-form-section">
          <SectionHeading number="2" title="Card summary" description="A short introduction shown in the blog list." />
          <div className="blog-form-group">
            <label htmlFor="blog-summary">Summary</label>
            <textarea
              id="blog-summary"
              className="blog-form-input"
              rows="3"
              maxLength="240"
              value={formData.summary}
              onChange={event => onFieldChange('summary', event.target.value)}
              aria-describedby="blog-summary-count"
            />
            <p className="blog-character-count" id="blog-summary-count">{formData.summary.length}/240</p>
          </div>
        </div>

        <div className="blog-form-section">
          <SectionHeading number="3" title="Post content" description="Write in Markdown or switch to preview to check the result." />
          <div className="blog-content-editor">
            <div className="blog-editor-toolbar">
              <div className="blog-editor-tabs" role="tablist" aria-label="Content editor view">
                <button type="button" role="tab" aria-selected={editorMode === 'write'} className={editorMode === 'write' ? 'active' : ''} onClick={() => onModeChange('write')}>Write</button>
                <button type="button" role="tab" aria-selected={editorMode === 'preview'} className={editorMode === 'preview' ? 'active' : ''} onClick={() => onModeChange('preview')}>Preview</button>
              </div>
              {editorMode === 'write' && <FormatActions onFormat={onFormat} />}
            </div>

            {editorMode === 'write' ? (
              <textarea
                ref={contentInputRef}
                id="blog-content"
                className="blog-form-textarea blog-content-input"
                rows="14"
                value={formData.content}
                onChange={event => onFieldChange('content', event.target.value)}
                aria-label="Post content"
              />
            ) : (
              <div className="blog-content-preview" role="tabpanel">
                {formData.content.trim()
                  ? <FormattedContent text={formData.content} />
                  : <p className="blog-empty-preview">Nothing to preview yet.</p>}
              </div>
            )}
          </div>
          <p className="blog-form-hint">Select text before applying a format, or use the buttons to insert a template.</p>
        </div>

        <details className="blog-optional-panel" open={mediaOpen} onToggle={onMediaToggle}>
          <summary><span>Media attachments</span><small>Optional</small></summary>
          <div className="blog-optional-panel-content">
            <div className="blog-form-group">
              <label htmlFor="blog-teaser">Teaser image URL</label>
              <input id="blog-teaser" type="text" className="blog-form-input" value={formData.teaser} onChange={event => onFieldChange('teaser', event.target.value)} aria-describedby="blog-teaser-help" />
              <p className="blog-field-help" id="blog-teaser-help">Use a local path such as /image.jpg or a full image URL.</p>
            </div>
            <div className="blog-form-group">
              <label htmlFor="blog-video">YouTube video URL</label>
              <input id="blog-video" type="url" className="blog-form-input" value={formData.videoUrl} onChange={event => onFieldChange('videoUrl', event.target.value)} />
            </div>
          </div>
        </details>

        <div className="blog-editor-actions">
          <div className="blog-editor-status">
            <span className={formData.title.trim() ? 'ready' : ''} />
            {formData.title.trim() ? 'Ready to publish' : 'Add a title to publish'}
          </div>
          <div className="blog-editor-action-buttons">
            <button type="button" className="blog-btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="blog-btn-primary blog-publish-btn" disabled={!formData.title.trim()}>
              {editingPostId ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SectionHeading({ number, title, description }) {
  return (
    <div className="blog-form-section-heading">
      <span>{number}</span>
      <div><h4>{title}</h4><p>{description}</p></div>
    </div>
  );
}

function FormatActions({ onFormat }) {
  return (
    <div className="blog-format-actions" aria-label="Text formatting">
      <button type="button" onClick={() => onFormat('**', '**', 'bold text')} aria-label="Bold" title="Bold"><strong>B</strong></button>
      <button type="button" onClick={() => onFormat('## ', '', 'Heading')} aria-label="Heading" title="Heading">H2</button>
      <button type="button" onClick={() => onFormat('> ', '', 'Quote', true)} aria-label="Quote" title="Quote">Quote</button>
      <button type="button" onClick={() => onFormat('- ', '', 'List item', true)} aria-label="Bulleted list" title="Bulleted list">List</button>
      <button type="button" onClick={() => onFormat('[', '](https://)', 'link text')} aria-label="Link" title="Link">Link</button>
    </div>
  );
}
