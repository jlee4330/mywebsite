import { NAV_ITEMS, SITE_CONFIG } from '../../config/site.js';

export default function SiteNavigation({ activeTab, onNavigate }) {
  return (
    <nav className="top-nav">
      {NAV_ITEMS.filter(item => item.visible !== false).map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeTab === item.id ? 'active' : ''}
          onClick={event => {
            event.preventDefault();
            onNavigate(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
      <a href={SITE_CONFIG.cv.url} target="_blank" rel="noopener noreferrer">
        CURRICULUM VITAE <span className="nav-date">({SITE_CONFIG.cv.dateLabel})</span>
      </a>
    </nav>
  );
}
