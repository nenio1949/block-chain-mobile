import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import Components from "unplugin-vue-components/vite";
// import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // Components({
    //   resolvers: [VantResolver()]
    // })
  ],
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 路径别名
    },
    extensions: [".js", ".json", ".ts"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    host: "0.0.0.0"
  }
});
