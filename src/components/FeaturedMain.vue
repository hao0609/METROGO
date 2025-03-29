<template>
  <div class="featured-main">
    <div class="journey_featured_title1">
      <h1>{{ FeaturedMain.journey_featured_name }}</h1>
    </div>
    <div class="features-container flex">
      <div class="features-img-container flex">
        <div class="top-images flex">
          <div class="top-img-top">
            <img
              :src="FeaturedMain.featured_main_photo"
              alt=""
              class="journey_featured_main_photo"
            />
          </div>
          <div class="side-images flex">
            <div
              v-for="(photo, index) in FeaturedMain.featured_photos.slice(0, 1)"
              :key="index"
              class="side-img-top"
            >
              <img
                v-if="photo"
                :src="photo"
                :alt="'側邊圖片' + (index + 1)"
                class="journey_featured_photo1"
              />
            </div>
            <div class="side-img-top">
              <img
                v-if="FeaturedMain.featured_photos[1]"
                :src="FeaturedMain.featured_photos[1]"
                alt=""
                class="journey_featured_photo2"
              />
            </div>
          </div>
        </div>
        <div class="bottom-images flex">
          <div
            v-for="(photo, index) in FeaturedMain.featured_photos.slice(2)"
            :key="index"
            class="bottom-img"
          >
            <img
              v-if="photo"
              :src="photo"
              :alt="'底部圖片' + (index + 3)"
              class="journey_featured_photo3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收來自父組件的 props
defineProps({
  FeaturedMain: {
    type: Object,
    required: true, // 確保這個 prop 是必要的
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
