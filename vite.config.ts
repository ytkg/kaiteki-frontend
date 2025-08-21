import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon-512x512.svg'],
      manifest: {
        name: 'Air Conditioner Remote',
        short_name: 'AC Remote',
        description: 'A simple air conditioner remote control application.',
        theme_color: '#E0F2FE',
        background_color: '#E0F2FE',
        display: 'fullscreen',
        scope: '/',
        'start_url': '/',
        icons: [
          {
            src: 'icon-512x512.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
