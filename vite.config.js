import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  resolve: {
    alias: {
      // "#": "/src",p
      "#pages": "/src/pages",
      "#components": "/src/components",
      "#layouts": "/src/layouts",
      "#assets": "/src/assets",
      "#context": "/src/context",
      "#apis": "/src/apis",
      "#data": "/src/data",
      "#hooks": "/src/hooks",
      "#utilities": "/src/utilities",
    },
  },
});
