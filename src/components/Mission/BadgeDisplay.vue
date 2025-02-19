<template>
  <div class="badge-container">
    <img
      v-if="badge"
      :src="getBadgeImage(badge)"
      :alt="badge"
      class="badge-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    badge: String, // 接收徽章名稱
  },
  methods: {
    getBadgeImage(badgeName) {
      // 這裡可以根據 badgeName 返回對應的徽章圖片路徑
      return `/assets/badges/${badgeName}.png`; // 假設圖片存放在 /assets/badges
    },
  },
};
</script>

<style scoped lang="scss">
.badge-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.badge-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
