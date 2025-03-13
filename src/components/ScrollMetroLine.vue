<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const line1 = ref(null)
const line2 = ref(null)
const scrollY = ref(0)
const isInTriggerZone = ref(false)

const TRIGGER_START = 150
const TRIGGER_END = 1500
const MAX_HORIZONTAL_MOVE = 100

const updateLines = () => {
  // 檢查是否正在監聽滾動
  console.log('Scroll event triggered', new Date().getTime())
  
  scrollY.value = window.scrollY
  console.log('Current scroll position:', scrollY.value)
  
  isInTriggerZone.value = scrollY.value >= TRIGGER_START && scrollY.value <= TRIGGER_END
  console.log('Is in trigger zone:', isInTriggerZone.value)
  
  if (line1.value && line2.value) {
    const verticalHeight = Math.max(100, Math.min((scrollY.value - TRIGGER_START) * 1.2, 1000))
    
    let horizontalMove = 0
    if (isInTriggerZone.value) {
      const progress = (scrollY.value - TRIGGER_START) / (TRIGGER_END - TRIGGER_START)
      horizontalMove = Math.min(progress * MAX_HORIZONTAL_MOVE, MAX_HORIZONTAL_MOVE)
    }
    
    // 檢查計算出的值
    console.log('Vertical height:', verticalHeight)
    console.log('Horizontal move:', horizontalMove)
    
    // 直接設置樣式
    line1.value.style.height = `${verticalHeight}px`
    line1.value.style.transform = `translateX(${horizontalMove}px)`
    
    line2.value.style.height = `${verticalHeight * 0.8}px`
    line2.value.style.transform = `translateX(${horizontalMove * 0.7}px)`
    
    // 檢查樣式是否被應用
    console.log('Line1 styles:', {
      height: line1.value.style.height,
      transform: line1.value.style.transform
    })
  } else {
    console.log('Lines refs not available')
  }
}

// 使用 watchEffect 監聽變化
watchEffect(() => {
  console.log('watchEffect triggered', {
    scrollY: scrollY.value,
    isInTriggerZone: isInTriggerZone.value
  })
})

onMounted(() => {
  console.log('Component mounted')
  // 立即執行一次更新
  updateLines()
  
  // 添加滾動監聽
  window.addEventListener('scroll', updateLines, { passive: true })
  console.log('Scroll listener added')
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateLines)
  console.log('Scroll listener removed')
})
</script>

<template>
  <div class="line-container">
    <div ref="line1" class="line line-1">
      <div class="dot" :class="{ active: isInTriggerZone }"></div>
    </div>
    <div ref="line2" class="line line-2">
      <div class="dot" :class="{ active: isInTriggerZone }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-container {
  position: absolute;
  width: 100%;
  height: 200vh;
  z-index: 999;
  pointer-events: none;
}

.line {
  position: fixed;
  top: 0px;
  width: 5px; // 加粗線條
  transition: all 0.3s ease-out;
  
  &.line-1 {
    left: 50px;
    background-color: #0066ff !important; // 亮藍色
    z-index: 1000;
    opacity: 1 !important; // 確保完全不透明
  }
  
  &.line-2 {
    left: 70px;
    background-color: #ffcc00 !important; // 亮黃色
    z-index: 999;
    opacity: 1 !important;
  }
}

.dot {
  position: absolute;
  top: 100px;
  left: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid currentColor;
  transition: all 0.3s ease-out;
  
  .line-1 & {
    color: #0066ff; // 配合線條顏色
  }
  
  .line-2 & {
    color: #ffcc00; // 配合線條顏色
  }
  
  &.active {
    background-color: currentColor;
    transform: scale(1.2);
  }
}
</style>