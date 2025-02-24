<template>
  <div class="entrance-container">
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
          <img
            class=""
            @click="goTo('frontend')"
            src="../assets/images/Entrance_FrontEnd.svg"
          />
        </div>
        <div class="metro">
          <img class="small" src="../assets/images/Entrance_metro_small.svg" /><img
            class="big"
            src="../assets/images/Entrance_metro_big.svg"
            alt=""
          />
        </div>
        <div class="left">
          <img
            class=""
            @click="goTo('backend')"
            src="../assets/images/Entrance_BackEnd.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(destination) {
      if (destination === "frontend") {
        this.$router.push("/sights");
      } else {
        this.$router.push("/backend");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/page/entrance";
</style>
