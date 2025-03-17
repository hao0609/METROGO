<template>
  <div class="modal-overlay" @click.stop>
    <div class="modal-content" @click.stop>
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <button class="close-btn" @click="handleCancel">
        <span>&#10005;</span>
      </button>
      <div class="modal-body">
        <div class="title1 bold">{{ message }}</div>
        <div class="title2 bold">{{ message2 }}</div>
        <div class="add-photo">
          <span v-if="!imgSrc" class="add-icon">+</span>
          <!-- 顯示拍照後的圖片  -->
          <img
            v-if="imgSrc"
            :src="imgSrc"
            alt="Captured Photo"
            class="alert-img"
          />
        </div>
      </div>
      <alert_camera
        v-if="showCamera"
        ref="alert_camera_ref"
        @photoCaptured="handlePhotoCaptured"
        @cancel="showCamera = false"
      />
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn small" @click="CameraClick">開啟相機</button>
          <alert_user_camera_open ref="alert_user_camera_open_ref" />
          <input
            type="file"
            id="photo-upload"
            ref="fileInput"
            accept="image/*"
            class="hidden-input"
            @change="photoChange"
          />
          <label for="photo-upload" class="btn small">從相簿上傳</label>
        </div>
        <button
          class="submit-btn"
          @click="uploadPhoto"
          :disabled="!selectedPhoto"
        >
          送出
        </button>
      </div>
      <div class="modal-img right">
        <img src="../assets/images/MissionSpecial/img_addPhoto.svg" alt="" />
      </div>
      <div class="modal-img left">
        <img src="../assets/images/MissionSpecial/img_addPhoto2.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
// import alert_user_photo_open from "@/alert/alert_user_photo_open.vue";
import alert_user_camera_open from "@/alert/alert_user_camera_open.vue";
import alert_camera from "@/alert/alert_camera.vue";
import { storage } from "@/firebase/firebasePhotoUpload.js";
import {
  ref as fsRef,
  uploadBytes,
  getDownloadURL,
} from "firebasePhotoUpload/storage";

const props = defineProps({
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  message2: { type: String, default: "" },
  img: { type: String, default: null },
});

// 上傳
const selectedPhoto = ref(null); // 使用者上傳的檔案
const downloadURL = ref(""); // 上傳檔案的下載連結
const error = ref(""); // 上傳失敗的訊息
// const photoChange = (e) => {
//   selectedPhoto.value = e.target.files[0];
// };
// 處理圖片選擇
const photoChange = (e) => {
  const file = e.target.files[0]; // 獲取選擇的檔案
  if (file) {
    selectedPhoto.value = file; // 儲存選擇的圖片檔案
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("檔案讀取完成，結果：", reader.result);
      imgSrc.value = reader.result; // 用 FileReader 來生成圖片的 Data URL 並設定預覽
    };
  }
};

const uploadPhoto = async () => {
  // 存入的檔案名稱，例如: 資料夾/時間戳記_原來的檔案名稱
  const fileName = `images/${Date.now()}_${selectedPhoto.value.name}`;
  const storageRef = fsRef(storage, fileName);

  try {
    error.value = ""; // 清除之前的錯誤訊息(如果有的話)，避免影響到目前的上傳
    const snapshot = await uploadBytes(storageRef, selectedPhoto.value); // 將選好的檔案存到剛剛建立的儲存位置
    downloadURL.value = await getDownloadURL(snapshot.ref);
  } catch (err) {
    error.value = `Error uploading file: ${err.message}`;
    console.log(error.value);
  }
};

// 相機
const alert_user_camera_open_ref = ref(null); // 相機權限
const alert_camera_ref = ref(null); // 相機畫面
const showCamera = ref(false);
const imgSrc = ref("");
const CameraClick = async () => {
  if (await checkCamera()) {
    showCamera.value = true;
    console.log("開啟相機");
  } else {
    console.log("無法存取相機");
    alert_user_camera_open_ref.value.CameraOpenShowAlert(); // 無權限，顯示提示彈窗
  }
};

const checkCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("相機存取成功，權限已開啟");

    // 立即停止所有相機串流，避免佔用資源
    stream.getTracks().forEach((track) => track.stop());

    return true; // 回傳 true 表示相機可用
  } catch (error) {
    console.error("無法存取相機:", error);
    return false; // 回傳 false 表示相機無法使用
  }
};
const handlePhotoCaptured = (photoData) => {
  imgSrc.value = photoData;
};

const emit = defineEmits("cancel");

// const uploadFile = () => {
//   emit("confirm");
// };

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
