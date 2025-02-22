import "./assets/main.css";
import "../css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// swiper套件(輪播)
import { register } from "swiper/element/bundle";
// 註冊 swiper 自訂元素
register();

<<<<<<< HEAD
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

=======
import App from "./App.vue";
import router from "./router";
>>>>>>> e4c67585005483ed2d6001f5026e27d2145decdd

const app = createApp(App);

<<<<<<< HEAD
app.use(createPinia())
app.use(router)
app.use(Antd);

app.mount('#app')

console.log("✅ Ant Design Vue 已載入");
=======
app.use(createPinia());
app.use(router);

app.mount("#app");
>>>>>>> e4c67585005483ed2d6001f5026e27d2145decdd
