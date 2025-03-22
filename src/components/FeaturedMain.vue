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
            <div class="side-img-top">
              <img
                v-if="FeaturedMain.featured_photos[0]"
                :src="FeaturedMain.featured_photos[0]"
                alt=""
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
          <div class="bottom-img">
            <img
              v-if="FeaturedMain.featured_photos[2]"
              :src="FeaturedMain.featured_photos[2]"
              alt=""
              class="journey_featured_photo3"
            />
          </div>
          <div class="bottom-img">
            <img
              v-if="FeaturedMain.featured_photos[3]"
              :src="FeaturedMain.featured_photos[3]"
              alt=""
              class="journey_featured_photo4"
            />
          </div>
          <div class="bottom-img">
            <img
              v-if="FeaturedMain.featured_photos[4]"
              :src="FeaturedMain.featured_photos[4]"
              alt=""
              class="journey_featured_photo5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  FeaturedMain: Object, // 接收來自父元件的標題圖片
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
