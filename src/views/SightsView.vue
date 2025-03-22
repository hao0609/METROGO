<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import "animate.css";

// 引入 gsap 控制 banner 動畫
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 註冊 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 引入 Navbar
import Navbar_V1 from "../components/Navbar_V1.vue";
import Footer from "../components/Footer.vue";

// 引入Swiper 套件
import { Swiper } from "swiper";
import { Navigation } from "swiper/modules";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
register(); // 註冊 swiper 自訂元素

// banner 圖片管理
import banner1 from "../assets/images/sights/banner/1.jpg";
import banner2 from "../assets/images/sights/banner/2.jpg";
import banner3 from "../assets/images/sights/banner/3.jpeg";
import banner4 from "../assets/videos/182237-868066892_tiny.mp4";
import banner5 from "../assets/images/sights/banner/5.jpg";
import banner6 from "../assets/images/sights/banner/6.png";
import banner7 from "../assets/videos/88921-608445975_tiny.mp4";
import banner8 from "../assets/images/sights/banner/8.jpg";
import banner9 from "../assets/images/sights/banner/9.jpg";
import banner10 from "../assets/images/sights/banner/10.jpg";
import banner11 from "../assets/images/sights/banner/11.gif";
import banner12 from "../assets/images/sights/banner/12.jpg";
import banner13 from "../assets/images/sights/banner/13.jpg";
import banner14 from "../assets/images/sights/banner/14.jpg";
import banner15 from "../assets/images/sights/banner/15.jpg";
import banner16 from "../assets/images/sights/banner/16.jpeg";
import banner17 from "../assets/images/sights/banner/17.jpg";
import banner18 from "../assets/images/sights/banner/18.gif";
import banner19 from "../assets/images/sights/banner/19.jpg";
import banner20 from "../assets/images/sights/banner/20.gif";
import banner21 from "../assets/images/sights/banner/21.jpg";
import banner22 from "../assets/images/sights/banner/22.gif";
import banner23 from "../assets/images/sights/banner/23.jpg";
import banner24 from "../assets/images/sights/banner/24.jpg";
import banner25 from "../assets/images/sights/banner/25.jpg";
// 定義 Banner Grid 的內容（有些是文字，有些是圖片）
const grids = ref([
  { type: "text", content: ["M", "E", "T", "R", "O"] },
  {
    type: "media",
    content: [
      { type: "image", src: banner1 },
      { type: "image", src: banner2 },
      { type: "image", src: banner3 },
      { type: "video", src: banner4 },
      { type: "image", src: banner5 },
    ],
  },
  { type: "text", content: ["M", "E", "T", "R", "O"] },
  {
    type: "media",
    content: [
      { type: "image", src: banner6 },
      { type: "video", src: banner7 },
      { type: "image", src: banner8 },
      { type: "image", src: banner9 },
      { type: "image", src: banner10 },
    ],
  },
  { type: "text", content: ["M", "E", "T", "R", "O"] },
  {
    type: "media",
    content: [
      { type: "image", src: banner11 },
      { type: "image", src: banner12 },
      { type: "image", src: banner13 },
      { type: "image", src: banner14 },
      { type: "image", src: banner15 },
    ],
  },
  { type: "text", content: ["M", "E", "T", "R", "O"] },
  {
    type: "media",
    content: [
      { type: "image", src: banner16 },
      { type: "image", src: banner17 },
      { type: "image", src: banner18 },
      { type: "image", src: banner19 },
      { type: "image", src: banner20 },
    ],
  },
  { type: "text", content: ["M", "E", "T", "R", "O"] },
  {
    type: "media",
    content: [
      { type: "image", src: banner21 },
      { type: "image", src: banner22 },
      { type: "image", src: banner23 },
      { type: "image", src: banner24 },
      { type: "image", src: banner25 },
    ],
  },
]);

// logos 管理
import img1 from "../assets/images/sights/logo/Tibame.png";
import img2 from "../assets/images/sights/logo/SNOPA.png";
import img3 from "../assets/images/sights/logo/Spotify.png";
import img4 from "../assets/images/sights/logo/健身參盒.png";
import img5 from "../assets/images/sights/logo/勉Keki.png";
import img6 from "../assets/images/sights/logo/島壽司.png";
import img7 from "../assets/images/sights/logo/板橋慈惠宮.png";
import img8 from "../assets/images/sights/logo/貓宅咖啡.png";
import { Vue3Marquee } from "vue3-marquee";
const logos = ref([img1, img2, img3, img4, img5, img6, img7, img8]);

//   Header 觸發
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

onMounted(() => {
  // Header 觸發
  window.addEventListener("mousemove", handleMouseMove);
});

