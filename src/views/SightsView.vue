<script>
// logos 管理
import img1 from "../assets/images/sights/logo/Tibame.png";
import img2 from "../assets/images/sights/logo/SNOPA.png";
import img3 from "../assets/images/sights/logo/Spotify.png";
import img4 from "../assets/images/sights/logo/健身參盒.png";
import img5 from "../assets/images/sights/logo/勉Keki.png";
import img6 from "../assets/images/sights/logo/島壽司.png";
import img7 from "../assets/images/sights/logo/板橋慈惠宮.png";
import img8 from "../assets/images/sights/logo/貓宅咖啡.png";

export default {
  data() {
    return {
      logos: [img1, img2, img3, img4, img5, img6, img7, img8],
    };
  },
};
</script>

<template>
  <!-- banner -->
  <div class="banner">
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/1.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/2.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/3.jpeg" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/182237-868066892_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/5.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/6.png" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/88921-608445975_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/8.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/9.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/10.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/88921-608445975_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/12.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/13.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/14.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/15.jpg" alt="" />
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/16.JPG" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/17.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/18.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/19.jpg" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/88921-608445975_tiny.mp4"
        ></video>
      </div>
    </div>
    <div class="banner-grid">
      <p>M</p>
      <p>E</p>
      <p>T</p>
      <p>R</p>
      <p>O</p>
    </div>
    <div class="banner-grid">
      <div class="grid-container">
        <img src="../assets/images/sights/banner/21.jpg" alt="" />
      </div>
      <div class="grid-container">
        <video
          autoplay
          loop
          muted
          src="../assets/videos/88921-608445975_tiny.mp4"
        ></video>
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/23.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/24.jpg" alt="" />
      </div>
      <div class="grid-container">
        <img src="../assets/images/sights/banner/25.jpg" alt="" />
      </div>
    </div>
  </div>

  <!-- 各線入口 -->
  <div class="line-entrance">
    <div class="line-img">
      <div class="lmg-container">
        <img src="../assets/images/sights/line/green.jpg" alt="" />
      </div>
      <div class="lmg-container">
        <img src="../assets/images/sights/line/brown.jpg" alt="" />
      </div>
      <div class="lmg-container">
        <img src="../assets/images/sights/line/orange.jpg" alt="" />
      </div>
      <div class="lmg-container">
        <img src="../assets/images/sights/line/blue.jpeg" alt="" />
      </div>
      <div class="lmg-container">
        <img src="../assets/images/sights/line/red.jpg" alt="" />
      </div>
    </div>
    <div class="line-square">
      <h2 class="green-line">松山新店線</h2>
      <h2 class="brown-line">文湖線</h2>
      <h2 class="orange-line">中和新蘆線</h2>
      <h2 class="blue-line">板南線</h2>
      <h2 class="red-line">淡水信義線</h2>
    </div>
  </div>

  <!-- GO編精選 -->
  <div class="featured">
    <h1 class="featured-title">GO編精選</h1>
    <swiper-container
      class="mySwiper"
      :autoplay="{ delay: 3000 }"
      :loop="true"
      :navigation="true"
    >
      <swiper-slide>
        <div class="featured-container">
          <div class="featured-img">
            <img
              src="../assets/images/featured/chongqing-6764965_1280.jpg"
              alt=""
            />
          </div>
          <div class="featured-paragraph">
            <p class="paragraph-title title1">
              天冷就要吃鍋！盤點五間板南線老饕必吃火鍋！
            </p>
            <p class="paragraph caption bold">
              台北的冬天，最適合約三五好友來一鍋熱騰騰的火鍋！從大直到永春，沿著捷運藍線走，一路都是火鍋美食天堂，無論你偏愛清淡的湯底還是濃郁的麻辣，這五間必吃火鍋店絕對讓你心滿意足！無論是深夜宵夜場還是悠閒的晚餐時光，這些火鍋店的豐富選擇絕對能滿足每位饕客的味蕾。準備好暖暖你的冬天，跟著我們的推薦開啟你的火鍋之旅吧！
            </p>
            <div class="btn-container">
              <button class="btn_white small">閱讀更多</button>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="featured-container">
          <div class="featured-img">
            <img
              src="../assets/images/featured/chongqing-6764965_1280.jpg"
              alt=""
            />
          </div>
          <div class="featured-paragraph">
            <p class="paragraph-title title1">
              天冷就要吃鍋！盤點五間板南線老饕必吃火鍋！
            </p>
            <p class="paragraph caption bold">
              台北的冬天，最適合約三五好友來一鍋熱騰騰的火鍋！從大直到永春，沿著捷運藍線走，一路都是火鍋美食天堂，無論你偏愛清淡的湯底還是濃郁的麻辣，這五間必吃火鍋店絕對讓你心滿意足！無論是深夜宵夜場還是悠閒的晚餐時光，這些火鍋店的豐富選擇絕對能滿足每位饕客的味蕾。準備好暖暖你的冬天，跟著我們的推薦開啟你的火鍋之旅吧！
            </p>
            <div class="btn-container">
              <button class="btn_white small">閱讀更多</button>
            </div>
          </div>
        </div>
      </swiper-slide>

      <!-- 自訂 SVG 按鈕 -->
      <!-- <div class="custom-prev">
        <img src="../assets/images/sights/Vector-left.svg" alt="Prev" />
      </div>
      <div class="custom-next">
        <img src="../assets/images/sights/Vector-right.svg" alt="Next" />
      </div> -->
    </swiper-container>
  </div>

  <!-- 合作夥伴 -->
  <div class="partners">
    <div class="partners-title">
      <div class="arrows">
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
        <img src="../assets/images/sights/Vector-left.svg" alt="" />
      </div>
      <h2>合作夥伴</h2>
      <div class="arrows">
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
        <img src="../assets/images/sights/Vector-right.svg" alt="" />
      </div>
    </div>
    <!-- <swiper-container
      class="logo-swiper"
      :slides-per-view="'auto'"
      :allow-touch-move="false"
      :autoplay="{ delay: 0, disableOnInteraction: false }"
      :speed="5000"
      :free-mode="true"
      :loop="true"
    >
      <swiper-slide class="logo" v-for="(logo, index) in logos" :key="index">
        <img :src="logo" />
      </swiper-slide>
    </swiper-container> -->

    <Vue3Marquee
      class="logo"
      :pause-on-click="true"
      :direction="'reverse'"
      :duration="10"
      :loop="0"
      :gradient="true"
      :clone="true"
    >
      <div class="logo-container" v-for="(logo, index) in logos" :key="index">
        <img :src="logo" />
      </div>
    </Vue3Marquee>
    <Vue3Marquee
      class="logo"
      :pause-on-click="true"
      :duration="10"
      :loop="0"
      :gradient="true"
      :clone="true"
    >
      <div class="logo-container" v-for="(logo, index) in logos" :key="index">
        <img :src="logo" />
      </div>
    </Vue3Marquee>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/sights";
</style>
