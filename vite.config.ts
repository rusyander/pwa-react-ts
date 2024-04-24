import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            // urlPattern: /^https?.*/,
            urlPattern: new RegExp("^https://jsonplaceholder.typicode.com"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "offlineCache",
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],

        globPatterns: ["**/*.{js,ts,tsx,jsx,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      injectRegister: "auto",
      manifest: {
        name: "My PWA",
        short_name: "My PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/vite.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
