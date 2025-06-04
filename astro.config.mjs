import { defineConfig } from 'astro/config';
import path from 'path';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  adapter: netlify(),
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
      },
    },
  },
});
