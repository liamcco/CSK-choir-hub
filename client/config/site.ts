export type SiteConfig = typeof siteConfig;

const links = {
  login: '/login',
  register: '/register',
  home: '/',
};

export const siteConfig = {
  name: 'CSK Medlemsportal',
  description: 'En medlemsportal for Chalmers Sångkör',
  navItems: [
    {
      labelKey: 'common.home',
      href: links.home,
    },
  ],
  links,
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5050/api',
};
