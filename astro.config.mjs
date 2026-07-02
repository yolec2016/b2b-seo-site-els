import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yoleckitchen.xyz', // 先填你的最终域名，或者暂时填 Netlify 域名

  integrations: [
    sitemap()
  ]
});