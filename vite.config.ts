import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    alias: {
      layouts: path.resolve(__dirname, "/app/layouts"),
      assets: path.resolve(__dirname, "/app/assets"),
      database: path.resolve(__dirname, "/database"),
      controllers: path.resolve(__dirname, "/app/controllers"),
      routes: path.resolve(__dirname, "/app/routes"),
      files: path.resolve(__dirname, "/files"),
    },
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  plugins: [reactRouter(), tsconfigPaths()], //tailwindcss(), 
}));