// Swiper 實例初始化

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <transition
    ><header v-if="header" ref="headerContainer">
      <Navbar_V1 />
    </header>
  </transition>

  <!-- banner -->
  <div class="banner" ref="bannerRef" @scroll="handleScroll">
    <div
      class="banner-grid"
      v-for="(grid, index) in grids"
      :key="index"
      ref="gridRefs"
    >
      <!-- 如果是文字 -->
      <template v-if="grid.type === 'text'">
        <p v-for="(char, charIndex) in grid.content" :key="charIndex">
          {{ char }}
        </p>
      </template>

      <!-- 如果是媒體 (圖片或影片) -->
      <template v-else-if="grid.type === 'media'">
        <div
          class="grid-container"
          v-for="(item, itemIndex) in grid.content"
          :key="itemIndex"
        >
          <!-- 判斷是圖片 -->
          <img v-if="item.type === 'image'" :src="item.src" alt="" />

          <!-- 判斷是影片 -->
          <video
            v-else-if="item.type === 'video'"
            autoplay
            loop
            muted
            :src="item.src"
          ></video>
        </div>
      </template>
    </div>
  </div>

  <!-- 各線入口 -->
  <div class="line-entrance">
    <div class="line-container">
      <div class="img-container">
        <img src="../assets/images/sights/line/green.jpg" alt="" />
      </div>
      <router-link to="/green-line" class="line-square">
        <div class="hover-container green-line">
          <h2>松山新店線</h2>
        </div>
      </router-link>
    </div>
    <div class="line-container">
      <div class="img-container">
        <img src="../assets/images/sights/line/brown.jpg" alt="" />
      </div>
      <router-link to="/brown-line" class="line-square">
        <div class="hover-container brown-line">
          <h2>文湖線</h2>
        </div>
      </router-link>
    </div>
    <div class="line-container">
      <div class="img-container">
        <img src="../assets/images/sights/line/orange.jpg" alt="" />
      </div>
      <router-link to="/yellow-line" class="line-square">
        <div class="hover-container orange-line">
          <h2>中和新蘆線</h2>
        </div>
      </router-link>
    </div>
    <div class="line-container">
      <div class="img-container">
        <img src="../assets/images/sights/line/blue.jpeg" alt="" />
      </div>
      <router-link to="/blue-line" class="line-square">
        <div class="hover-container blue-line">
          <h2>板南線</h2>
        </div>
      </router-link>
    </div>
    <div class="line-container">
      <div class="img-container">
        <img src="../assets/images/sights/line/red.jpg" alt="" />
      </div>
      <router-link to="/red-line" class="line-square">
        <div class="hover-container red-line">
          <h2>淡水信義線</h2>
        </div>
      </router-link>
    </div>
  </div>

  <!-- GO編精選 -->
  <div class="featured">
    <h1 class="featured-title">GO編精選</h1>
    <swiper-container
      class="mySwiper"
      :autoplay="{ delay: 3000 }"
      :loop="true"
      :navigation="true"
    >
      <swiper-slide>
        <div class="featured-container">
          <div class="featured-img">
            <img
              src="../assets/images/featured/chongqing-6764965_1280.jpg"
              alt=""
            />
          </div>
          <div class="featured-paragraph">
            <p class="paragraph-title title1">
              天冷就要吃鍋！盤點板南線老饕必吃火鍋！
            </p>
            <p class="paragraph caption bold">
              台北的冬天，最適合約三五好友來一鍋熱騰騰的火鍋！從大直到永春，沿著捷運藍線走，一路都是火鍋美食天堂，無論你偏愛清淡的湯底還是濃郁的麻辣，這五間必吃火鍋店絕對讓你心滿意足！無論是深夜宵夜場還是悠閒的晚餐時光，這些火鍋店的豐富選擇絕對能滿足每位饕客的味蕾。準備好暖暖你的冬天，跟著我們的推薦開啟你的火鍋之旅吧！
            </p>
            <router-link to="/journey-featured">
              <div class="btn-container">
                <button class="btn_white small">閱讀更多</button>
              </div>
            </router-link>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="featured-container">
          <div class="featured-img">
            <img
              src="../assets/images/featured/chongqing-6764965_1280.jpg"
              alt=""
            />
          </div>
          <div class="featured-paragraph">
            <p class="paragraph-title title1">
              天冷就要吃鍋！盤點板南線老饕必吃火鍋！
            </p>
            <p class="paragraph caption bold">
              台北的冬天，最適合約三五好友來一鍋熱騰騰的火鍋！從大直到永春，沿著捷運藍線走，一路都是火鍋美食天堂，無論你偏愛清淡的湯底還是濃郁的麻辣，這五間必吃火鍋店絕對讓你心滿意足！無論是深夜宵夜場還是悠閒的晚餐時光，這些火鍋店的豐富選擇絕對能滿足每位饕客的味蕾。準備好暖暖你的冬天，跟著我們的推薦開啟你的火鍋之旅吧！
            </p>
            <router-link to="/journey-featured">
              <div class="btn-container">
                <button class="btn_white small">閱讀更多</button>
              </div>
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>

  <!-- 合作夥伴 -->
  <div class="partners">
    <div class="partners-title">
      <div class="arrows animate__animated animate-left">
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
      </div>
      <h2>合作夥伴</h2>
      <div class="arrows animate__animated animate-right">
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
      </div>
    </div>

    <Vue3Marquee
      class="logo"
      :pause-on-click="true"
      :direction="'reverse'"
      :duration="10"
      :loop="0"
      :gradient="true"
      :clone="true"
    >
      <div class="logo-container" v-for="(logo, index) in logos" :key="index">
        <img :src="logo" />
      </div>
    </Vue3Marquee>
    <Vue3Marquee
      class="logo"
      :pause-on-click="true"
      :duration="10"
      :loop="0"
      :gradient="true"
      :clone="true"
    >
      <div class="logo-container" v-for="(logo, index) in logos" :key="index">
        <img :src="logo" />
      </div>
    </Vue3Marquee>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/sights";

// 控制 header 樣式
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  opacity: 0.95;
}
.v-enter-active {
  transition: opacity 0.2s ease;
}
.v-leave-active {
  transition: opacity 0.01s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0; // header 進場前、後都透明
}
</style>
