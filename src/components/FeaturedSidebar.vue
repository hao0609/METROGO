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
            <p>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import featuredData from "@/json/featured.json";

const route = useRoute(); // 取得當前頁面路由
const selectedArticles = ref([]);

// 隨機選取 5 篇推薦文章，並排除當前頁面文章
const getRandomArticles = () => {
  let allArticles = [];

  // 扁平化所有文章
  for (const line in featuredData) {
    allArticles.push(...featuredData[line]);
  }

  // 獲取當前頁面的 category 和 id
  const currentCategory = route.params.category;
  const currentId = route.params.id;

  // 過濾掉當前頁面的文章
  const filteredArticles = allArticles.filter(
    (article) => !(article.category === currentCategory && article.id === currentId)
  );

  // 隨機排序並選取前 5 篇文章
  selectedArticles.value = filteredArticles
    .sort(() => Math.random() - 0.5) // 隨機排序
    .slice(0, 5); // 取前 5 篇
};

// 初始化時執行
onMounted(getRandomArticles);

// 監聽路由變更，當使用者點擊側邊欄文章時重新載入
watch(
  () => route.params,
  () => {
    getRandomArticles(); // 重新獲取隨機 5 篇文章
  },
  { immediate: true, deep: true } // 深度監聽，確保 `route.params` 內的變化會觸發
);
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
