import { PROJECTS } from '../../data/projects.js';

function AuthorList({ authors }) {
  return authors.map((author, index) => {
    const isOwner = author.startsWith('Donggun Lee');
    return (
      <span key={`${author}-${index}`}>
        {index > 0 && ', '}
        {isOwner ? <span className="me-highlight">{author}</span> : author}
      </span>
    );
  });
}

function ProjectMedia({ media }) {
  if (media.type === 'youtube') {
    return (
      <iframe
        src={media.src}
        title={media.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const image = <img src={media.src} alt={media.alt} />;
  return media.link ? (
    <a href={media.link} target="_blank" rel="noopener noreferrer">{image}</a>
  ) : image;
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="content-section">
      <h2 className="section-title">Past Projects</h2>
      {PROJECTS.map(project => (
        <div key={project.title} className="project-entry">
          <h3 className="project-title">
            {project.title}
            {project.subtitle && <>: <span className="project-subtitle">{project.subtitle}</span></>}
          </h3>
          <p className="project-authors"><AuthorList authors={project.authors} /></p>
          <p className="project-desc">{project.description}</p>
          {project.links.length > 0 && (
            <span className="pub-entry-links project-links">
              {project.links.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
              ))}
            </span>
          )}
          <div className="project-video"><ProjectMedia media={project.media} /></div>
        </div>
      ))}
    </section>
  );
}
