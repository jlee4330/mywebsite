import { SITE_CONFIG } from '../../config/site.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Copyright © 2026 {SITE_CONFIG.owner}. All Rights Reserved.</p>
      <p>
        Acknowledgements: The design of this website was inspired by multiple other wonderful personal websites (incl.{' '}
        <a href="https://www.joonsungpark.com/" target="_blank" rel="noopener noreferrer">[1]</a>,{' '}
        <a href="https://inhwasong.com/" target="_blank" rel="noopener noreferrer">[2]</a>).
      </p>
    </footer>
  );
}
