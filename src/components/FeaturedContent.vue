<template>
  <div class="featured-paragraph-content">
    <!-- 使用 v-for 來動態渲染段落和標題 -->
    <div v-for="(content, index) in FeaturedContent.featured_paragraphs" :key="index">
      <!-- 根據內容類型來渲染 p 或 h3 -->
      <p v-if="index % 2 === 0" v-text="content"></p>
      <!-- 假設偶數索引是段落 -->
      <h3 v-else v-text="content"></h3>
      <!-- 假設奇數索引是標題 -->
    </div>
  </div>
</template>

<script setup>
defineProps({
  FeaturedContent: Object, // 接收來自父元件的文章內容
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
