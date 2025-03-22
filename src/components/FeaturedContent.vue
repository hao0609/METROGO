<template>
  <div class="featured-paragraph-content">
    <p v-if="FeaturedContent.featured_paragraphs[0]" :key="index">
      {{ FeaturedContent.featured_paragraphs[0] }}
    </p>
    <h3 v-if="FeaturedContent.featured_paragraphs[1]" :key="index">
      {{ FeaturedContent.featured_paragraphs[1] }}
    </h3>
    <p v-if="FeaturedContent.featured_paragraphs[2]" :key="index">
      {{ FeaturedContent.featured_paragraphs[2] }}
    </p>
    <h3 v-if="FeaturedContent.featured_paragraphs[3]" :key="index">
      {{ FeaturedContent.featured_paragraphs[3] }}
    </h3>
    <p v-if="FeaturedContent.featured_paragraphs[4]" :key="index">
      {{ FeaturedContent.featured_paragraphs[4] }}
    </p>
    <h3 v-if="FeaturedContent.featured_paragraphs[5]" :key="index">
      {{ FeaturedContent.featured_paragraphs[5] }}
    </h3>
    <p v-if="FeaturedContent.featured_paragraphs[6]" :key="index">
      {{ FeaturedContent.featured_paragraphs[6] }}
    </p>
    <p v-if="FeaturedContent.featured_paragraphs[7]" :key="index">
      {{ FeaturedContent.featured_paragraphs[7] }}
    </p>
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
