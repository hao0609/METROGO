<script setup>
import { ref } from "vue";

// 各種組件
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import FeaturedMain from "@/components/FeaturedMain.vue";
import FeaturedSidebar from "@/components/FeaturedSidebar.vue";
import FeaturedInfo from "@/components/FeaturedInfo.vue";
import FeaturedContent from "@/components/FeaturedContent.vue";

// 匯入 JSON 資料
import featuredDataJson from "@/json/featured.json";

// 取得松山新店線 id=2 的資料 (火鍋)
const featuredData = ref(featuredDataJson["松山新店線"].find((item) => item.id === 2));
</script>

<template>
  <Navbar_V1 />
  <div class="div-all lightgreen">
    <!-- 主要標題&圖片 -->
    <FeaturedMain :FeaturedMain="featuredData" />

    <div class="journey-featured-info green">
      <!-- 店家資訊 -->
      <FeaturedInfo :FeaturedInfo="featuredData.store_info" />
    </div>

    <div class="featured-paragraph-main">
      <div class="featured-paragraph">
        <!-- 小編精選內容 -->
        <FeaturedContent :FeaturedContent="featuredData" />

        <!-- 小編精選熱門推薦 -->
        <FeaturedSidebar />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
