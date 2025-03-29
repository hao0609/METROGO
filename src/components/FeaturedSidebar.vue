<template>
  <div class="featured-sidebar">
    <div class="sidebar-title">
      <hr />
      <h2>小編精選熱門推薦</h2>
      <hr />
    </div>
    <div class="featured-articles">
      <template v-for="(article, index) in selectedArticles" :key="index">
        <!-- 根據 category 和 id 動態生成連結 -->
        <router-link
          :to="`/journey-featured/${article.category}/${article.id}`"
          class="article-link"
        >
          <div class="article">
            <div class="article-pic">
              <img
                :src="article.featured_main_photo"
                :alt="article.journey_featured_name"
              />
            </div>
            <p class="article-title">{{ article.journey_featured_name }}</p>
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

  // 扁平化所有文章
  for (const line in featuredData) {
    allArticles.push(...featuredData[line]);
  }

  // 獲取當前頁面的路徑，格式化為與 JSON 中的 `category` 和 `id` 相匹配
  const currentPath = `/journey-featured/${route.params.category}/${route.params.id}`;

  // 過濾掉當前頁面的文章
  const filteredArticles = allArticles.filter(
    (article) => `/journey-featured/${article.category}/${article.id}` !== currentPath
  );

  // 隨機排序並選取前 5 篇文章
  selectedArticles.value = filteredArticles
    .sort(() => 0.5 - Math.random()) // 隨機排序
    .slice(0, 5); // 取前 5 篇
};

// 初始化時執行
onMounted(getRandomArticles);
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
