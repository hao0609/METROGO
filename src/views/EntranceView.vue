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
          <img class="" src="../assets/images/Entrance_FrontEnd.svg" />
        </div>
        <div class="metro">
          <img class="small" src="../assets/images/Entrance_metro_small.svg" /><img
            class="big"
            src="../assets/images/Entrance_metro_big.svg"
            alt=""
          />
        </div>
        <div class="left">
          <img class="" src="../assets/images/Entrance_BackEnd.svg" />
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
        this.$router.push("/frontend");
      } else {
        this.$router.push("/backend");
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
.back {
  position: relative;
}
.vector-left {
  position: absolute;
  top: 0;
  left: 0;
}
.vector-right {
  position: absolute;
  top: 0;
  right: 0;
}
.front {
  position: relative;
  top: 50px;
}
.front_logo {
  position: relative;
  display: flex;
  justify-content: center;
}
.arrow {
  position: relative;
  margin: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.left {
  position: relative;
  cursor: pointer;
  z-index: 999;
}
.left:hover {
  transform: scale(1.1);
}
.right {
  position: relative;
  cursor: pointer;
  z-index: 999;
}
.right:hover {
  transform: scale(1.1);
}

.metro {
  position: relative;
}

.small {
  position: absolute;
}

.big {
  position: relative;
  top: 70px;
  right: 8px;
}
</style>
