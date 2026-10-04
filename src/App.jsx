import { useEffect, useState } from 'react';
import './index.css';
import AboutSection from './components/about/AboutSection.jsx';
import NewsSidebar from './components/about/NewsSidebar.jsx';
import BlogSidebar from './components/blog/BlogSidebar.jsx';
import BlogSection from './components/BlogSection.jsx';
import SiteFooter from './components/layout/SiteFooter.jsx';
import SiteHeader from './components/layout/SiteHeader.jsx';
import SiteNavigation from './components/layout/SiteNavigation.jsx';
import ProjectsSection from './components/projects/ProjectsSection.jsx';
import PublicationsSection from './components/publications/PublicationsSection.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const navigateTo = tabId => {
    setActiveTab(tabId);
    setSelectedBlogPostId(null);
  };

  return (
    <div className="container">
      <SiteHeader
        isDarkMode={isDarkMode}
        onNavigateHome={event => {
          event.preventDefault();
          navigateTo('about');
        }}
        onToggleDarkMode={() => setIsDarkMode(current => !current)}
      />
      <SiteNavigation activeTab={activeTab} onNavigate={navigateTo} />

      {(() => {
        const hasSidebar = activeTab === 'about' || activeTab === 'blog';
        return (
          <div className={`main-layout ${!hasSidebar ? 'main-layout--full' : ''}`}>
            <main className={`left-column ${!hasSidebar ? 'left-column--full' : ''}`}>
              {activeTab === 'about' && <AboutSection />}
              {activeTab === 'publications' && <PublicationsSection />}
              {activeTab === 'projects' && <ProjectsSection />}
              {activeTab === 'blog' && (
                <BlogSection
                  selectedPostId={selectedBlogPostId}
                  onSelectPost={post => setSelectedBlogPostId(post ? post.id : null)}
                  onPostsChange={setBlogPosts}
                />
              )}
            </main>

            {hasSidebar && (
              <aside className="right-column">
                {activeTab === 'about' && <NewsSidebar />}
                {activeTab === 'blog' && (
                  <BlogSidebar posts={blogPosts} onSelectPost={setSelectedBlogPostId} />
                )}
              </aside>
            )}
          </div>
        );
      })()}

      <SiteFooter />
    </div>
  );
}

export default App;
