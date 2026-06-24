import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// NOTE: icons are generated from the placeholder logo (client/src/assets/images/aome-logo.jpg).
// Replace client/public/favicon.png, icons/icon-192.png and icons/icon-512.png with the
// final logo (transparent PNG recommended) once Dr. Maria sends it, then re-run the build.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png'],
      manifest: {
        name: 'Aome Consults',
        short_name: 'Aome',
        description: 'Leading Without Losing Yourself — Barr. Dr. Maria Esele Abraham',
        theme_color: '#0F4C46',
        background_color: '#FBF6EC',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
        navigateFallback: '/offline.html'
      }
    })
  ],
  server: {
    port: 5173
  }
});
