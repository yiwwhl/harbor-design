// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/yiwwhl/Codespaces/harbor-design/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.20_sass@1.68.0/node_modules/vite/dist/node/index.js";
import vueJSX from "file:///Users/yiwwhl/Codespaces/harbor-design/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.4_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import dts from "file:///Users/yiwwhl/Codespaces/harbor-design/node_modules/.pnpm/vite-plugin-dts@3.6.3_@types+node@20.11.20_typescript@5.0.2_vite@5.1.4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/yiwwhl/Codespaces/harbor-design/packages/common/ProForm";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "lib",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vueJSX(),
    dts({
      cleanVueFileName: true,
      outDir: "dist/types",
      include: ["./**/*"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWl3d2hsL0NvZGVzcGFjZXMvaGFyYm9yLWRlc2lnbi9wYWNrYWdlcy9jb21tb24vUHJvRm9ybVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lpd3dobC9Db2Rlc3BhY2VzL2hhcmJvci1kZXNpZ24vcGFja2FnZXMvY29tbW9uL1Byb0Zvcm0vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lpd3dobC9Db2Rlc3BhY2VzL2hhcmJvci1kZXNpZ24vcGFja2FnZXMvY29tbW9uL1Byb0Zvcm0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlSlNYIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0YnVpbGQ6IHtcblx0XHRsaWI6IHtcblx0XHRcdGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL2luZGV4LnRzXCIpLFxuXHRcdFx0bmFtZTogXCJsaWJcIixcblx0XHRcdGZpbGVOYW1lOiBcImluZGV4XCIsXG5cdFx0XHRmb3JtYXRzOiBbXCJlc1wiXSxcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGV4dGVybmFsOiBbXCJ2dWVcIl0sXG5cdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0Z2xvYmFsczoge1xuXHRcdFx0XHRcdHZ1ZTogXCJWdWVcIixcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdHZ1ZUpTWCgpLFxuXHRcdGR0cyh7XG5cdFx0XHRjbGVhblZ1ZUZpbGVOYW1lOiB0cnVlLFxuXHRcdFx0b3V0RGlyOiBcImRpc3QvdHlwZXNcIixcblx0XHRcdGluY2x1ZGU6IFtcIi4vKiovKlwiXSxcblx0XHR9KSxcblx0XSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxTQUFTLGVBQWU7QUFDcFksU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSixPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDZjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2QsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDTjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0gsa0JBQWtCO0FBQUEsTUFDbEIsUUFBUTtBQUFBLE1BQ1IsU0FBUyxDQUFDLFFBQVE7QUFBQSxJQUNuQixDQUFDO0FBQUEsRUFDRjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
