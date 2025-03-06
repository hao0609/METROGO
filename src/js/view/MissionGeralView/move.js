
import { ref, computed, onMounted, onUnmounted, nextTick,provide} from 'vue';

export function movejs() {
    const BASE_W = 1440;                // 基準寬度 (來自每個 SVG 檔的寬高)
    const BASE_H = 1024;                // 基準高度

    const mover = ref(null);                            // 代表 <div class="mover"> 元素                
    const stageW = ref(window.innerWidth);              // 當前畫面寬度
    const stageH = ref(window.innerHeight);             // 當前畫面高度
    const moverW = ref(0);                              // 代表 <div class="mover"> 元素的寬度
    const moverH = ref(0);                              // 代表 <div class="mover"> 元素的高度
    const dragX = ref(0);                               // 代表 dragging 的 X 座標
    const dragY = ref(0);                               // 代表 dragging 的 Y 座標
    const moving = ref(false);                          // 代表是否正在拖曳
    let px = 0, py = 0, dx = 0, dy = 0, frameID = null; // px | py 代表上一次的 X | Y 座標, dx | dy 代表移動的變化量, frameID 代表 requestAnimationFrame (動畫幀) 的 ID
    const friction = 0.95;                              // 摩擦力效果，讓它逐漸停止而不是立即就停止

    
    // 讓視窗 Resize 時進行更新畫面寬高
    const updateSize = () => {
      stageW.value = window.innerWidth;                 // 當前畫面寬高
      stageH.value = window.innerHeight;

      moverW.value = stageW.value * 1.1;                // 讓 <div class="mover"> 元素的寬度為畫面寬度的 1.1 倍
      moverH.value = moverW.value * (BASE_H / BASE_W);  // 讓 <div class="mover"> 元素的高度為用原始比例 (1440*1024) 與 moverW 的比例去計算出高度

      if (moverH.value < stageH.value) {                // 假設 moverH 計算出的高度小於畫面高度
        moverH.value = stageH.value * 1.1;              // 則 moverH 的高度為畫面高度的 1.1 倍
        moverW.value = moverH.value / (BASE_H / BASE_W);// 然後 moverW 的寬度為用原始比例 (1440*1024) 與 moverH 的比例去計算出寬度
      }

       // 確保拖曳位置仍在正常範圍內
       dragX.value = Math.min(0, Math.max(dragX.value + dx, stageW.value - moverW.value)); // dragX值 不能大於 0 且不能小於 stageW - moverW
       dragY.value = Math.min(0, Math.max(dragY.value + dy, stageH.value - moverH.value)); // dragY值 不能大於 0 且不能小於 stageH - moverH

        //  console.log(moverW.value,moverH.value);

        // // 提供給子組件使用
        // provide('moverW', moverW.value);
        // provide('moverH', moverH.value);
       
    };


     // 開始 Drag
    const startDrag = (event) => {
      console.log("Drag started"); // Debugging

      moving.value = true;                                                      // 代表開始拖曳
      const clientX = event.touches ? event.touches[0].clientX : event.clientX; // 判斷是否為觸控事件，是: 取觸控點的 clientX 值 否: 取滑鼠指標的 clientX 值
      const clientY = event.touches ? event.touches[0].clientY : event.clientY; // 判斷是否為觸控事件，是: 取觸控點的 clientY 值 否: 取滑鼠指標的 clientY 值
      px = clientX;                                                             // px 紀錄此次 drag 的 X 座標
      py = clientY;                                                             // py 紀錄此次 drag 的 Y 座標
      dx = 0;                                                                   // 重置 dx 移動量為 0 確保拖曳 X 時的位移變化值是從 0 開始計算
      dy = 0;                                                                   // 重置 dy 移動量為 0 確保拖曳 Y 時的位移變化值是從 0 開始計算

      document.addEventListener("mousemove", onDrag);                           // 監聽滑鼠拖曳 (onDrag)
      document.addEventListener("mouseup", stopDrag);                           // 監聽滑鼠放開，停止拖曳 (stopDrag)
      document.addEventListener("touchmove", onDrag, { passive: false });       // 監聽手指拖曳 (onDrag)，加上 { passive: false } 防止瀏覽器滾動
      document.addEventListener("touchend", stopDrag);                          // 監聽手指離開 (stopDrag)，結束拖曳
    };

    const onDrag = (event) => {
      if (!moving.value) return;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      dx = clientX - px;
      dy = clientY - py;
      px = clientX;
      py = clientY;

      dragX.value = Math.min(0, Math.max(dragX.value + dx, stageW.value - moverW.value));
      dragY.value = Math.min(0, Math.max(dragY.value + dy, stageH.value - moverH.value));

      console.log(`Dragging: X=${dragX.value}, Y=${dragY.value}`); // Debugging

      mover.value.classList.add("dragging"); // 開始拖曳
    };

    const stopDrag = () => {
      console.log("Drag stopped"); // Debugging
      moving.value = false;
      mover.value.classList.remove("dragging"); // 停止拖曳

      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onDrag, { passive: false });
      document.removeEventListener("touchend", stopDrag);

      frameID = requestAnimationFrame(inertiaMove);
    };

    const inertiaMove = () => {
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return;
      dx *= friction;
      dy *= friction;
      dragX.value = Math.min(0, Math.max(dragX.value + dx, stageW.value - moverW.value));
      dragY.value = Math.min(0, Math.max(dragY.value + dy, stageH.value - moverH.value));
    
      frameID = requestAnimationFrame(inertiaMove);
    };

    const moverStyle = computed(() => ({
      width: `${moverW.value}px`,
      height: `${moverH.value}px`,
      transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${dragX.value}, ${dragY.value}, 0, 1)`,
      willChange: "transform"
    }));

    const active = computed({
      get() {
        return mover.value?.classList.contains('active') || false;
      },
      set(value) {
        if (mover.value) {
          if (value) {
            mover.value.classList.add('active');
          } else {
            mover.value.classList.remove('active');
          }
        }
      }
    });

    onMounted(async () => {
      window.addEventListener("resize", updateSize);
      updateSize();

      await nextTick();
      if (mover.value) {
        mover.value.addEventListener("mousedown", startDrag);
        mover.value.addEventListener("touchstart", startDrag, { passive: false });
      }

    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateSize);
      if (mover.value) {
        mover.value.removeEventListener("mousedown", startDrag);
        mover.value.removeEventListener("touchstart", startDrag, { passive: false });
      }
      cancelAnimationFrame(frameID);
    });

    return {
        mover,
        moverStyle,
        active,
    };
} 
    
    