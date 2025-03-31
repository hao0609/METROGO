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
defineProps({
  FeaturedMain: Object, // 接收來自父元件的標題圖片
});

// import { ref } from "vue";

// const props = defineProps({
//   FeaturedMain: Object,
// });

// // **主要圖片**
// const mainPhoto = ref({
//   src: props.FeaturedMain.featured_main_photo,
//   alt: "主圖片",
//   type: "main",
//   width: "auto", // 默認寬度
//   height: "auto", // 默認高度
// });

// // **側邊圖片 (前兩張)**
// const sidePhotos = ref(
//   props.FeaturedMain.featured_photos.slice(0, 2).map((src, index) => ({
//     src,
//     alt: `側邊圖片${index + 1}`,
//     type: "side",
//   }))
// );

// // **底部圖片 (剩下的)**
// const bottomPhotos = ref(
//   props.FeaturedMain.featured_photos.slice(2).map((src, index) => ({
//     src,
//     alt: `底部圖片${index + 3}`,
//     type: "bottom",
//   }))
// );

// // **圖片交換函式**
// const swapImage = (clickedPhoto, fromType, index) => {
//   let temp = { ...mainPhoto.value }; // 暫存主圖片

//   // 根據點擊的圖片來更新主圖片的大小
//   const clickedImage = new Image();
//   clickedImage.src = clickedPhoto.src;
//   clickedImage.onload = () => {
//     mainPhoto.value.width = `${clickedImage.width}px`;
//     mainPhoto.value.height = `${clickedImage.height}px`;
//   };

//   // 交換點擊的圖片和主圖片
//   if (fromType === "side") {
//     sidePhotos.value[index] = temp;
//   } else if (fromType === "bottom") {
//     bottomPhotos.value[index] = temp;
//   }

//   // 更新主圖片
//   mainPhoto.value = clickedPhoto;
// };
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
