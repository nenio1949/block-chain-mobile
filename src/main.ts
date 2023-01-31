import { createApp } from "vue";
import "./style.css";
import App from "@/App.vue";
import router from "./routers";
import "vant/lib/index.css";
import "@/assets/css/app.scss";
import "@vant/touch-emulator"; // 适配PC

const app = createApp(App);
app.use(router);
app.mount("#app");
