import "./assets/main.css";
import "../css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// swiper套件(輪播)
import { register } from "swiper/element/bundle";
// 註冊 swiper 自訂元素
register();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
