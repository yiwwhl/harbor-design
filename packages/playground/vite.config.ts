import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJSX()],
});
