<template>
  <div class="featured-sidebar">
    <div class="sidebar-title">
      <hr />
      <h2>小編精選熱門推薦</h2>
      <hr />
    </div>
    <div class="featured-articles">
      <a :href="selectedJourney.link" class="article-link">
        <div v-if="selectedJourney" class="article">
          <div class="article-pic">
            <img :src="selectedJourney.featured_main_photo" alt="文章1" />
          </div>
          <p>
            {{ selectedJourney.journey_featured_name }}
          </p>
        </div>
      </a>
      <hr class="article-divider" />
    </div>
  </div>
</template>

<script>
import featuredData from "@/json/featured.json"; // 引入 JSON 檔案

export default {
  data() {
    return {
      featuredData, // 存入 JSON 資料
      selectedLine: "板南線",
      selectedId: 1,
    };
  },
  computed: {
    selectedJourney() {
      return (
        this.featuredData[this.selectedLine]?.find(
          (journey) => journey.id === this.selectedId
        ) || null
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
