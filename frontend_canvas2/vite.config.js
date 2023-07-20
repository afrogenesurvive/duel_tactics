import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';


const sourceJSPattern = /\/src\/.*\.js$/;
// const rollupPlugin = (matchers) => ({
//   name: "js-in-jsx",
//   load(id) {
//     if (matchers.some(matcher => matcher.test(id))) {
//       const file = fs.readFileSync(id, { encoding: "utf-8" });
//       return esbuild.transformSync(file, { loader: "jsx" });
//     }
//   }
// });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: { 
    include: ['react', 'react-dom'],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    }, 
  },
  build: {
    minify: false,
    target: 'es2018', // Optional: Set the target to the desired ECMAScript version
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
})



// export default {
//   base: '/vite-react-app/',
//   plugins: [reactRefresh(), react()],
// };


// vite.config.js
// import fs from "node:fs";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import * as esbuild from "esbuild";

// const sourceJSPattern = /\/src\/.*\.js$/;
// const rollupPlugin = (matchers) => ({
//   name: "js-in-jsx",
//   load(id) {
//     if (matchers.some(matcher => matcher.test(id))) {
//       const file = fs.readFileSync(id, { encoding: "utf-8" });
//       return esbuild.transformSync(file, { loader: "jsx" });
//     }
//   }
// });

// export default defineConfig({
//   plugins: [
//     react()
//   ],
//   build: {
//     rollupOptions: {
//       plugins: [
//         rollupPlugin([sourceJSPattern])
//       ],
//     },
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       loader: {
//         ".js": "jsx",
//       },
//     },
//   },
//   esbuild: {
//     loader: "jsx",
//     include: [sourceJSPattern],
//     exclude: [],
//   },
// });