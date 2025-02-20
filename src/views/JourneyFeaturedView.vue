<template>
  <Navbar_V1 />
  <div class="div-all">
    <div class="featured-main">
      <div class="journey_featured_title1">
        <h1>天冷就要吃鍋！板南線老饕必吃火鍋！</h1>
      </div>
      <div class="features-container flex spaceing-g36">
        <div class="features-img-container flex spaceing-g12">
          <div class="top-images flex spaceing-g8">
            <div class="top-img-top">
              <img
                src="../assets/images/pic-featured_main.svg"
                alt=""
                class="journey_featured_main_photo"
              />
            </div>
            <div class="side-images flex spaceing-g8">
              <div class="side-img-top">
                <img
                  src="../assets/images/pic-featured_1.svg"
                  alt=""
                  class="journey_featured_photo1"
                />
              </div>
              <div class="side-img-top">
                <img
                  src="../assets/images/pic-featured_1.svg"
                  alt=""
                  class="journey_featured_photo2"
                />
              </div>
            </div>
          </div>
          <div class="bottom-images flex spaceing-g8">
            <div class="bottom-img">
              <img
                src="../assets/images/pic-featured_1.svg"
                alt=""
                class="journey_featured_photo3"
              />
            </div>
            <div class="bottom-img">
              <img
                src="../assets/images/pic-featured_1.svg"
                alt=""
                class="journey_featured_photo4"
              />
            </div>
            <div class="bottom-img">
              <img
                src="../assets/images/pic-featured_1.svg"
                alt=""
                class="journey_featured_photo5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="journey-featured-info">
      <div class="featured-main">
        <h2 class="featured-info-title">詹記麻辣火鍋西門大世界</h2>
        <div class="info-card">
          <p>
            地址：10844台北市萬華區成都路81號B1<br />營業時間：12:00 - 01:00<br />聯絡電話：02
            2311 1800
          </p>
        </div>
      </div>
      <div class="featured-content-pic">
        <img src="../assets/images/pic-featured_info.svg" alt="" />
      </div>
    </div>
  </div>

  <Footer />
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/journey-featured";
</style>

<script>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "HomeView",
  created() {},
  components: {
    Navbar_V1,
    Footer,
  },
};
</script>
