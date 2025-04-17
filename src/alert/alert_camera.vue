<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <button class="close-btn" @click="handleCancel">
        <span>&#10005;</span>
      </button>
      <div class="modal-body">
        <div class="camera-container">
          <!-- 顯示相機畫面 -->
          <video ref="videoRef" autoplay playsinline></video>
        </div>
        <canvas ref="canvasRef" class="hidden-canvas"></canvas>
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button @click="takePhoto" class="btn small capture-btn">拍照</button>
          <button @click="switchCamera" class="btn small flip-btn">翻轉鏡頭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const canvasRef = ref(null); // Canvas 用於擷取照片
const isCameraOpen = ref(false);
const streamRef = ref(null); // 存取相機串流
const videoRef = ref(null); // 影片元素
const imgSrc = ref("");
const currentFacingMode = ref("user");

// 初始化相機
const initCamera = async () => {
  try {
    streamRef.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: currentFacingMode.value },
    });
    if (videoRef.value) {
      videoRef.value.srcObject = streamRef.value;
    }
    isCameraOpen.value = true;
  } catch (error) {
    console.error("開啟相機失敗:", error);
  }
};

onMounted(async () => {
  await initCamera();
});
// onMounted(async () => {
//   try {
//     // 請求相機串流
//     streamRef.value = await navigator.mediaDevices.getUserMedia({
//       video: true,
//     });
//     // 將串流綁定到 video 元素上
//     if (videoRef.value) {
//       videoRef.value.srcObject = streamRef.value;
//     }
//     isCameraOpen.value = true;
//     // console.log("相機已開啟");
//   } catch (error) {
//     console.error("開啟相機失敗:", error);
//   }
// });
// 組件卸載前停止串流
onBeforeUnmount(() => {
  if (streamRef.value) {
    streamRef.value.getTracks().forEach((track) => track.stop());
  }
});
const closeCamera = () => {
  if (streamRef.value) {
    streamRef.value.getTracks().forEach((track) => track.stop());
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
  // 通知父層關閉彈窗
  emit("cancel");
};
// 拍照
const takePhoto = () => {
  if (!videoRef.value || !canvasRef.value) return;

  const context = canvasRef.value.getContext("2d");
  canvasRef.value.width = videoRef.value.videoWidth;
  canvasRef.value.height = videoRef.value.videoHeight;

  // 擷取相機畫面並轉成 base64 圖片
  context.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height);
  imgSrc.value = canvasRef.value.toDataURL("image/jpeg");
  // console.log("拍攝的圖片：", imgSrc.value);

  // 將拍攝的圖片透過事件傳送給父層
  emit("photoCaptured", imgSrc.value);

  // 自動關閉彈窗
  closeCamera();
};

// 切換相機（前/後鏡頭）
const switchCamera = async () => {
  // 停止現有的串流
  if (streamRef.value) {
    streamRef.value.getTracks().forEach((track) => track.stop());
  }

  // 切換鏡頭：如果原本為 "user" 則切換為 "environment"，反之亦然
  currentFacingMode.value = currentFacingMode.value === "user" ? "environment" : "user";

  try {
    // 依照新的 facingMode 重新獲取串流
    streamRef.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: currentFacingMode.value },
    });
    if (videoRef.value) {
      videoRef.value.srcObject = streamRef.value;
    }
  } catch (error) {
    console.error("切換相機失敗:", error);
  }
};
const emit = defineEmits(["photoCaptured", "cancel"]);

// 將拍攝的圖片透過事件傳送給父層
emit("photoCaptured", imgSrc.value);
const handleCancel = () => {
  emit("cancel");
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
