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

  <div class="entrance-container">
    <div class="bg-container"></div>
    <div class="content">
      <div class="front_logo">
        <img src="../assets/images/Entrance_Logo.svg" alt="" />
      </div>
      <div class="entrance-info">
        <div class="entrance-arrow">
          <div class="left">
            <RouterLink to="/home">
              <img src="../assets/images/Entrance_FrontEnd.svg" alt="前往前台" />
            </RouterLink>
          </div>
          <div class="metro">
            <img class="small" src="../assets/images/Entrance_metro_small.svg" />
            <img class="big" src="../assets/images/Entrance_metro_big.svg" alt="" />
          </div>
          <div class="left">
            <RouterLink to="/backend-login">
              <img src="../assets/images/Entrance_BackEnd.svg" alt="前往後台" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped>
@use "../assets/sass/page/entrance";
</style>
