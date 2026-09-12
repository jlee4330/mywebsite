import { useState } from 'react';
import { PUBLICATIONS } from '../../data/publications.js';

const PUBLICATION_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'first-author', label: 'First Author' },
];

function AuthorList({ authors }) {
  return authors.map((author, index) => {
    const isOwner = author.startsWith('Donggun Lee');
    return (
      <span key={`${author}-${index}`}>
        {index > 0 && ', '}
        {isOwner ? <span className="me">{author}</span> : author}
      </span>
    );
  });
}

export default function PublicationsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visiblePublications = activeFilter === 'first-author'
    ? PUBLICATIONS.filter(publication => publication.firstAuthor)
    : PUBLICATIONS;

  return (
    <section id="publications" className="content-section">
      <h2 className="section-title">Publications</h2>

      <div className="publication-filter-bar" aria-label="Filter publications">
        {PUBLICATION_FILTERS.map(filter => (
          <button
            key={filter.id}
            type="button"
            className={`publication-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
            <span>
              {filter.id === 'all'
                ? PUBLICATIONS.length
                : PUBLICATIONS.filter(publication => publication.firstAuthor).length}
            </span>
          </button>
        ))}
      </div>

      {visiblePublications.map(publication => (
        <div key={publication.tag} className="pub-entry">
          <div className="pub-entry-body">
            <span className="pub-entry-title">{publication.title}</span>
            <span className="pub-entry-authors"><AuthorList authors={publication.authors} /></span>
            <span className="pub-entry-venue">{publication.venue}</span>
            {publication.links.length > 0 && (
              <span className="pub-entry-links">
                {publication.links.map(link => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                ))}
              </span>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
