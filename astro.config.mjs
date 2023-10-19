import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro'

import tailwind from "@astrojs/tailwind";

const manifest = {
  name: "ACES Snippets",
  short_name: "ACES Snippets",
  start_url: "/snippets/",
  description: "Collection of useful code snippets",
  icons: [
    {
      "src": "icons/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "icons/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  theme_color: "#000000",
  background_color: "#fcf5eb"
}
// https://astro.build/config
export default defineConfig({
  site: 'https://acesdit.github.io',
  base: '/snippets',
  integrations: [tailwind(),AstroPWA({
    manifest: manifest
  })]
});