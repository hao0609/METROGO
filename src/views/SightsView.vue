<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "animate.css";
// 引入 Navbar
import Navbar_V1 from "../components/Navbar_V1.vue";
import Swiper from "../components/Swiper.vue";

// logos 管理
import img1 from "../assets/images/sights/logo/Tibame.png";
import img2 from "../assets/images/sights/logo/SNOPA.png";
import img3 from "../assets/images/sights/logo/Spotify.png";
import img4 from "../assets/images/sights/logo/健身參盒.png";
import img5 from "../assets/images/sights/logo/勉Keki.png";
import img6 from "../assets/images/sights/logo/島壽司.png";
import img7 from "../assets/images/sights/logo/板橋慈惠宮.png";
import img8 from "../assets/images/sights/logo/貓宅咖啡.png";

const logos = ref([img1, img2, img3, img4, img5, img6, img7, img8]);

const isMobile = ref(true);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 1024;
  console.log(isMobile.value);
};

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
  console.log("onMounted 觸發了！");
  // checkScreenSize();
  // window.addEventListener("resize", checkScreenSize);

  // Header 觸發
  window.addEventListener("mousemove", handleMouseMove);
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount 觸發！");
  // window.removeEventListener("resize", checkScreenSize);
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <transition
    ><div v-if="header" ref="headerContainer">
      <Navbar_V1 />
    </div>
  </transition>

  <!-- banner -->
  <div class="banner">
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/1.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/2.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/3.jpeg" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/182237-868066892_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/5.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/6.png" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/88921-608445975_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/8.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/9.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/10.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/11.gif" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/12.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/13.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/14.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/15.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/16.JPG" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/17.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/18.gif" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/19.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/20.gif" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/21.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/22.gif" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/23.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/24.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/25.jpg" alt="" />
      </div>
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
      <router-link to="/orange-line" class="line-square">
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
      :navigation="true"
      :loop="true"
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
    <!-- 自訂 SVG 按鈕 -->
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
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/sights";
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
