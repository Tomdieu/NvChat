import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), commonjs(), nodeResolve()],
  resolve: {
    alias: {
      "@chat": path.resolve(__dirname, "./src"),
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@Utils": path.resolve(__dirname, "./src/Utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
