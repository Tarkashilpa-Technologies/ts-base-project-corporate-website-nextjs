// Base keywords used across the site
export const baseKeywords = [
  'NTT DATA',
  'IT consulting',
  'digital transformation',
  'technology solutions',
  'Malaysia',
  'enterprise solutions',
  'cloud services',
  'AI',
  'data analytics',
];

// Site configuration
export const siteConfig = {
  name: 'NTT DATA Malaysia',
  description: {
    en: 'NTT DATA is a leading IT consulting firm providing innovative digital solutions, strategic consulting, and cutting-edge technologies to transform organizations and shape a better society.',
    ms: 'NTT DATA ialah firma perunding IT terkemuka yang menyediakan penyelesaian digital inovatif, perundingan strategik, dan teknologi terkini untuk mengubah organisasi dan membentuk masyarakat yang lebih baik.',
  },
  url: 'https://www.nttdatapay.com/my', // Update with your actual domain
  ogImage: '/images/og-image.jpg', // Update with your actual OG image path
  twitterCreator: '@nttdata', // Update with your actual Twitter handle
  twitterSite: '@nttdata', // Update with your actual Twitter handle
};

// Locale-specific metadata
export const localeMetadata = {
  en: {
    title: 'NTT DATA Malaysia',
    description: siteConfig.description.en,
    locale: 'en_US',
  },
  ms: {
    title: 'NTT DATA Malaysia',
    description: siteConfig.description.ms,
    locale: 'ms_MY',
  },
};
