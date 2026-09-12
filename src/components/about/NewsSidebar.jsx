import { NEWS_ITEMS } from '../../data/news.jsx';

export default function NewsSidebar() {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-heading">• LATEST UPDATES</h3>
      <div className="updates-list">
        {NEWS_ITEMS.map((item, index) => (
          <div className="update-item" key={`${item.date}-${index}`}>
            <div className="update-date">{item.date}</div>
            <div>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
