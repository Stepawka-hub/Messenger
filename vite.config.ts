import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@sounds": path.resolve(__dirname, "src/assets/sounds"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@slices": path.resolve(__dirname, "src/services/slices"),
      "@actions": path.resolve(__dirname, "src/services/actions"),
      "@selectors": path.resolve(__dirname, "src/services/selectors"),
      "@thunks": path.resolve(__dirname, "src/services/thunks"),
      "@api": path.resolve(__dirname, "src/utils/api/api.ts"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/services/store/store.ts"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  plugins: [react()],
});
