import { resolve } from "path";
import { defineConfig } from "vite";
import vueJSX from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "./index.ts"),
			name: "lib",
			fileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
	plugins: [
		vueJSX(),
		dts({
			cleanVueFileName: true,
			outDir: "dist/types",
			include: ["./**/*"],
		}),
	],
});
