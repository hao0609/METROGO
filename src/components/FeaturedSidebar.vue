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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import featuredData from "@/json/featured.json";

const route = useRoute(); // 取得當前頁面路由
const selectedArticles = ref([]);

// 隨機選取 5 篇推薦文章
const getRandomArticles = () => {
  let allArticles = [];

  // 將 JSON 裡的所有文章扁平化為一個陣列
  for (const line in featuredData) {
    allArticles.push(...featuredData[line]);
  }
  // 調整 link 格式，確保與 route.path 一致
  const currentPath = route.path; // 當前頁面路由
  const filteredArticles = allArticles.filter(
    (article) => article.link.replace("./", "/journey-featured/") !== currentPath
  );

  // // 將 JSON 裡的所有文章扁平化為一個陣列
  // for (const category in featuredData) {
  //   allArticles.push(
  //     ...featuredData[category].map((article) => ({
  //       ...article,
  //       fullPath: `/journey-featured/${category}/${article.id}`, // 🔹 組合完整路徑
  //     }))
  //   );
  // }
  // // 取得當前頁面 `category` 和 `id`
  // const currentPath = `/journey-featured/${route.params.category}/${route.params.id}`;

  // //過濾掉當前頁面的文章
  // const filteredArticles = allArticles.filter(
  //   (article) => article.fullPath !== currentPath
  // );

  // 隨機排序並選取前 5 篇
  selectedArticles.value = filteredArticles
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
