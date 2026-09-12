// Blog endpoints are served by the local Vite development server.
// The password itself lives only in the ignored .env.local file.
export const BLOG_CONFIG = {
  adminStorageKey: 'dg_blog_admin',
  postsStorageKey: 'dg_blog_posts',
  loginEndpoint: '/api/blog-login',
  logoutEndpoint: '/api/blog-logout',
  saveEndpoint: '/api/save-posts',
  postsFile: 'src/data/blogPosts.json',
};
