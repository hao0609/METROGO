<script setup>
import { ref, onMounted } from "vue";
// swiper套件(輪播)
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 註冊 swiper 自訂元素
register();

const slides = ref([
  {
    img: new URL(
      "@/assets/images/featured/chongqing-6764965_1280.jpg",
      import.meta.url
    ).href,
    title: "天冷就要吃鍋！盤點板南線老饕必吃火鍋！",
    description:
      "台北的冬天，最適合約三五好友來一鍋熱騰騰的火鍋！從大直到永春，沿著捷運藍線走，一路都是火鍋美食天堂，無論你偏愛清淡的湯底還是濃郁的麻辣，這五間必吃火鍋店絕對讓你心滿意足！無論是深夜宵夜場還是悠閒的晚餐時光，這些火鍋店的豐富選擇絕對能滿足每位饕客的味蕾。準備好暖暖你的冬天，跟著我們的推薦開啟你的火鍋之旅吧！",
    link: "/journey-featured",
  },
  {
    img: new URL(
      "@/assets/images/featured/chongqing-6764965_1280.jpg",
      import.meta.url
    ).href,
    title: "另一個火鍋推薦！",
    description:
      "冬天到了，怎麼能不來一鍋熱氣騰騰的美食？這裡有幾家火鍋店推薦給你！",
    link: "/journey-featured",
  },
]);
</script>

<template>
  <swiper
    slides-per-view="1"
    :navigation="true"
    :pagination="true"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <div class="featured-container">
        <div class="featured-img">
          <img :src="slide.img" alt="Featured Image" />
        </div>
        <div class="featured-paragraph">
          <p class="paragraph-title title1">{{ slide.title }}</p>
          <p class="paragraph caption bold">{{ slide.description }}</p>
          <router-link :to="slide.link">
            <div class="btn-container">
              <button class="btn_white small">閱讀更多</button>
            </div>
          </router-link>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/sights";
</style>
