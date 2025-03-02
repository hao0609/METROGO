<template>
  <div :style="{ backgroundColor: backgroundColor }" class="journey-featured-info">
    <div class="featured-main">
      <h2 class="featured-info-title">{{ title }}</h2>
      <div class="info-card">
        <p v-html="formattedInformation"></p>
      </div>
    </div>
    <div class="featured-content-pic">
      <img :src="imageSrc" alt="featured image" class="journey_featured_photo6" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "詹記麻辣火鍋西門大世界",
      information:
        "地址：10844台北市萬華區成都路81號B1\n營業時間：12:00 - 01:00\n聯絡電話：02 2311 1800",
      imageSrc: "http://localhost:5173/tid201/g2/src/assets/images/pic-featured_info.svg",
      backgroundColor: "#008659",
    };
  },
  computed: {
    // 處理 information 字串，將 \n 轉換為 <br />
    formattedInformation() {
      return this.information.replace(/\n/g, "<br />");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/sass/page/_journey-featured.scss";
@use "../assets/sass/base/_color.scss";
</style>
