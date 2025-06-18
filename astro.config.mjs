import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rickeyportfolio.netlify.app',
  adapter: netlify(),
  output: 'static', // enables pre-rendering for faster TTFB if your routes support it
  integrations: [tailwind(), react(), sitemap()],
  build: {
    format: 'file',
    // Make sure Vite targets modern JS
    vite: {
      build: {
        target: 'es2020', // or es2022 if you're feeling bold
        minify: 'esbuild',
        sourcemap: false,
      },
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      },
    },
  },
});
