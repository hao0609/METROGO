<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import "animate.css";

// 引入 gsap 控制 banner 動畫
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// 註冊 ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// 引入 Navbar
import Navbar_V1 from "../components/Navbar_V1.vue";
import Footer from "../components/Footer.vue";

// 引入Swiper 套件
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
register(); // 註冊 swiper 自訂元素

// 匯入 JSON 資料
import featuredData from "@/json/featured.json";

const selectedArticles = ref([]);

// 隨機選取 5 篇推薦文章
const getRandomArticles = () => {
  let allArticles = [];

  // 將 JSON 裡的所有文章扁平化為一個陣列
  for (const line in featuredData) {
    allArticles.push(...featuredData[line]);
  }

  // 隨機排序並選取前 5 篇
  selectedArticles.value = allArticles
    .sort(() => 0.5 - Math.random()) // 隨機排序
    .slice(0, 5); // 取前 5 筆
};

// 初始化時執行
onMounted(getRandomArticles);

// banner 圖片管理
import banner1 from "../assets/images/sights/banner/1.webp";
import banner2 from "../assets/images/sights/banner/2.webp";
import banner3 from "../assets/images/sights/banner/3.webp";
import banner4 from "../assets/videos/video1.mp4";
import banner5 from "../assets/images/sights/banner/5.webp";
import banner6 from "../assets/images/sights/banner/6.webp";
import banner7 from "../assets/videos/video2.mp4";
import banner8 from "../assets/images/sights/banner/8.webp";
import banner9 from "../assets/images/sights/banner/9.webp";
import banner10 from "../assets/images/sights/banner/10.webp";
import banner11 from "../assets/images/sights/banner/11.webp";
import banner12 from "../assets/images/sights/banner/12.webp";
import banner13 from "../assets/images/sights/banner/13.webp";
import banner14 from "../assets/images/sights/banner/14.webp";
import banner15 from "../assets/images/sights/banner/15.webp";
import banner16 from "../assets/images/sights/banner/16.webp";
import banner17 from "../assets/images/sights/banner/17.webp";
import banner18 from "../assets/images/sights/banner/18.webp";
import banner19 from "../assets/images/sights/banner/19.webp";
import banner20 from "../assets/images/sights/banner/20.webp";
import banner21 from "../assets/images/sights/banner/21.webp";
import banner22 from "../assets/images/sights/banner/22.webp";
import banner23 from "../assets/images/sights/banner/23.webp";
import banner24 from "../assets/images/sights/banner/24.webp";
import banner25 from "../assets/images/sights/banner/25.webp";
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

// Banner 區塊控制
const bannerRef = ref(null);
const blocks = ref([]);
const currentIndex = ref(0); // 目前隱藏的方塊 index
const lastScrollTime = ref(0); // 最近一次紀錄的時間
const scrollDelay = 0.01; // 防止滑鼠滾輪事件過於頻繁觸發，設滾動的最小間隔時間

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

// 處理滾動邏輯
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
    // if (e.deltaY < bannerElement.offsetHeight - blockHeight) {
    //   // 往上滾 - 回到 banner
    //   setTimeout(() => {
    //     blocks.value.forEach((block) => {
    //       block.hidden = false;
    //     });
    //     // 重置當前索引;
    //     currentIndex.value = 0;
    //   }, 100); // 延遲 100ms，讓方塊有時間顯示
    // }
    // } else {
    //   // 原本的 banner 內部滾動邏輯
    //   if (e.deltaY > 0) {
    //     if (currentIndex.value < blocks.value.length) {
    //       const blockToHide = sortedBlocks.value[currentIndex.value];
    //       blocks.value.find((b) => b.number === blockToHide.number).hidden = true;
    //       currentIndex.value++;

    //       // 當所有方塊都被隱藏時
    //       if (currentIndex.value >= blocks.value.length) {
    //         window.removeEventListener("wheel", preventScroll, {
    //           passive: false,
    //         });
    //         window.removeEventListener("scroll", preventScroll, {
    //           passive: false,
    //         });

    //         document.body.style.overflow = "auto";

    //         nextTick(() => {
    //           gsap.to(window, {
    //             duration: 0.7,
    //             scrollTo: lineEntranceElement,
    //             ease: "ease",
    //           });
    //         });
    //       }
    //     }
    //   } else {
    //     if (currentIndex.value > 0) {
    //       currentIndex.value--;
    //       const blockToShow = sortedBlocks.value[currentIndex.value];
    //       blocks.value.find(
    //         (b) => b.number === blockToShow.number
    //       ).hidden = false;
    //     }
    //   }
    // }  // 檢查是否在 line-entrance 區域或其後的區域
    const lineEntranceRect = lineEntranceElement.getBoundingClientRect();

    // 如果往上滾動（無論在哪個位置）
    if (e.deltaY < 0) {
      // 立即恢復所有方塊的顯示
      setTimeout(() => {
        blocks.value.forEach((block) => {
          block.hidden = false;
        });
        // 重置當前索引;
        currentIndex.value = 0;
      }, 100); // 延遲 100ms，讓方塊有時間顯示

      // 重置當前索引
      currentIndex.value = 0;

      // 滾動回 banner 區域
      gsap.to(window, {
        duration: 0.5, // 稍微加快速度
        scrollTo: { y: 0 }, // 回到頁面頂部
        ease: "power2.out", // 使用更流暢的緩動效果
        onComplete: () => {
          // 捲動完成後阻止滾動
          document.body.style.overflow = "hidden";
        },
      });

      // 防止事件冒泡和默認行為
      e.preventDefault();
      e.stopPropagation();
      return false;
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
              scrollTo: lineEntranceElement,
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

const scrollCount = ref(0);

// 阻止所有捲動的行為;

const preventScroll = (e) => {
  // 只在 banner 區域完全顯示時阻止滾動
  if (currentIndex.value < blocks.value.length) {
    scrollCount.value += 1;
    // console.log("滾動次數:", scrollCount.value);
    e.preventDefault();
  }
};

// 手機板
// 新增觸控事件處理函數
let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  if (currentIndex.value >= blocks.value.length) {
    return; // 如果所有方塊已隱藏，允許正常滑動
  }

  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;

  // 模擬 wheel 事件的 deltaY
  const simulatedEvent = {
    deltaY: deltaY,
    preventDefault: () => e.preventDefault(),
    stopPropagation: () => e.stopPropagation(),
  };
  handleWheel(simulatedEvent);
  e.preventDefault(); // 只在 banner 區域內阻止默認滑動
};

