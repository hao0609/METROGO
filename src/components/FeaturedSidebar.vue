<template>
  <div class="featured-sidebar">
    <div class="sidebar-title">
      <hr />
      <h2>小編精選熱門推薦</h2>
      <hr />
    </div>
    <div class="featured-articles">
      <template v-for="(article, index) in selectedArticles" :key="index">
        <router-link :to="article.link" class="article-link">
          <div class="article">
            <div class="article-pic">
              <img
                :src="article.featured_main_photo"
                :alt="article.journey_featured_name"
              />
            </div>
            <p class="article-title">
              {{ article.journey_featured_name }}
            </p>
          </div>
        </router-link>
        <hr v-if="index !== selectedArticles.length - 1" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
