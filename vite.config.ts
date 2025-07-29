import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@icons": path.resolve(__dirname, "src/ui/icons"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@slices": path.resolve(__dirname, "src/services/slices"),
      "@selectors": path.resolve(__dirname, "src/services/selectors"),
      "@thunks": path.resolve(__dirname, "src/services/thunks"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@api": path.resolve(__dirname, "src/utils/api"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/services/store/store.ts"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  plugins: [react()],
});
