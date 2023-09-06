import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFileName = (prefix: string, entryName: string, format: string) => {
  switch (format) {
    case "es":
    case "esm":
    case "module":
      return `${prefix}.${entryName}.mjs`;
    case "cjs":
    case "commonjs":
    default:
      return `${prefix}.${entryName}.cjs`;
  }
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: resolve(__dirname, "./lib"),
    }),
  ],
  resolve: {
    alias: {
      "batteries-not-included": resolve(__dirname, "./lib"),
    },
  },
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, "lib/index.ts"),
        react: resolve(__dirname, "lib/react/index.ts"),
        utils: resolve(__dirname, "lib/utils/index.ts"),
      },
      name: "BatteriesNotIncluded",
      fileName: (format, entryName) =>
        getFileName("batteries-not-included", entryName, format),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
