import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EntranceViewView from "../views/EntranceView.vue";
import LoginView from "../views/LoginView.vue";
import AlertView from "../views/AlertView.vue";
import SightsView from "../views/SightsView.vue";
import TourBlueLineView from "../views/TourBlueLineView.vue";
import TourRedLineView from "../views/TourRedLineView.vue";
import TourGreenLineView from "../views/TourGreenLineView.vue";
import TourYellowLineView from "../views/TourYellowLineView.vue";
import TourBrownLineView from "../views/TourBrownLineView.vue";

import MetroBlueLineView from "../views/MetroBlueLineView.vue";
import MetroRedLineView from "../views/MetroRedLineView.vue";
import MetroGreenLineView from "../views/MetroGreenLineView.vue";
import MetroYellowLineView from "../views/MetroYellowLineView.vue";
import MetroBrownLineView from "../views/MetroBrownLineView.vue";
import MissionGeneralView from "../views/MissionGeneralView.vue";
import red_line from "../views/line/red.vue";
import green_line from "../views/line/green.vue";
import blue_line from "../views/line/blue.vue";
import yellow_line from "../views/line/yellow.vue";
import brown_line from "../views/line/brown.vue";
import special_blue from "../views/special-line/blue.vue";
import special_red from "../views/special-line/red.vue";
import special_yellow from "../views/special-line/yellow.vue";
import special_green from "../views/special-line/green.vue";
import special_brown from "../views/special-line/brown.vue";
import MissionSpecialView from "../views/MissionSpecialView.vue";
import BackendLoginView from "../views/BackendLoginView.vue";
import PrivacyView from "../views/PrivacyView.vue";
import UserTermsView from "../views/UserTermsView.vue";
import NewsView from "../views/NewsView.vue";
import NewsDetailView from "../views/NewsDetailView.vue";
import UserProfileView from "../views/UserProfileView.vue";

import JourneyFeaturedView from "../views/JourneyFeaturedView.vue";
// import blue_hotpot from "../views/featured/blue-hotpot.vue";
// import blue_dome from "../views/featured/blue-dome.vue";
// import red_dumpling from "../views/featured/red-dumpling.vue";
// import red_boat from "../views/featured/red-boat.vue";
// import brown_zoo from "../views/featured/brown-zoo.vue";
// import brown_buffet from "../views/featured/brown-buffet.vue";
// import green_waterpark from "../views/featured/green-waterpark.vue";
// import green_dimsum from "../views/featured/green-dimsum.vue";
// import yellow_breakfast from "../views/featured/yellow-breakfast.vue";
// import yellow_fireworks from "../views/featured/yellow-fireworks.vue";

// 後台
import AdminMainpageView from "../views/backend/AdminMainpageView.vue";
import AdminUserView from "../views/backend/AdminUserView.vue";
import Navbar_V1 from "../components/Navbar_V1.vue";
import NewStroe from "../views/NewStoreView.vue";
import NewStoreView from "../views/NewStoreView.vue";

const requireAuth = (to, from, next) => {
  const isAuthenticated = localStorage.getItem("admin"); // 檢查登入狀態
  if (!isAuthenticated) {
    next("/backend-login"); // 未登入則跳回登入頁
  } else {
    next(); // 允許進入
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "HomeView",
      component: HomeView,
    },

    // 景點介紹
    {
      path: "/sights",
      name: "景點介紹",
      component: () =>
        import(
          /* webpackChunkName: "sights", webpackPrefetch: true */ "@/views/SightsView.vue"
        ),
    },
    { path: "/green-line", name: "松山新店線", component: MetroGreenLineView },
    { path: "/brown-line", name: "文湖線", component: MetroBrownLineView },
    {
      path: "/yellow-line",
      name: "中和新盧線",
      component: MetroYellowLineView,
    },
    {
      path: "/blue-line",
      name: "板南線",
      component: MetroBlueLineView,
    },
    {
      path: "/red-line",
      name: "淡水信義線",
      component: MetroRedLineView,
    },
    { path: "/featured/:line/:contentType", name: "小編精選" },
    {
      path: "/tour/blue-line",
      name: "板南線半日遊",
      component: TourBlueLineView,
    },
    {
      path: "/tour/red-line",
      name: "淡水線半日遊",
      component: TourRedLineView,
    },
    {
      path: "/tour/green-line",
      name: "松山新店線半日遊",
      component: TourGreenLineView,
    },
    {
      path: "/tour/yellow-line",
      name: "中和新蘆線半日遊",
      component: TourYellowLineView,
    },
    {
      path: "/tour/brown-line",
      name: "文湖線半日遊",
      component: TourBrownLineView,
    },

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
      path: "/special-mission",
      name: "特殊任務",
      component: MissionSpecialView,
      redirect: "/special-mission/red",
      children: [
        {
          path: "red",
          name: "red",
          component: special_red,
        },
        {
          path: "blue",
          name: "blue",
          component: special_blue,
        },
        {
          path: "yellow",
          name: "yellow",
          component: special_yellow,
        },
        {
          path: "green",
          name: "green",
          component: special_green,
        },
        {
          path: "brown",
          name: "brown",
          component: special_brown,
        },
      ],
    },

    // 會員中心
    {
      path: "/user-profile",
      name: "UserProfile",
      component: UserProfileView,
    },

    // 商城

    { path: "/store", name: "商城", component: NewStoreView },

    // 隱私權政策
    { path: "/privacy", name: "Privacy", component: PrivacyView },

    // 使用者條款
    { path: "/terms", name: "UserTerms", component: UserTermsView },

    // 最新消息
    { path: "/news", name: "News", component: NewsView },

    // 最新消息詳情
    { path: "/news-detail", name: "NewsDetail", component: NewsDetailView },

    // 前台登入
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },

    // 小編精選
    {
      path: "/journey-featured/:category/:id",
      name: "小編精選",
      component: JourneyFeaturedView,
      props: true, // 允許路由參數作為 props 傳遞
    },

    // 小編精選
    // {
    //   path: "/journey-featured/blue-hotpot",
    //   name: "小編精選-藍線火鍋",
    //   component: blue_hotpot,
    // },
    // {
    //   path: "/journey-featured/blue-dome",
    //   name: "小編精選-藍線大巨蛋",
    //   component: blue_dome,
    // },
    // {
    //   path: "/journey-featured/red-dumpling",
    //   name: "小編精選-紅線小籠包",
    //   component: red_dumpling,
    // },
    // {
    //   path: "/journey-featured/red-boat",
    //   name: "小編精選-紅線漁人碼頭",
    //   component: red_boat,
    // },
    // {
    //   path: "/journey-featured/brown-zoo",
    //   name: "小編精選-棕線動物園",
    //   component: brown_zoo,
    // },
    // {
    //   path: "/journey-featured/brown-buffet",
    //   name: "小編精選-棕線吃到飽",
    //   component: brown_buffet,
    // },
    // {
    //   path: "/journey-featured/green-waterpark",
    //   name: "小編精選-綠線自來水",
    //   component: green_waterpark,
    // },
    // {
    //   path: "/journey-featured/green-dimsum",
    //   name: "小編精選-綠線飲茶",
    //   component: green_dimsum,
    // },
    // {
    //   path: "/journey-featured/yellow-breakfast",
    //   name: "小編精選-黃線永和豆漿",
    //   component: yellow_breakfast,
    // },
    // {
    //   path: "/journey-featured/yellow-fireworks",
    //   name: "小編精選-黃線大稻埕煙火",
    //   component: yellow_fireworks,
    // },

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
      beforeEnter: requireAuth, //
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
          component: AdminUserView,
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

  // 路由切換 平滑
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
