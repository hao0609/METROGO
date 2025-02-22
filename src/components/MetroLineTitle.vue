<script setup>
import { onMounted, onUpdated } from 'vue'

// 定義 props
defineProps({
  title: {
    type: String,
    required: true
  }
})

// 計算標題寬度並設置 CSS 變數
const updateTitleWidth = () => {
  const titles = document.querySelectorAll('.metro-line-title .line-title')
  titles.forEach(title => {
    const width = title.offsetWidth
    title.closest('.metro-line-title').style.setProperty('--title-width', `${width}px`)
  })
}

onMounted(() => {
  updateTitleWidth()
  // 監聽視窗調整
  window.addEventListener('resize', updateTitleWidth)
})

onUpdated(() => {
  updateTitleWidth()
})
</script>

<template>
  <div class="metro-line-title">
    <p class="line-title">{{ title }}</p>
  </div>
</template>

<style lang="scss" scoped>

.metro-line-title {
  text-align: center;
  margin: 70px 0;
  position: relative;
  width: 100%;

  .line-title {
    font-size: 72px;
    line-height: 1.5;
    font-family: "Dela Gothic One";
    position: relative;
    display: inline-block;
    padding: 0 20px;
    margin: 0;
    z-index: 1;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    height: 4px;
    width: calc((100% - var(--title-width)) / 2 - 20px);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}
</style>