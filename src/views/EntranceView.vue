<template>
  <!-- <div class="container">
    <div class="back">
      <img class="vector-left" src="../assets/images/Entrance_Vector_left.svg" alt="" />
      <img class="vector-right" src="../assets/images/Entrance_Vector_right.svg" alt="" />
    </div>
    <div class="front">
      <div class="front_logo">
        <img class="" src="../assets/images/Entrance_Logo.svg" />
      </div>
      <div class="arrow">
        <div class="left">
          <RouterLink to="/sights">
            <img src="../assets/images/Entrance_FrontEnd.svg" alt="前往前台" />
          </RouterLink>
        </div>
        <div class="metro">
          <img class="small" src="../assets/images/Entrance_metro_small.svg" /><img
            class="big"
            src="../assets/images/Entrance_metro_big.svg"
            alt=""
          />
        </div>
        <div class="left">
          <RouterLink to="/backend-login">
            <img src="../assets/images/Entrance_BackEnd.svg" alt="前往後台" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div> -->

  <!--  loading 轉場，若要使用要在entrance-container 加上 v-else -->

  <!-- <div v-if="!isLoaded" id="loading"></div> -->

  <div class="entrance-container">
    <div class="bg-container"></div>
    <div class="content">
      <div class="front_logo">
        <!-- <img src="../assets/images/Entrance_Logo.svg" alt="" /> -->
        <icon_black class="rwd-svg"></icon_black>
      </div>
      <div class="entrance-info">
        <div class="entrance-arrow">
          <div class="left">
            <RouterLink to="/home">
              <img
                src="../assets/images/Entrance_FrontEnd.svg"
                alt="前往前台"
              />
            </RouterLink>
          </div>
          <div class="left">
            <RouterLink to="/backend-login">
              <img src="../assets/images/Entrance_BackEnd.svg" alt="前往後台" />
            </RouterLink>
          </div>
        </div>
        <div class="metro">
          <img class="small" src="../assets/images/Entrance_metro_small.svg" />
          <img
            class="big animate__animated animate__heartBeat"
            src="../assets/images/Entrance_metro_big.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import icon_black from "../components/icons/icon_black.vue";
import "animate.css";

// import { gsap } from "gsap";
// gsap.registerPlugin(ScrambleTextPlugin);

export default {
  // data() {
  //   return {
  //     isLoaded: false,
  //   };
  // },
  // mounted() {
  //   const tl = gsap.timeline();
  //   tl.to("#loading", {
  //     duration: 20,
  //     scrambleText: {
  //       text: "在 METROGO ，每個台北捷運站都是大家的遊戲關卡。我們精心設計了每條捷運線的半日遊特殊任務，讓使用者透過拍照打卡和趣味問答，一步步重新認識這城市的獨特魅力。",
  //       chars: "upperCase",
  //       revealDelay: 0.5,
  //       tweenLength: false,
  //     },
  //   });
  //   // 等動畫結束後切換畫面
  //   tl.call(() => {
  //     this.isLoaded = true;
  //   });
  // },
  components: {
    icon_black,
  },
};
</script>

<style scoped>
@import "../assets/sass/page/_entrance.scss";

.big {
  animation: heartBeat 10s infinite;
}

/* 預設大尺寸 */

.rwd-svg {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 576px) {
  .rwd-svg {
    width: 300px;
  }
}

/* loading text */

/* #loading {
  background-color: #e0c4ee;
  color: #8c25c0;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  padding: 10%;
  font-size: 50px;
  font-weight: bolder;
  font-family: NotoSansTC;
  line-height: 1.5;
} */
</style>
