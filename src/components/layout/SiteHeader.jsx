import { SITE_CONFIG, SOCIAL_LINKS } from '../../config/site.js';
import SocialIcon from './SocialIcon.jsx';

export default function SiteHeader({ isDarkMode, onNavigateHome, onToggleDarkMode }) {
  const { brand } = SITE_CONFIG;

  return (
    <header className="top-header">
      <div className="header-brand-section">
        <a href="#about" className="brand-logo" onClick={onNavigateHome}>
          <strong>{brand.firstName}</strong> {brand.lastName}
          <span className="logo-dot">
            .
            <span className="logo-venn-bg">
              <span className="venn-circle-bg left-circle" />
              <span className="venn-circle-bg right-circle" />
              <span className="venn-label label-left">{brand.leftField}</span>
              <span className="venn-label label-right">{brand.rightField}</span>
            </span>
          </span>
        </a>
      </div>

      <div className="header-actions-section">
        <div className="social-icons">
          {SOCIAL_LINKS.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.label} aria-label={link.label}>
              <SocialIcon name={link.id} />
            </a>
          ))}
        </div>
        <button className="dark-mode-toggle" onClick={onToggleDarkMode}>
          {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        </button>
      </div>
    </header>
  );
}
