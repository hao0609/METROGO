import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AlertView from "../views/AlertView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },

    // 景點介紹
    { path: "/sights", name: "景點介紹" },
    { path: "/green-line", name: "松山新店線" },
    { path: "/brown-line", name: "文湖線" },
    { path: "/orange-line", name: "中和新盧線" },
    { path: "/blue-line", name: "板南線" },
    { path: "/red-line", name: "淡水信義線" },
    { path: "/featured/:line/:contentType", name: "小編精選" },
    { path: "/tour/:tourType", name: "旅遊行程" },

    // 積分任務
    { path: "/", name: "一般任務" },
    { path: "/", name: "特殊任務" },

    // 會員中心
    { path: "/user-profile", name: "會員資料" },
    { path: "/password", name: "修改密碼" },
    { path: "/favorites", name: "商品收藏" },
    { path: "/cart", name: "訂單管理" },

    // 商城
    { path: "/store", name: "商城" },

    // 最新消息
    { path: "/news", name: "最新消息" },

    // 登入
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },

    // 樣式參考頁
    {
      path: "/style-view",
      name: "StyleView",
      component: () => import("../views/StyleView.vue"),
    },

    // Alert 樣式參考頁
    {
      path: "/alert-view",
      name: "AlertView",
      component: AlertView,
    },
  ],
});

export default router;
