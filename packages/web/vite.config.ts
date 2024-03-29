import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import viteSvgLoader from "vite-svg-loader";
import { vitePluginForArco } from "@arco-plugins/vite-vue";

export default defineConfig(() => {
	return {
		base: "./",
		server: {
			proxy: {
				"/api": {
					target: `http://localhost:3000`,
					changeOrigin: true,
				},
			},
		},
		plugins: [
			vue(),
			vueJSX(),
			viteSvgLoader(),
			vitePluginForArco({
				theme: "@arco-themes/vue-harbor-design-web",
				style: "css",
			}),
		],
		resolve: {
			alias: [
				{
					find: "@",
					replacement: resolve(__dirname, "./src"),
				},
			],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/style/variables.scss";\n`,
				},
			},
		},
	};
});
