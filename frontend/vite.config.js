import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": "/src",
      "~components": "/src/components",
      "~layouts": "/src/components/layout",
      "~pages": "/src/pages",
      "~services": "/src/services",
      "~routes": "/src/routes",
    },
  },
});
