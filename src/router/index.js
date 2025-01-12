import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


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
    { path: "/", name: "景點介紹" },

    // 積分任務
    { path: "/", name: "一般任務" },
    { path: "/", name: "特殊任務" },

    // 會員中心
    { path: "/user-profile", name: "UserProfilePage" },
    { path: "/password", name: "PasswordPage" },
    { path: "/favorites", name: "FavoritesPage" },
    { path: "/cart", name: "CartPage" },

    // 商城
    { path: "/", name: "商城" },

    // 最新消息
    { path: "/news", name: "News" },

    // 樣式參考頁
    { path: "/style-view", name: "StyleView" , component: () => import("../views/StyleView.vue"),},
  ],
});

export default router;
