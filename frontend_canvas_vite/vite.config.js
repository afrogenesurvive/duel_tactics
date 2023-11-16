import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "./build",
    minify: false,
    target: "es2018", // Optional: Set the target to the desired ECMAScript version
    rollupOptions: {
      output: {
        minifyInternalExports: false, // Optional: Disable minification of internal exports
      },
      // plugins: [
      //   rollupPlugin([sourceJSPattern])
      // ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // esbuild: {
  //   loader: "jsx",
  //   include: [sourceJSPattern],
  //   exclude: [],
  // },
  server: {
    port: 3001,
    host: true,
  },
});
