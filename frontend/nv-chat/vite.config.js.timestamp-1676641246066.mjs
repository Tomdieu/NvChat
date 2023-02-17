// vite.config.js
import { defineConfig } from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/nv-chat/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/nv-chat/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import commonjs from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/nv-chat/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import nodeResolve from "file:///C:/Users/pc/Desktop/Code/projects/Chatapp/frontend/nv-chat/node_modules/@rollup/plugin-node-resolve/dist/es/index.js";
var __vite_injected_original_dirname = "C:\\Users\\pc\\Desktop\\Code\\projects\\Chatapp\\frontend\\nv-chat";
var vite_config_default = defineConfig({
  plugins: [react(), commonjs(), nodeResolve()],
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
      "@constants": path.resolve(__vite_injected_original_dirname, "./src/constants")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwY1xcXFxEZXNrdG9wXFxcXENvZGVcXFxccHJvamVjdHNcXFxcQ2hhdGFwcFxcXFxmcm9udGVuZFxcXFxudi1jaGF0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwY1xcXFxEZXNrdG9wXFxcXENvZGVcXFxccHJvamVjdHNcXFxcQ2hhdGFwcFxcXFxmcm9udGVuZFxcXFxudi1jaGF0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wYy9EZXNrdG9wL0NvZGUvcHJvamVjdHMvQ2hhdGFwcC9mcm9udGVuZC9udi1jaGF0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmltcG9ydCBjb21tb25qcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1jb21tb25qcyc7XG5pbXBvcnQgbm9kZVJlc29sdmUgZnJvbSAnQHJvbGx1cC9wbHVnaW4tbm9kZS1yZXNvbHZlJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLGNvbW1vbmpzKCksIG5vZGVSZXNvbHZlKCldLFxuICByZXNvbHZlOntcbiAgICBhbGlhczp7XG4gICAgICBcIkBjaGF0XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyY1wiKSxcbiAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkBjb250ZXh0XCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy9jb250ZXh0XCIpLFxuICAgICAgXCJAcHJvdmlkZXJcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL3Byb3ZpZGVyXCIpLFxuICAgICAgXCJAcm91dGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy9yb3V0ZXNcIiksXG4gICAgICBcIkBwYWdlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLFwiLi9zcmMvcGFnZXNcIiksXG4gICAgICBcIkBzY2hlbWFcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSxcIi4vc3JjL3NjaGVtYVwiKSxcbiAgICAgIFwiQHV0aWxzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy91dGlsc1wiKSxcbiAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLFwiLi9zcmMvYXNzZXRzXCIpLFxuICAgICAgXCJAY29uc3RhbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsXCIuL3NyYy9jb25zdGFudHNcIilcblxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1gsU0FBUyxvQkFBb0I7QUFDL1ksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUVqQixPQUFPLGNBQWM7QUFDckIsT0FBTyxpQkFBaUI7QUFMeEIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRSxTQUFTLEdBQUcsWUFBWSxDQUFDO0FBQUEsRUFDM0MsU0FBUTtBQUFBLElBQ04sT0FBTTtBQUFBLE1BQ0osU0FBUyxLQUFLLFFBQVEsa0NBQVUsT0FBTztBQUFBLE1BQ3ZDLGVBQWUsS0FBSyxRQUFRLGtDQUFVLGtCQUFrQjtBQUFBLE1BQ3hELFlBQVksS0FBSyxRQUFRLGtDQUFVLGVBQWU7QUFBQSxNQUNsRCxhQUFhLEtBQUssUUFBUSxrQ0FBVSxnQkFBZ0I7QUFBQSxNQUNwRCxXQUFXLEtBQUssUUFBUSxrQ0FBVSxjQUFjO0FBQUEsTUFDaEQsVUFBVSxLQUFLLFFBQVEsa0NBQVUsYUFBYTtBQUFBLE1BQzlDLFdBQVcsS0FBSyxRQUFRLGtDQUFVLGNBQWM7QUFBQSxNQUNoRCxVQUFVLEtBQUssUUFBUSxrQ0FBVSxhQUFhO0FBQUEsTUFDOUMsV0FBVyxLQUFLLFFBQVEsa0NBQVUsY0FBYztBQUFBLE1BQ2hELGNBQWMsS0FBSyxRQUFRLGtDQUFVLGlCQUFpQjtBQUFBLElBRXhEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
