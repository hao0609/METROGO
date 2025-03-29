<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import featuredData from "@/json/featured.json"; // 引入 JSON 資料

import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import FeaturedMain from "@/components/FeaturedMain.vue";
import FeaturedSidebar from "@/components/FeaturedSidebar.vue";
import FeaturedInfo from "@/components/FeaturedInfo.vue";
import FeaturedContent from "@/components/FeaturedContent.vue";

// 取得路由參數
const route = useRoute();

// 用於儲存篩選後的資料
const selectfeaturedData = ref(null);

// 先定義函式
const fetchFeaturedData = () => {
  const category = route.params.category; // 從路由取得 category
  const id = parseInt(route.params.id); // 轉換 id 為數字

  console.log("Category:", category);
  console.log("ID:", id);

  // 確保 JSON 檔案中有對應的 category
  if (featuredData[category]) {
    // 從對應的 category 中篩選 id
    const selectedItem = featuredData[category].find((item) => item.id === id);

    if (selectedItem) {
      selectfeaturedData.value = selectedItem;
      console.log("找到的資料:", selectedItem);
    } else {
      console.error("找不到對應的 id:", id);
    }
  } else {
    console.error("找不到對應的 category:", category);
  }
};

// **onMounted 現在可以安全地呼叫 fetchFeaturedData**
onMounted(() => {
  fetchFeaturedData();
});

// 監聽 route.params 變化（如果需要動態更新）
watch(() => route.params, fetchFeaturedData, { deep: true });

// 計算屬性：根據 category 設定不同的主題樣式
const categoryClass = computed(() => ({
  lightblue: selectfeaturedData.value?.category === "blue",
  lightred: selectfeaturedData.value?.category === "red",
  lightgreen: selectfeaturedData.value?.category === "green",
  lightyellow: selectfeaturedData.value?.category === "yellow",
  lightbrown: selectfeaturedData.value?.category === "brown",
}));

const categoryinfoClass = computed(() => ({
  blue: selectfeaturedData.value?.category === "blue",
  red: selectfeaturedData.value?.category === "red",
  green: selectfeaturedData.value?.category === "green",
  yellow: selectfeaturedData.value?.category === "yellow",
  brown: selectfeaturedData.value?.category === "brown",
}));
</script>

