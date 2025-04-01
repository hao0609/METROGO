<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Message from "@/components/Message.vue";
import MessageCard from "@/components/MessageCard.vue";
import MetroLineTitle from "@/components/MetroLineTitle.vue";
import Navbar_V1 from "../components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import { initMetrolineScroll } from "@/js/view/metroline.js";
// 導入 Swiper 相關組件
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
// 從 JSON 檔取得資料
import sightsData from "@/json/sights.json";
import featuredData from "@/json/featured.json";

const selectedArticles = ref([]);

// 隨機選取 2 篇 category:blue 的推薦文章
const getRandomArticles = () => {
  let allArticles = [];

  // 將 JSON 裡的所有文章扁平化為一個陣列，並篩選出 category:blue 的資料
  for (const line in featuredData) {
    const filteredArticles = featuredData[line].filter((article) => {
      return article && article.category === "blue"; // 確保 article 存在並且有 category
    });

    if (filteredArticles.length > 0) {
      allArticles.push(...filteredArticles);
    }
  }

  // 隨機排序並選取前 2 篇
  selectedArticles.value = allArticles
    .sort(() => 0.5 - Math.random()) // 隨機排序
    .slice(0, 2); // 取前 2 筆
};
// 初始化時執行
onMounted(getRandomArticles);

// 將 JSON 數據轉換為 ref
const sights = ref(sightsData);

// 定義當前線路(調整這裡就可以改取用來源)
const currentLine = ref("板南線");

// 根據當前線路獲取景點數據
const currentLineSights = computed(() => {
  return sightsData[currentLine.value] || [];
});

// 設置圖片基礎路徑
const IMAGE_BASE_PATH = "/src/assets/images/";

// 圖片路徑處理函數
function getImageUrl(relativePath) {
  if (!relativePath) return "";

  // 如果已經是完整URL則直接返回
  if (relativePath.startsWith("http")) {
    return relativePath;
  }

  try {
    return new URL(`${IMAGE_BASE_PATH}${relativePath}`, import.meta.url).href;
  } catch (error) {
    console.error("Image path error:", error);
    return ""; // 返回空字符串作為備用
  }
}

// 設置 Swiper 模塊
const modules = [Pagination];

// Swiper 配置
const swiperOptions = {
  pagination: {
    dynamicBullets: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};

// Swiper 事件處理
const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};

// 清理函数變量
let cleanupFunction = null;

// 開啟彈窗--start
// 用於存儲當前被點擊查看詳情的景點
const currentSightDetail = ref(null);
const isDialogVisible = ref(false);

// 顯示景點詳情的函數
function showSightDetail(index) {
  currentSightDetail.value = currentLineSights.value[index];
  // 塞入判斷視窗是否開啟共用變數
  localStorage.setItem("isDialogOpen", "Y");
  isDialogVisible.value = true;
  // 禁止背景滾動
  // document.body.style.overflow = "hidden";
}
// 開啟彈窗 --end

// 關閉景點詳情的函數
function closeSightDetail() {
  isDialogVisible.value = false;
  // 塞入判斷視窗是否開啟共用變數
  localStorage.setItem("isDialogOpen", "N");
  // 允許背景滾動
  // document.body.style.overflow = "";
}

// 控制 header 顯示
const header = ref(false);
const topAreaHeight = 80;
const headerContainer = ref(null);

const handleMouseMove = (event) => {
  // 如果滑鼠在視窗上方的 topAreaHeight 區域，或者 event.target 在 headerContainer 裡，
  // 則保持 header 顯示
  if (
    event.clientY <= topAreaHeight ||
    (headerContainer.value && headerContainer.value.contains(event.target))
  ) {
    header.value = true;
  } else {
    header.value = false;
  }
};

function closeOnOutsideClick(event) {
  // 點擊彈窗外範圍關閉彈窗
  // 確保點擊的是背景遮罩，而不是彈窗本身
  if (event.target.classList.contains('dialog-overlay')) {
    closeSightDetail();
  }
}

// 使用Vue的生命周期鉤子
onMounted(() => {
  // 稍微延迟初始化以确保DOM完全渲染
  setTimeout(() => {
    cleanupFunction = initMetrolineScroll();
  }, 100);
  // Header 觸發
  window.addEventListener("mousemove", handleMouseMove);
});

// 在组件卸载前清理资源
onUnmounted(() => {
  if (cleanupFunction) {
    cleanupFunction();
  }
  window.removeEventListener("mousemove", handleMouseMove);
});

// 留言板假資料可以先不理他
const messageData = ref([
  {
    id: 1,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1",
      },
    ],
    timestamp: "2025/02/22",
  },
  {
    id: 2,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1",
      },
    ],
    timestamp: "2025/02/22",
  },
  {
    id: 3,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1",
      },
    ],
    timestamp: "2025/02/22",
  },
]);
</script>