onMounted(() => {
  nextTick(() => {
    const bannerElement = document.querySelector(".banner");
    if (bannerElement) {
      bannerElement.addEventListener("wheel", handleWheel, { passive: false });
      bannerElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      bannerElement.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      bannerElement.scrollIntoView({ behavior: "auto" });
      // 或者使用您已經在使用的 gsap
      gsap.to(window, {
        duration: 0.1, // 快速滾動
        scrollTo: bannerElement,
        ease: "none",
      });
    }
  });

  // Header 觸發
  window.addEventListener("mousemove", handleMouseMove);

  createBlocks();
  window.addEventListener("resize", handleResize);
  // window.addEventListener("scroll", preventScroll, { passive: false });
  // window.addEventListener("wheel", preventScroll, { passive: false });
  // document.body.style.overflow = "hidden";

  // 僅在 banner 區域內阻止滾動，而不是整個頁面
  const bannerElement = document.querySelector(".banner");
  if (bannerElement) {
    bannerElement.addEventListener("wheel", handleWheel, { passive: false });
  }

  // 監聽整個頁面的滾輪事件，只在滾動到line-entrance頂部時才允許向上滾回banner
  window.addEventListener(
    "wheel",
    (e) => {
      // 獲取line-entrance元素
      const lineEntranceElement = document.querySelector(".line-entrance");
      if (!lineEntranceElement) return;

      // 計算line-entrance元素的頂部位置相對於視窗頂部的距離
      const lineEntranceTop = lineEntranceElement.getBoundingClientRect().top;

      // 只有當所有方塊已隱藏，且往上滾動，且line-entrance元素剛好在視窗頂部或附近時才處理
      // 這裡設置一個小範圍，允許在line-entrance頂部附近50px的範圍內觸發
      const isAtLineEntranceTop =
        lineEntranceTop <= 50 && lineEntranceTop >= -50;

      if (
        currentIndex.value >= blocks.value.length &&
        e.deltaY < 0 &&
        isAtLineEntranceTop
      ) {
        handleWheel(e);
      }
    },
    { passive: false }
  );

  // 等待 DOM 完全渲染後再初始化 Swiper
  nextTick(() => {
    const swipers = document.querySelectorAll("swiper-container");
    swipers.forEach((swiper) => {
      Object.assign(swiper, {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
        navigation: true,
      });
      swiper.initialize();
    });
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("resize", handleResize);
  // window.removeEventListener("scroll", preventScroll);
  // window.removeEventListener("wheel", preventScroll);
  // 移除 banner 區域的事件監聽
  const bannerElement = document.querySelector(".banner");
  if (bannerElement) {
    bannerElement.removeEventListener("wheel", handleWheel);
    bannerElement.removeEventListener("touchmove", handleTouchMove);
    bannerElement.removeEventListener("touchstart", handleTouchStart);
  }
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
          <link rel="preload" as="image" />
          <img
            :src="block.content.src"
            alt=""
            class="w-full h-full object-cover"
          />
        </template>
        <template v-if="block.content.type === 'video'">
          <link rel="preload" as="video" />
          <video
            :src="block.content.src"
            autoplay
            loop
            muted
            playsinline
            disablePictureInPicture
            @touchstart.prevent
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
    <!-- <swiper-container
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
      </swiper-container> -->

    <swiper-container
      class="mySwiper"
      :autoplay="{ delay: 3000 }"
      :loop="true"
      :navigation="true"
    >
      <swiper-slide v-for="(article, index) in selectedArticles" :key="index">
        <div class="featured-container">
          <div class="featured-img">
            <img
              :src="article.store_info.info_photo"
              :alt="article.journey_featured_name"
            />
          </div>
          <div class="featured-paragraph">
            <p class="paragraph-title title1">
              {{ article.journey_featured_name }}
            </p>
            <p class="paragraph caption bold">
              {{ article.featured_paragraphs[0] }}
            </p>
            <router-link
              :to="`/journey-featured/${article.category}/${article.id}`"
              class="article-link"
            >
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
