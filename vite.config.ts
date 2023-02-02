import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import Components from "unplugin-vue-components/vite";
// import { VantResolver } from "unplugin-vue-components/resolvers";

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // Components({
    //   resolvers: [VantResolver()]
    // })
  ],
  base: "/block-chain-mobile/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 路径别名
    },
    extensions: [".js", ".json", ".ts"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName(name) {
          const match = DRIVE_LETTER_REGEX.exec(name);
          const driveLetter = match ? match[0] : "";
          // substr 是被淘汰語法，因此要改 slice
          return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
        }
      }
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
