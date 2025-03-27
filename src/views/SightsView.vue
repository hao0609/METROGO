<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import "animate.css";

// 引入 gsap 控制 banner 動畫
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// 註冊 ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

// 引入 Navbar
import Navbar_V1 from "../components/Navbar_V1.vue";
import Footer from "../components/Footer.vue";

// 引入Swiper 套件
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
// 定義 Banner block 內容（有些是文字，有些是圖片）
const allMedia = [
  { type: "image", src: banner1 },
  { type: "image", src: banner2 },
  { type: "image", src: banner3 },
  { type: "video", src: banner7 },
  { type: "video", src: banner4 },
  { type: "image", src: banner5 },
  { type: "image", src: banner6 },
  { type: "image", src: banner8 },
  { type: "image", src: banner9 },
  { type: "image", src: banner10 },
  { type: "image", src: banner11 },
  { type: "image", src: banner12 },
  { type: "image", src: banner13 },
  { type: "image", src: banner14 },
  { type: "image", src: banner15 },
  { type: "image", src: banner16 },
  { type: "image", src: banner17 },
  { type: "image", src: banner18 },
  { type: "image", src: banner19 },
  { type: "image", src: banner20 },
  { type: "image", src: banner21 },
  { type: "image", src: banner22 },
  { type: "image", src: banner23 },
  { type: "image", src: banner24 },
  { type: "image", src: banner25 },
];

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

// banner 消失
const bannerRef = ref(null);
const blocks = ref([]);
const currentIndex = ref(0); // 目前隱藏的方塊 index
const lastScrollTime = ref(0); // 最近一次紀錄的時間
const scrollDelay = 20; // 防止滑鼠滾輪事件過於頻繁觸發，設滾動的最小間隔時間

const createBlocks = () => {
  const bannerWidth = window.innerWidth;
  const bannerHeight = window.innerHeight;
  const blockSize = bannerHeight / 5;
  const blocksPerRow = Math.floor(bannerWidth / (blockSize + 5)); // 根據螢幕大小計算「每行最多可以容納多少個方塊」，每個方塊間隔 10px
  const totalBlocks = blocksPerRow * 5; // 方塊總數

  blocks.value = [];
  const textContent = ["M", "E", "T", "R", "O"];
  let mediaIndex = 0;

  // 決定 方塊在網格中的行列數
  for (let i = 0; i < totalBlocks; i++) {
    const row = Math.floor(i / blocksPerRow); // 計算目前方塊在哪一行：項數 超過 blocksPerRow 就會換行
    const col = i % blocksPerRow; // 計算目前方塊在哪一列：餘數相同會同一列
    let number;

    // 依照不同的列數來決定方塊的 number
    if (col % 2 === 0) {
      // 偶數列
      number = col * 5 + row + 1;
      blocks.value.push({
        id: i,
        number,
        type: "text", // 設定為文字
        content: textContent[row % textContent.length], // 顯示文字
        hidden: false,
        originalIndex: i,
      });
    } else {
      //奇數列
      number = col * 5 + (4 - row) + 1;
      number = col * 5 + (4 - row) + 1;
      blocks.value.push({
        id: i,
        number,
        type: "media", // 設定為媒體
        content: allMedia[mediaIndex % allMedia.length],
        hidden: false,
        originalIndex: i,
      });
      mediaIndex++;
    }
  }

  // 升序排列
  blocks.value.sort((a, b) => a.originalIndex - b.originalIndex);
  currentIndex.value = 0;
};

const sortedBlocks = computed(() => {
  return [...blocks.value].sort((a, b) => a.number - b.number);
});

const displayedBlocks = computed(() => {
  return blocks.value;
});

// 設定方塊大小
const blockStyle = computed(() => {
  return () => ({
    width: `${window.innerHeight / 5}px`,
    height: `${window.innerHeight / 5}px`,
  });
});

const handleWheel = (e) => {
  const currentTime = Date.now();
  if (currentTime - lastScrollTime.value < scrollDelay) {
    return;
  }

  lastScrollTime.value = currentTime;

  // 獲取 banner 和 line-entrance 的元素
  const bannerElement = document.querySelector(".banner");
  const lineEntranceElement = document.querySelector(".line-entrance");
  const blockHeight = document.querySelector(".block").offsetHeight;

  // 如果已經完成 banner 的隱藏
  if (currentIndex.value >= blocks.value.length) {
    if (e.deltaY < bannerElement.offsetHeight - blockHeight) {
      // 往上滾 - 回到 banner
      setTimeout(() => {
        blocks.value.forEach((block) => {
          block.hidden = false;
        });
        // 重置當前索引;
        currentIndex.value = 0;
      }, 100); // 延遲 100ms，讓方塊有時間顯示
    } else {
      // 往下滾 - 保持在 line-entrance
      gsap.to(window, {
        duration: 0.8,
        scrollTo: lineEntranceElement,
        ease: "ease",
      });
    }
  } else {
    // 原本的 banner 內部滾動邏輯
    if (e.deltaY > 0) {
      if (currentIndex.value < blocks.value.length) {
        const blockToHide = sortedBlocks.value[currentIndex.value];
        blocks.value.find((b) => b.number === blockToHide.number).hidden = true;
        currentIndex.value++;

        // 當所有方塊都被隱藏時
        if (currentIndex.value >= blocks.value.length) {
          window.removeEventListener("wheel", preventScroll, {
            passive: false,
          });
          window.removeEventListener("scroll", preventScroll, {
            passive: false,
          });

          document.body.style.overflow = "auto";

          nextTick(() => {
            gsap.to(window, {
              duration: 0.8,
              scrollTo: ".line-entrance",
              ease: "ease",
            });
          });
        }
      }
    } else {
      if (currentIndex.value > 0) {
        currentIndex.value--;
        const blockToShow = sortedBlocks.value[currentIndex.value];
        blocks.value.find(
          (b) => b.number === blockToShow.number
        ).hidden = false;
      }
    }
  }
};

const handleResize = () => {
  createBlocks();
};

// 阻止所有捲動的行為;
const preventScroll = (e) => {
  e.preventDefault();
};

onMounted(() => {
  // Header 觸發
  window.addEventListener("mousemove", handleMouseMove);
  createBlocks();
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", preventScroll, { passive: false });
  window.addEventListener("wheel", preventScroll, { passive: false });
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", preventScroll);
  window.removeEventListener("wheel", preventScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <transition
    ><header v-if="header" ref="headerContainer">
      <Navbar_V1 />
    </header>
  </transition>

  <!-- banner -->
  <div class="banner" ref="bannerRef" @wheel.prevent="handleWheel">
    <div
      v-for="(block, index) in displayedBlocks"
      :key="block.id"
      class="block"
      :class="{ hidden: block.hidden }"
      :style="blockStyle(index)"
    >
      <!-- 顯示文字 -->
      <div v-if="block.type === 'text'" class="text-content">
        {{ block.content }}
      </div>

      <!-- 顯示圖片或影片 -->
      <div v-if="block.type === 'media'" class="media-content">
        <template v-if="block.content.type === 'image'">
          <img
            :src="block.content.src"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template v-if="block.content.type === 'video'">
          <video
            :src="block.content.src"
            autoplay
            loop
            muted
            class="w-full h-full object-cover"
          />
        </template>
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
