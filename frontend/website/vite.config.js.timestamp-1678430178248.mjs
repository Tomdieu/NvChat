// vite.config.js
import { defineConfig } from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/website/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import tsconfigPaths from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/website/node_modules/vite-tsconfig-paths/dist/index.mjs";
import commonjs from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/website/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import nodeResolve from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/website/node_modules/@rollup/plugin-node-resolve/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\pc\\Desktop\\Code\\projects\\Chatapp\\frontend\\website";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), commonjs(), nodeResolve()],
  resolve: {
    alias: {
      "@chat": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@context": path.resolve(__vite_injected_original_dirname, "./src/context"),
      "@provider": path.resolve(__vite_injected_original_dirname, "./src/provider"),
      "@routes": path.resolve(__vite_injected_original_dirname, "./src/routes"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@schema": path.resolve(__vite_injected_original_dirname, "./src/schema"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@constants": path.resolve(__vite_injected_original_dirname, "./src/constants"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwY1xcXFxEZXNrdG9wXFxcXENvZGVcXFxccHJvamVjdHNcXFxcQ2hhdGFwcFxcXFxmcm9udGVuZFxcXFx3ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwY1xcXFxEZXNrdG9wXFxcXENvZGVcXFxccHJvamVjdHNcXFxcQ2hhdGFwcFxcXFxmcm9udGVuZFxcXFx3ZWJzaXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wYy9EZXNrdG9wL0NvZGUvcHJvamVjdHMvQ2hhdGFwcC9mcm9udGVuZC93ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG4vLyBpbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2gnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgY29tbW9uanMgZnJvbSAnQHJvbGx1cC9wbHVnaW4tY29tbW9uanMnO1xuaW1wb3J0IG5vZGVSZXNvbHZlIGZyb20gJ0Byb2xsdXAvcGx1Z2luLW5vZGUtcmVzb2x2ZSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSx0c2NvbmZpZ1BhdGhzKCksY29tbW9uanMoKSwgbm9kZVJlc29sdmUoKV0sXG4gIHJlc29sdmU6e1xuICAgIGFsaWFzOntcbiAgICAgIFwiQGNoYXRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjXCIpLFxuICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLFwiLi9zcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIFwiQGNvbnRleHRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL2NvbnRleHRcIiksXG4gICAgICBcIkBwcm92aWRlclwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLFwiLi9zcmMvcHJvdmlkZXJcIiksXG4gICAgICBcIkByb3V0ZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL3JvdXRlc1wiKSxcbiAgICAgIFwiQHBhZ2VzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy9wYWdlc1wiKSxcbiAgICAgIFwiQHNjaGVtYVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLFwiLi9zcmMvc2NoZW1hXCIpLFxuICAgICAgXCJAdXRpbHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL3V0aWxzXCIpLFxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy9hc3NldHNcIiksXG4gICAgICBcIkBjb25zdGFudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL2NvbnN0YW50c1wiKSxcbiAgICAgIFwiQGxheW91dHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL2xheW91dHNcIiksXG5cbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc3gnLCAnLnRzJywgJy50c3gnXSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1gsU0FBUyxvQkFBb0I7QUFDL1ksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUVqQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGNBQWM7QUFDckIsT0FBTyxpQkFBaUI7QUFOeEIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRSxjQUFjLEdBQUUsU0FBUyxHQUFHLFlBQVksQ0FBQztBQUFBLEVBQzNELFNBQVE7QUFBQSxJQUNOLE9BQU07QUFBQSxNQUNKLFNBQVMsS0FBSyxRQUFRLGtDQUFVLE9BQU87QUFBQSxNQUN2QyxlQUFlLEtBQUssUUFBUSxrQ0FBVSxrQkFBa0I7QUFBQSxNQUN4RCxZQUFZLEtBQUssUUFBUSxrQ0FBVSxlQUFlO0FBQUEsTUFDbEQsYUFBYSxLQUFLLFFBQVEsa0NBQVUsZ0JBQWdCO0FBQUEsTUFDcEQsV0FBVyxLQUFLLFFBQVEsa0NBQVUsY0FBYztBQUFBLE1BQ2hELFVBQVUsS0FBSyxRQUFRLGtDQUFVLGFBQWE7QUFBQSxNQUM5QyxXQUFXLEtBQUssUUFBUSxrQ0FBVSxjQUFjO0FBQUEsTUFDaEQsVUFBVSxLQUFLLFFBQVEsa0NBQVUsYUFBYTtBQUFBLE1BQzlDLFdBQVcsS0FBSyxRQUFRLGtDQUFVLGNBQWM7QUFBQSxNQUNoRCxjQUFjLEtBQUssUUFBUSxrQ0FBVSxpQkFBaUI7QUFBQSxNQUN0RCxZQUFZLEtBQUssUUFBUSxrQ0FBVSxlQUFlO0FBQUEsSUFFcEQ7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxNQUFNO0FBQUEsRUFDM0M7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
