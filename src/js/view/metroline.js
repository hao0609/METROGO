import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 註冊 GSAP 
gsap.registerPlugin(ScrollTrigger)

// 捲動初始化函式
export function initMetrolineScroll() {
  // 取得捲動所需的關鍵 DOM 元素
  const topSection = document.querySelector('.top-section')
  const smoothScroll = document.querySelector('.introduce')
  const group1 = document.querySelector('.group-1')
  const group2 = document.querySelector('.group-2')
  const group3 = document.querySelector('.group-3')
  
  // 確保所有必要元素存在
  if (!smoothScroll || !group1 || !group2 || !group3 || !topSection) {
    console.error('捲動初始化失敗：未找到必要的 DOM 元素')
    return () => {} // 返回空的清理函式
  }
  
  // 取得各組的實際高度
  const group1Height = group1.scrollHeight
  const group2Height = group2.scrollHeight
  const group3Height = group3.scrollHeight
  
  // 計算內容總高度（取最大值）
  const totalScrollHeight = Math.max(group1Height, group2Height, group3Height)
  
  // 計算各組的可滾動高度（減去視窗高度）
  const group1ScrollableHeight = group1Height - window.innerHeight
  const group2ScrollableHeight = group2Height - window.innerHeight
  const group3ScrollableHeight = group3Height - window.innerHeight
  
  // 滾動狀態追蹤
  const scrollState = {
    isInTopSection: true,
    currentProgress: 0.5, // 初始進度設為中點，支持雙向滾動
    direction: 0, // 0=靜止, 1=向下, -1=向上
    completed: false, // 是否完成滾動
    isHandlingWheel: false, // 是否正在處理滾輪事件
    realProgress: 0 // 實際進度，範圍 -1 到 1
  }
  
  // 初始位置設定（中間點）
  gsap.set(group1, { y: 0 })
  gsap.set(group2, { y: 0 })
  gsap.set(group3, { y: 0 })
  
  // 創建主滾動動畫
  const scrollTween = gsap.to({}, {
    duration: 1,
    paused: true,
    onUpdate: function() {
      // 獲取基本進度（0-1）
      const progress = this.progress()
      scrollState.currentProgress = progress
      
      // 計算真實進度 (-1 到 1)
      // 0.5 為中點，小於 0.5 為負進度，大於 0.5 為正進度
      const realProgress = (progress - 0.5) * 2
      scrollState.realProgress = realProgress
      scrollState.direction = Math.sign(realProgress)
      
      // 計算位移（使用絕對值確保正確的位移量）
      const progressAbs = Math.abs(realProgress)
      
      // 為每個組設置位置
      if (realProgress >= 0) {
        // 正向滾動
        gsap.set(group1, { y: -progressAbs * group1ScrollableHeight })
        gsap.set(group3, { y: -progressAbs * group3ScrollableHeight })
        gsap.set(group2, { y: progressAbs * group2ScrollableHeight })
      } else {
        // 反向滾動
        gsap.set(group1, { y: progressAbs * group1ScrollableHeight })
        gsap.set(group3, { y: progressAbs * group3ScrollableHeight })
        gsap.set(group2, { y: -progressAbs * group2ScrollableHeight })
      }
      
      // 檢查是否完成
      scrollState.completed = Math.abs(realProgress) >= 1
      
      // 輸出調試信息
      console.log(`進度 - 實際：${realProgress.toFixed(2)}`)
      console.log(`完成 - ${scrollState.completed}`)
      console.log(`方向 - ${scrollState.direction < 0 ? '向上' : scrollState.direction > 0 ? '向下' : '靜止'}`)
    }
  })
  
  // 設置初始進度為中點
  scrollTween.progress(0.5)
  
  // 建立頂部區域的固定觸發
  const pinTopSection = ScrollTrigger.create({
    trigger: topSection,
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
    onUpdate: function() {
      if (scrollState.completed) {
        this.disable() // 解除固定
      } else {
        this.enable() // 保持固定
      }
    }
  })
  
  // 滾輪事件處理器
  const wheelHandler = function(e) {
    if (scrollState.isInTopSection && !scrollState.completed) {
      e.preventDefault()
      
      // 設置處理標記
      scrollState.isHandlingWheel = true
      
      // 計算進度變化
      const progressDelta = e.deltaY * 0.0005
      let newProgress = scrollState.currentProgress + progressDelta
      
      // 在 0-1 範圍內限制進度
      newProgress = Math.min(1, Math.max(0, newProgress))
      
      // 更新動畫進度
      scrollTween.progress(newProgress)
      
      // 200ms 後解除處理標記
      setTimeout(() => {
        scrollState.isHandlingWheel = false
      }, 200)
    }
    
    // 處理已完成但想返回的情況
    if (scrollState.completed && scrollState.realProgress >= 0.99 && e.deltaY < 0) {
      // 向上滾動從 1.0 返回到 0.99
      e.preventDefault()
      
      scrollState.completed = false
      scrollTween.progress(0.99)
      
      console.log('從完成狀態返回')
    }
    else if (scrollState.completed && scrollState.realProgress <= -0.99 && e.deltaY > 0) {
      // 向下滾動從 -1.0 返回到 -0.99
      e.preventDefault()
      
      scrollState.completed = false
      scrollTween.progress(0.01)
      
      console.log('從負向完成狀態返回')
    }
  }
  
  // 滾動事件處理器
  const scrollHandler = function() {
    // 檢查是否在頂部區域
    const isInTopArea = window.scrollY < topSection.offsetHeight
    
    // 更新狀態
    scrollState.isInTopSection = isInTopArea
    
    // 未完成時防止離開頂部區域
    if (isInTopArea && !scrollState.completed) {
      window.scrollTo(0, 0)
    }
  }
  
  // 觸控支援
  let touchStartY
  
  const touchStartHandler = function(e) {
    touchStartY = e.touches[0].clientY
  }
  
  const touchMoveHandler = function(e) {
    if (!touchStartY) return
    
    const currentY = e.touches[0].clientY
    const diff = touchStartY - currentY
    touchStartY = currentY
    
    if (scrollState.isInTopSection && !scrollState.completed) {
      e.preventDefault()
      
      // 計算進度變化
      const progressDelta = diff * 0.001
      let newProgress = scrollState.currentProgress + progressDelta
      
      // 在 0-1 範圍內限制進度
      newProgress = Math.min(1, Math.max(0, newProgress))
      
      // 更新動畫進度
      scrollTween.progress(newProgress)
    }
    
    // 處理已完成但想返回的情況
    if (scrollState.completed && scrollState.realProgress >= 0.99 && diff < 0) {
      // 向上滾動從 1.0 返回到 0.99
      e.preventDefault()
      
      scrollState.completed = false
      scrollTween.progress(0.99)
      
      console.log('觸控：從完成狀態返回')
    }
    else if (scrollState.completed && scrollState.realProgress <= -0.99 && diff > 0) {
      // 向下滾動從 -1.0 返回到 -0.99
      e.preventDefault()
      
      scrollState.completed = false
      scrollTween.progress(0.01)
      
      console.log('觸控：從負向完成狀態返回')
    }
  }
  
  // 添加事件監聽
  document.addEventListener('wheel', wheelHandler, { passive: false })
  document.addEventListener('touchstart', touchStartHandler, { passive: true })
  document.addEventListener('touchmove', touchMoveHandler, { passive: false })
  window.addEventListener('scroll', scrollHandler)
  
  // 返回清理函式
  return function cleanup() {
    // 清理 ScrollTrigger
    if (pinTopSection) pinTopSection.kill()
    
    // 清理動畫
    if (scrollTween) scrollTween.kill()
    
    // 移除事件監聽器
    document.removeEventListener('wheel', wheelHandler)
    document.removeEventListener('touchstart', touchStartHandler)
    document.removeEventListener('touchmove', touchMoveHandler)
    window.removeEventListener('scroll', scrollHandler)
  }
}

