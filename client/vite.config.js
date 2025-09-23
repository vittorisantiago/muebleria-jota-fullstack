import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // API REST del backend
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      // Imágenes servidas por Express (public/assets/…)
      "/assets": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