<template>
  <Navbar_V1 />
  <div v-if="selectfeaturedData" :class="categoryClass" class="div-all">
    <!-- 主要標題&圖片 -->
    <FeaturedMain :FeaturedMain="selectfeaturedData" />

    <div
      v-if="selectfeaturedData"
      :class="categoryinfoClass"
      class="journey-featured-info"
    >
      <!-- 店家資訊 -->
      <FeaturedInfo :FeaturedInfo="selectfeaturedData.store_info" />
    </div>

    <div class="featured-paragraph-main">
      <div class="featured-paragraph">
        <!-- 小編精選內容 -->
        <FeaturedContent :FeaturedContent="selectfeaturedData" />

        <!-- 小編精選熱門推薦 -->
        <FeaturedSidebar />
      </div>
    </div>
  </div>
  <Footer />
  <!-- <Navbar_V1 />
  <div class="div-all lightblue">
    <div class="featured-main">
      <div class="journey_featured_title1">
        <h1>天冷就要吃鍋！板南線老饕必吃火鍋！</h1>
      </div>
      <div class="features-container flex">
        <div class="features-img-container flex">
          <div class="top-images flex">
            <div class="top-img-top">
              <img
                src="../assets/images/featured/pic-featured_blue_hotpot_main.svg"
                alt=""
                class="journey_featured_main_photo"
              />
            </div>
            <div class="side-images flex">
              <div class="side-img-top">
                <img
                  src="../assets/images/featured/pic-featured_blue_hotpot_1.svg"
                  alt=""
                  class="journey_featured_photo1"
                />
              </div>
              <div class="side-img-top">
                <img
                  src="../assets/images/featured/pic-featured_blue_hotpot_2.svg"
                  alt=""
                  class="journey_featured_photo2"
                />
              </div>
            </div>
          </div>
          <div class="bottom-images flex">
            <div class="bottom-img">
              <img
                src="../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                alt=""
                class="journey_featured_photo3"
              />
            </div>
            <div class="bottom-img">
              <img
                src="../assets/images/featured/pic-featured_blue_hotpot_4.svg"
                alt=""
                class="journey_featured_photo4"
              />
            </div>
            <div class="bottom-img">
              <img
                src="../assets/images/featured/pic-featured_blue_hotpot_5.svg"
                alt=""
                class="journey_featured_photo5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="journey-featured-info blue">
      <div class="featured-main">
        <h2 class="featured-info-title">詹記麻辣火鍋西門大世界</h2>
        <div class="info-card">
          <p>
            地址：10844台北市萬華區成都路81號B1<br />營業時間：12:00 - 01:00<br />聯絡電話：02
            2311 1800
          </p>
        </div>
      </div>
      <div class="featured-content-pic">
        <img
          src="../assets/images/featured/pic-featured_blue_hotpot_info.svg"
          alt=""
          class="journey_featured_photo6"
        />
      </div>
    </div>

    <div class="featured-paragraph-main">
      <div class="featured-paragraph">
        <div class="featured-paragraph-content">
          <p>
            西門町，是台北最具代表性的繁華商圈之一，每天吸引無數旅客和在地人潮。在這片街道交錯的繁忙地帶，有一家不容錯過的麻辣火鍋名店——詹記麻辣火鍋。這家火鍋店不僅以其濃郁的湯頭和新鮮的食材馳名，更以其優雅的用餐環境和獨特的服務方式，成為火鍋愛好者心中的理想聚餐地。
          </p>

          <p>來自經典的火鍋美味</p>
          <p>
            詹記麻辣火鍋的核心魅力，莫過於那一鍋熱騰騰的麻辣湯底。採用獨門配方，湯頭由多種天然辛香料、辣椒與中藥材慢火熬製數小時而成。麻而不燥、辣而不嗆，讓人感受到層次豐富的口感。對於嗜辣者而言，詹記的麻辣湯底堪稱人間極品，而不嗜辣的客人也可以選擇他們的養生白湯或番茄湯底，滿足不同口味需求。更值得一提的是詹記採用「鴛鴦鍋」設計，讓喜愛麻辣與清淡湯底的朋友都能在同一鍋中找到自己的味覺歸屬。這樣的設計，不僅貼心，也凸顯出詹記對顧客體驗的重視。
          </p>

          <p>食材新鮮，一口難忘</p>
          <p>
            火鍋的精髓不僅在於湯底，食材的品質更是關鍵。詹記麻辣火鍋每日嚴選最新鮮的肉品與蔬菜，並提供多種海鮮、丸類以及手工製作的火鍋料。像是他們的「極品牛小排」，入口即化，肉質鮮嫩，是許多顧客必點的招牌食材。而愛吃海鮮的朋友則不可錯過他們的鮮蝦拼盤與大蛤蜊，新鮮程度讓人彷彿置身海邊。此外，詹記麻辣火鍋還特別推出了素食專區，為喜愛蔬食的顧客提供豐富的選擇，像是手工豆腐、山藥片與新鮮時蔬等，都能在這裡輕鬆找到。
          </p>

          <p>現代與傳統的完美融合</p>
          <p>
            走進詹記麻辣火鍋，映入眼簾的是充滿現代感的裝潢與傳統中式元素的完美結合。復古的紅燈籠、雕花木門與現代的簡約燈光設計交相輝映，營造出溫馨而不失格調的用餐氛圍。特別是在西門町這樣充滿年輕活力的地段，詹記的空間設計令人倍感舒適，是家庭聚餐、朋友聚會甚至商務宴請的理想選擇。
          </p>

          <p>貼心服務，滿分體驗</p>
          <p>
            詹記麻辣火鍋在服務方面也十分用心。他們的服務人員態度親切，對於火鍋新手，他們會耐心講解如何調配醬料、選擇湯底，甚至幫忙下鍋煮料，讓顧客能毫無壓力地享受這一場味覺盛宴。另外，詹記還設有自助醬料區，提供多達二十多種醬料供顧客自由調配。無論你是喜歡傳統的沙茶醬，還是偏愛創意的柚香辣醬，都能在這裡找到你的最愛。
          </p>
        </div>

        <div class="featured-sidebar">
          <div class="sidebar-title">
            <hr />
            <h2>小編精選熱門推薦</h2>
            <hr />
          </div>

          <div class="featured-articles">
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer /> -->
</template>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