<template>
  <transition
    ><header v-if="header" ref="headerContainer">
      <Navbar_V1 />
    </header>
  </transition>
  <!-- class 後方的 blue 換掉就可以吃到其他線的配色 -->
  <div class="metroline-detail blue">
    <div class="top-section">
      <h1 class="metro-words">METROMETRO</h1>
      <div class="introduce">
        <div class="banner-group group-1">
          <div class="banner" v-if="currentLineSights[0]" @click="showSightDetail(0)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[0].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[0].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[0].sight_intro }}
              </p>
            </div>
          </div>
          <div class="banner" v-if="currentLineSights[1]" @click="showSightDetail(1)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[1].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[1].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[1].sight_intro }}
              </p>
            </div>
          </div>
        </div>

        <div class="banner-group group-2">
          <div class="banner" v-if="currentLineSights[2]" @click="showSightDetail(2)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[2].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[2].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[2].sight_intro }}
              </p>
            </div>
          </div>
          <h1 class="banner-group-title">{{ currentLine }}</h1>
          <div class="banner" v-if="currentLineSights[3]" @click="showSightDetail(3)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[3].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[3].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[3].sight_intro }}
              </p>
            </div>
          </div>
        </div>

        <div class="banner-group group-3">
          <div class="banner" v-if="currentLineSights[4]" @click="showSightDetail(4)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[4].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[4].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[4].sight_intro }}
              </p>
            </div>
          </div>
          <div class="banner" v-if="currentLineSights[5]" @click="showSightDetail(5)">
            <div
              class="banner-img"
              :style="{
                backgroundImage: `url(${currentLineSights[5].sight_img})`,
              }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ currentLineSights[5].sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ currentLineSights[5].sight_intro }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 class="metro-words">METROMETRO</h1>
    </div>

    <!-- 手機版的頂部輪播區域 -->
    <div class="top-section-mobile">
      <h1 class="banner-group-title">板南線</h1>
      <swiper
        :pagination="swiperOptions.pagination"
        :autoplay="swiperOptions.autoplay"
        :modules="modules"
        class="metroLineSwiper"
      >
        <!-- 為每個幻燈片添加點擊事件 -->
        <swiper-slide
          v-for="(sight, index) in currentLineSights.slice(0, 6)"
          :key="index"
          @click="showSightDetail(index)"
        >
          <div class="banner">
            <div
              class="banner-img"
              :style="{ backgroundImage: `url(${sight.sight_img})` }"
            >
              img
            </div>
            <div class="banner-txt-wrapper">
              <p class="title1 bold banner-txt-title">
                {{ sight.sight_banner_title }}
              </p>
              <p class="title2 bold banner-txt-content">
                {{ sight.sight_intro }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 景點詳情彈窗 -->
    <div class="dialog-overlay" v-if="isDialogVisible && currentSightDetail" @click="closeOnOutsideClick">
      <div id="sightDetailDialog" v-if="isDialogVisible && currentSightDetail" @click.stop>
        <div class="dialog-container">
          <div class="detail-dialog-content">
            <h2 class="detail-dialog-title">
              {{ currentSightDetail.sight_name }}
            </h2>
            <div
              class="detail-dialog-img"
              :style="{
                backgroundImage: `url(${currentSightDetail.sight_img})`,
              }"
            >
              img
            </div>
            <div class="sight-basic-info">
              <div>
                <span>地址：</span
                ><span>{{ currentSightDetail.info_address || "暫無資料" }}</span>
              </div>
              <div>
                <span>聯絡電話：</span
                ><span>{{ currentSightDetail.info_number || "暫無資料" }}</span>
              </div>
            </div>
            <p>
              {{ currentSightDetail.dialog_desc || currentSightDetail.sight_intro }}
            </p>
          </div>
          <div class="dialog-cta">
            <button class="btn_white" @click="closeSightDetail">關閉</button>
          </div>
        </div>
      </div>
    </div>

    <!-- GO精選 -->
    <!-- 引入 MetroLineTitle 元件可直接輸入標題文字 -->
    <MetroLineTitle title="GO精選" />
    <div class="section-group">
      <router-link
        v-for="(article, index) in selectedArticles"
        :key="index"
        :to="`/journey-featured/${article.category}/${article.id}`"
        class="go-choise-img"
        :style="{ backgroundImage: `url(${article.featured_main_photo})` }"
      >
        <h2 class="group-title">{{ article.group_title }}</h2>
      </router-link>
      <!-- <div
        class="go-choise-img"
        style="background-image: url('/src/assets/images/line/hot_pot_01_w600xh400.jpg')"
      >
        <h2 class="group-title">火鍋季開跑</h2>
      </div>
      <div
        class="go-choise-img"
        style="
          background-image: url('/src/assets/images/line/BanqiaoStation_03_600x400.jpg');
        "
      >
        <h2 class="group-title">耶誕城派對</h2>
      </div> -->
    </div>

    <!-- 半日遊行程推薦 -->
    <MetroLineTitle :title="`${currentLine}半日遊行程推薦`" />
    <router-link to="/tour/blue-line" class="tour-link">
      <div
        class="w-full-img"
        style="
          background-image: url('/tid201/g2/images/line/ximending_02_w1312xh340.jpg');
        "
      >
        <h1 class="group-title white">西門町</h1>
      </div>
    </router-link>

    <!-- 一日遊行程推薦 -->
    <!-- <MetroLineTitle :title="`${currentLine}一日遊行程推薦`" /> -->
    <router-link to="/tour/blue-line" class="tour-link">
      <div
        class="w-full-img"
        style="
          background-image: url('/tid201/g2/images/line/longshan_temple_02_w1312xh340.jpg');
        "
      >
        <h1 class="group-title white">龍山寺</h1>
      </div>
    </router-link>

    <!-- 留言板 -->
    <!-- <MetroLineTitle title="留言板" />
    <div class="section-message">
      <div class="section-group message-card-group">
        <MessageCard
          v-for="message in messageData"
          :key="message.id"
          :message="message"
        />
      </div>
    </div> -->
    <!-- 留言板小工具 -->
    <!-- <Message /> -->
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/_metro-line.scss";
</style>
