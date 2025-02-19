import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EntranceViewView from "../views/EntranceView.vue";
import LoginView from "../views/LoginView.vue";
import AlertView from "../views/AlertView.vue";
import SightsView from "../views/SightsView.vue";
import TourView from "../views/TourView.vue";
import MetroBlueLineView from "../views/MetroBlueLineView.vue";
import MissionGeneralView from "../views/MissionGeneralView.vue";
import red_line from "../views/line/red.vue";
import green_line from "../views/line/green.vue";
import blue_line from "../views/line/blue.vue";
import yellow_line from "../views/line/yellow.vue";
import brown_line from "../views/line/brown.vue";
import BackendLoginView from "../views/BackendLoginView.vue";
import MissionSpecialView from "../views/MissionSpecialView.vue";

// 後台
import AdminMainpageView from "../views/backend/AdminMainpageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
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
    {
      path: "/sights",
      name: "景點介紹",
      component: SightsView,
    },
    { path: "/green-line", name: "松山新店線" },
    { path: "/brown-line", name: "文湖線" },
    { path: "/orange-line", name: "中和新盧線" },
    { path: "/blue-line", name: "板南線", component: MetroBlueLineView },
    { path: "/red-line", name: "淡水信義線" },
    { path: "/featured/:line/:contentType", name: "小編精選" },
    { path: "/tour/:tourType", name: "旅遊行程", component: TourView },
    { path: "/special-mission", name: "特殊任務" },
    {
      path: "/general-mission",
      name: "一般任務",
      component: MissionGeneralView,
      redirect: "/general-mission/red", // 預設導向 `/red
      children: [
        {
          path: "red", // 這裡是子路由，不要加 `/`
          name: "Red",
          component: red_line,
        },
        {
          path: "green",
          name: "Green",
          component: green_line,
        },
        {
          path: "blue",
          name: "Blue",
          component: blue_line,
        },
        {
          path: "yellow",
          name: "Yellow",
          component: yellow_line,
        },
        {
          path: "brown",
          name: "Brown",
          component: brown_line,
        },
      ],
    },
    // 特殊遊戲
    {
      path: "/MissionSpecialView",
      name: "特殊任務",
      component: MissionSpecialView,
    },
    // 會員中心
    { path: "/user-profile", name: "會員資料" },
    { path: "/password", name: "修改密碼" },
    { path: "/favorites", name: "商品收藏" },
    { path: "/cart", name: "訂單管理" },

    // 商城
    { path: "/store", name: "商城入口" },
    { path: "/store", name: "商品頁" },
    { path: "/store", name: "商品詳情" },
    { path: "/store", name: "客製化" },

    // 最新消息
    { path: "/news", name: "最新消息" },

    // 前台登入
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },

    // 後台
    // { path: "/admin/login/", name: "後台登入" },

    // 後台
    // 後台登入頁面
    {
      path: "/admin/login/",
      name: "BackendLoginView",
      component: BackendLoginView,
    },

    {
      path: "/admin",
      name: "後台共用主頁",
      component: AdminMainpageView,
      children: [
        {
          path: "dashboard",
          name: "AdminDashboard",
          component: () => import("@/views/backend/AdminDashBoardView.vue"),
        },
        // 會員管理
        {
          path: "user",
          name: "AdminUser",
          component: () => import("@/views/backend/AdminUserView.vue"),
        },
        {
          path: "user-data",
          name: "AdminUserData",
          component: () => import("@/views/backend/AdminUserDataView.vue"),
        },
        {
          path: "user-record",
          name: "AdminUserRecord",
          component: () => import("@/views/backend/AdminUserRecordView.vue"),
        },
        // 商城管理
        {
          path: "store",
          name: "AdminStore",
          component: () => import("@/views/backend/AdminStoreView.vue"),
        },
        {
          path: "store-product",
          name: "AdminStoreProduct",
          component: () => import("@/views/backend/AdminStoreProductView.vue"),
        },
        {
          path: "store-category",
          name: "AdminStoreCategory",
          component: () => import("@/views/backend/AdminStoreCategoryView.vue"),
        },
        {
          path: "store-label",
          name: "AdminStoreLabel",
          component: () => import("@/views/backend/AdminStoreLabelView.vue"),
        },
        // 訂單管理
        {
          path: "order",
          name: "AdminOrder",
          component: () => import("@/views/backend/AdminOrderView.vue"),
        },
        // 最新消息管理
        {
          path: "news",
          name: "AdminNews",
          component: () => import("@/views/backend/AdminNewsView.vue"),
        },
        {
          path: "news-add",
          name: "AdminNewsAdd",
          component: () => import("@/views/backend/AdminNewsAddView.vue"),
        },
        {
          path: "news-category",
          name: "AdminNewsCategory",
          component: () => import("@/views/backend/AdminNewsCategoryView.vue"),
        },
        // 行程管理
        {
          path: "schedule",
          name: "AdminSchedule",
          component: () => import("@/views/backend/AdminScheduleView.vue"),
        },
        // 照片管理
        {
          path: "photo",
          name: "AdminPhoto",
          component: () => import("@/views/backend/AdminPhotoView.vue"),
        },
      ],
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

    // Entrance參考頁
    {
      path: "/",
      name: "EntranceView",
      component: EntranceViewView,
    },

    // 後台登入頁面
    {
      path: "/backend-login",
      name: "BackendLoginView",
      component: BackendLoginView,
    },
  ],
});

export default router;
