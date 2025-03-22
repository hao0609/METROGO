<template>
  <div class="featured-main">
    <h2 class="featured-info-title">{{ FeaturedInfo.name }}</h2>
    <div class="info-card">
      <p>
        地址：{{ FeaturedInfo.address }}<br />營業時間：{{ FeaturedInfo.hours
        }}<br />聯絡電話：{{ FeaturedInfo.phone }}
      </p>
    </div>
  </div>
  <div class="featured-content-pic">
    <img :src="FeaturedInfo.info_photo" alt="" class="journey_featured_photo6" />
  </div>
</template>

<script setup>
defineProps({
  FeaturedInfo: Object, // 接收來自父元件的店家資訊
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
