import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths(),commonjs(), nodeResolve()],
  resolve:{
    alias:{
      "@chat": path.resolve(__dirname,"./src"),
      "@components": path.resolve(__dirname,"./src/components"),
      "@context": path.resolve(__dirname,"./src/context"),
      "@provider": path.resolve(__dirname,"./src/provider"),
      "@routes": path.resolve(__dirname,"./src/routes"),
      "@pages": path.resolve(__dirname,"./src/pages"),
      "@schema": path.resolve(__dirname,"./src/schema"),
      "@utils": path.resolve(__dirname,"./src/utils"),
      "@assets": path.resolve(__dirname,"./src/assets"),
      "@constants": path.resolve(__dirname,"./src/constants"),
      "@layouts": path.resolve(__dirname,"./src/layouts"),

    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
})
