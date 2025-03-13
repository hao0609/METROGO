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
    realProgress: 0, // 實際進度，範圍 -1 到 1
    allowContinueScroll: false, // 允許繼續滾動到下一區塊
    isReverseScroll: false // 標記是否正在進行反向滾動
  }
  
  // 初始位置設定（中間點）
  gsap.set(group1, { y: 0 })
  gsap.set(group2, { y: 0 })
  gsap.set(group3, { y: 0 })
  
  
  // 建立頂部區域的固定觸發
  const pinTopSection = ScrollTrigger.create({
    trigger: topSection,
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
    onUpdate: function() {
      // 當完成且允許繼續滾動時解除固定，但如果正在反向滾動則保持固定
      if (scrollState.completed && scrollState.allowContinueScroll && !scrollState.isReverseScroll) {
        console.log('disable pin')
        this.disable() // 解除固定
      } else {
        console.log('enable pin')
        this.enable() // 保持固定
      }
    },
    onEnter: function() {
      console.log('進入頂部區域');
    },
    onLeave: function() {
      console.log('離開頂部區域');
    }
  })

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
      if(localStorage.getItem('isDialogOpen') === 'Y'){
        // 當Dialog打開時,永遠設置為未鎖定狀態
        scrollState.completed = true
      } else {
        scrollState.completed = Math.abs(realProgress) >= 1
        
        // 當滾動完成時自動允許滾動到下一區塊（只有向下方向時）
        if (Math.abs(realProgress) >= 1 && scrollState.direction > 0) {
          scrollState.allowContinueScroll = true;
          console.log('滾動完成，允許繼續滾動到下一區塊');
        }
      }
      
      // 輸出調試信息
      console.log(`進度 - 實際：${realProgress.toFixed(2)}`)
      console.log(`完成 - ${scrollState.completed}`)
      console.log(`方向 - ${scrollState.direction < 0 ? '向上' : scrollState.direction > 0 ? '向下' : '靜止'}`)
      console.log(`反向滾動 - ${scrollState.isReverseScroll}`)
    }
  })
  
  // 設置初始進度為中點
  scrollTween.progress(0.5)
  
  // 處理滾輪事件
  const wheelHandler = function(e) {
    // 檢查對話框狀態
    if(localStorage.getItem('isDialogOpen') === 'Y') {
      scrollState.completed = true
      scrollState.allowContinueScroll = true
      return // 對話框開啟時不處理滾輪事件
    } else if(localStorage.getItem('isDialogOpen') === 'N') {
      // 只有當不是在反向滾動模式且不是滾到底時才重置
      if (!scrollState.isReverseScroll && scrollState.realProgress < 0.99) {
        scrollState.completed = false
      }
    }
    
    // 檢查是否在頂部區域
    if (!scrollState.isInTopSection) {
      return // 不在頂部區域，不處理
    }
    
    // 檢查滾動方向
    const isScrollingDown = e.deltaY > 0
    
    // ===== 關鍵修改：直接處理滾到底後的反向滾動 =====
    if (scrollState.realProgress >= 0.99 && !isScrollingDown) {
      // 到達底部且向上滾動
      e.preventDefault()
      scrollState.isReverseScroll = true
      scrollState.completed = false
      scrollState.allowContinueScroll = false
      
      // 以 0.99 為起點開始反向滾動
      scrollTween.progress(0.99)
      console.log('從底部開始反向滾動')
      return
    }
    
    // ===== 關鍵修改：直接處理滾到頂後的正向滾動 =====
    if (scrollState.realProgress <= -0.99 && isScrollingDown) {
      // 到達頂部且向下滾動
      e.preventDefault()
      scrollState.isReverseScroll = true
      scrollState.completed = false
      scrollState.allowContinueScroll = false
      
      // 以 0.01 為起點開始正向滾動
      scrollTween.progress(0.01)
      console.log('從頂部開始正向滾動')
      return
    }
    
    // 當進度完成且用戶想繼續向下滾動到下一區塊
    if (scrollState.completed && scrollState.realProgress >= 0.99 && isScrollingDown && !scrollState.isReverseScroll) {
      scrollState.allowContinueScroll = true
      console.log('允許繼續滾動到下一區塊')
      return // 不阻止默認滾動行為
    }
    
    // 如果在反向滾動模式中
    if (scrollState.isReverseScroll) {
      e.preventDefault()
      
      // 計算進度變化
      const progressDelta = e.deltaY * 0.0005
      let newProgress = scrollState.currentProgress + progressDelta
      
      // 在 0-1 範圍內限制進度
      newProgress = Math.min(1, Math.max(0, newProgress))
      
      // 更新動畫進度
      scrollTween.progress(newProgress)
      
      // 如果進度回到中間區域，退出反向滾動模式
      if (newProgress >= 0.2 && newProgress <= 0.8) {
        scrollState.isReverseScroll = false
        console.log('退出反向滾動模式')
      }
      
      return
    }
    
    // 一般滾動處理：在頂部區域且未完成且不允許繼續滾動
    if (scrollState.isInTopSection && !scrollState.completed && !scrollState.allowContinueScroll) {
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
  }
  
  // 滾動事件處理器
  const scrollHandler = function() {
    // 檢查是否在頂部區域
    const isInTopArea = window.scrollY < topSection.offsetHeight
    
    // 更新狀態
    const wasInTopSection = scrollState.isInTopSection
    scrollState.isInTopSection = isInTopArea
    
    // 檢測用戶是否從下方區塊滾動回頂部區域
    if (isInTopArea && !wasInTopSection) {
      console.log('用戶從下方區塊滾動回頂部區域')
      // 重新啟用頂部區域的滾動功能
      pinTopSection.enable()
      scrollState.allowContinueScroll = false
      scrollState.completed = false
      scrollState.isReverseScroll = false
      
      // 重新設置滾動動畫進度為中點
      scrollTween.progress(0.5)
      
      // 重置群組位置
      gsap.set(group1, { y: 0 })
      gsap.set(group2, { y: 0 })
      gsap.set(group3, { y: 0 })
    }
    
    // 未完成時防止離開頂部區域，除非允許繼續滾動且不是反向滾動
    if (isInTopArea && (!scrollState.allowContinueScroll || scrollState.isReverseScroll)) {
      window.scrollTo(0, 0)
    }
    
    // 如果用戶滾動到頂部，重置繼續滾動狀態
    if (window.scrollY === 0 && scrollState.realProgress < 0.99) {
      scrollState.allowContinueScroll = false
      scrollState.isReverseScroll = false
    }
  }
  
  // 觸控支援
  let touchStartY
  
  const touchStartHandler = function(e) {
    touchStartY = e.touches[0].clientY
  }
  
  const touchMoveHandler = function(e) {
    if (!touchStartY) return
    
    // 檢查對話框狀態
    if(localStorage.getItem('isDialogOpen') === 'Y') {
      scrollState.completed = true
      scrollState.allowContinueScroll = true
      return // 對話框開啟時不處理觸控事件
    } else if(localStorage.getItem('isDialogOpen') === 'N') {
      // 只有當不是在反向滾動模式且不是滾到底時才重置
      if (!scrollState.isReverseScroll && scrollState.realProgress < 0.99) {
        scrollState.completed = false
      }
    }
    
    // 檢查是否在頂部區域
    if (!scrollState.isInTopSection) {
      return // 不在頂部區域，不處理
    }
    
    const currentY = e.touches[0].clientY
    const diff = touchStartY - currentY // 正值表示向下滑動，負值表示向上滑動
    touchStartY = currentY
    
    // 檢查滑動方向
    const isScrollingDown = diff > 0
    
    // ===== 關鍵修改：直接處理滾到底後的反向滑動 =====
    if (scrollState.realProgress >= 0.99 && !isScrollingDown) {
      // 到達底部且向上滑動
      e.preventDefault()
      scrollState.isReverseScroll = true
      scrollState.completed = false
      scrollState.allowContinueScroll = false
      
      // 以 0.99 為起點開始反向滑動
      scrollTween.progress(0.99)
      console.log('觸控：從底部開始反向滑動')
      return
    }
    
    // ===== 關鍵修改：直接處理滾到頂後的正向滑動 =====
    if (scrollState.realProgress <= -0.99 && isScrollingDown) {
      // 到達頂部且向下滑動
      e.preventDefault()
      scrollState.isReverseScroll = true
      scrollState.completed = false
      scrollState.allowContinueScroll = false
      
      // 以 0.01 為起點開始正向滑動
      scrollTween.progress(0.01)
      console.log('觸控：從頂部開始正向滑動')
      return
    }
    
    // 當進度完成且用戶想繼續向下滑動到下一區塊
    if (scrollState.completed && scrollState.realProgress >= 0.99 && isScrollingDown && !scrollState.isReverseScroll) {
      scrollState.allowContinueScroll = true
      console.log('觸控：允許繼續滾動到下一區塊')
      return // 不阻止默認滑動行為
    }
    
    // 如果在反向滑動模式中
    if (scrollState.isReverseScroll) {
      e.preventDefault()
      
      // 計算進度變化
      const progressDelta = diff * 0.001
      let newProgress = scrollState.currentProgress + progressDelta
      
      // 在 0-1 範圍內限制進度
      newProgress = Math.min(1, Math.max(0, newProgress))
      
      // 更新動畫進度
      scrollTween.progress(newProgress)
      
      // 如果進度回到中間區域，退出反向滑動模式
      if (newProgress >= 0.2 && newProgress <= 0.8) {
        scrollState.isReverseScroll = false
        console.log('觸控：退出反向滑動模式')
      }
      
      return
    }
    
    // 一般滑動處理：在頂部區域且未完成且不允許繼續滾動
    if (scrollState.isInTopSection && !scrollState.completed && !scrollState.allowContinueScroll) {
      e.preventDefault()
      
      // 計算進度變化
      const progressDelta = diff * 0.001
      let newProgress = scrollState.currentProgress + progressDelta
      
      // 在 0-1 範圍內限制進度
      newProgress = Math.min(1, Math.max(0, newProgress))
      
      // 更新動畫進度
      scrollTween.progress(newProgress)
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