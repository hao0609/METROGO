import "./assets/main.css";
import "../css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import emitter from '../src/eventbus/eventbus.js'


// marquee套件(跑馬燈)
import Vue3Marquee from "vue3-marquee";

// // swiper套件(輪播)
// import { register } from "swiper/element/bundle";
// import "swiper/css/bundle";
// // 註冊 swiper 自訂元素
// register();

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Marquee);
app.config.globalProperties.emitter = emitter
app.mount("#app");