<template>
  <!-- <div class="badge-container">
    <img
      v-if="badge"
      :src="getBadgeImage(badge)"
      :alt="badge"
      class="badge-image"
    />
  </div> -->
  <div class="badge-container">
    <!-- 如果有 badge 資料，就顯示圓圈包住 badge -->
    <div v-if="badge" class="badge-circle">
      <span class="badge-text"> {{ badge }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    badge: {
      type: String,
      default: "",
    },
  },
  // methods: {
  //   getBadgeImage(badgeName) {
  //     // 這裡可以根據 badgeName 返回對應的徽章圖片路徑
  //     return `/assets/badges/${badgeName}.png`; // 假設圖片存放在 /assets/badges
  //   },
  // },
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal_menu.scss";
// .badge-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 10px;
// }
// .badge-image {
//   width: 80px;
//   height: 80px;
//   object-fit: cover;
// }
</style>
