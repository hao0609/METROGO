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
          <label v-if="!imgSrc" class="add-icon" for="photo-upload">+</label>
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
import { ref as fsRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
const props = defineProps({
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  message2: { type: String, default: "" },
  img: { type: String, default: null },
  mrtLine: { type: String, default: "" },
  stationTitle: { type: String, default: "" },
});

// 上傳
const selectedPhoto = ref(null); // 使用者上傳的檔案
const downloadURL = ref(""); // 上傳檔案的下載連結
const error = ref(""); // 上傳失敗的訊息
// 相機
const alert_user_camera_open_ref = ref(null); // 相機權限
const alert_camera_ref = ref(null); // 相機畫面
const showCamera = ref(false);
const imgSrc = ref("");
const photoChange = (e) => {
  const file = e.target.files[0]; // 獲取選擇的檔案
  if (file) {
    selectedPhoto.value = file; // 儲存選擇的圖片檔案
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // console.log("檔案讀取完成，結果：", reader.result);
      imgSrc.value = reader.result; // 用 FileReader 來生成圖片的 Data URL 並設定預覽
    };
  }
};
// 取得會員 ID
const getUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};
// 取得當天日期（格式：YYYYMMDD）
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};
const uploadPhoto = async () => {
  const userId = getUserId();

  const { mrtLine, stationTitle } = props;
  const timestamp = Date.now();
  const originalFileName = selectedPhoto.value.name;
  const fileName = `${stationTitle}_${timestamp}_${originalFileName}`;

  // Firebase Storage 儲存路徑
  const filePath = `photos/${userId}/${mrtLine}/${fileName}`;
  const storageRef = fsRef(storage, filePath);

  try {
    error.value = ""; // 清除之前的錯誤訊息(如果有的話)，避免影響到目前的上傳
    const snapshot = await uploadBytes(storageRef, selectedPhoto.value); // 將選好的檔案存到剛剛建立的儲存位置
    downloadURL.value = await getDownloadURL(snapshot.ref);
    console.log("上傳成功:", downloadURL);
  } catch (err) {
    error.value = `Error uploading file: ${err.message}`;
    console.error("上傳失敗:", err);
  }
};

// 相機
const CameraClick = async () => {
  if (await checkCamera()) {
    showCamera.value = true;
    // console.log("開啟相機");
  } else {
    // console.log("無法存取相機");
    alert_user_camera_open_ref.value.CameraOpenShowAlert(); // 無權限，顯示提示彈窗
  }
};

const checkCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // console.log("相機存取成功，權限已開啟");
    //
    // 立即停止所有相機串流，避免佔用資源
    stream.getTracks().forEach((track) => track.stop());

    return true; // 回傳 true 表示相機可用
  } catch (error) {
    console.error("無法存取相機:", error);
    return false; // 回傳 false 表示相機無法使用
  }
};

const emit = defineEmits("cancel");

// const uploadFile = () => {
//   emit("confirm");
// };

const handleCancel = () => {
  emit("cancel");
};
const handlePhotoCaptured = (photoData) => {
  imgSrc.value = photoData; // 更新圖片預覽

  // 檢查 photoData 是否為合法的 base64 格式
  if (!photoData || !photoData.includes("base64,")) {
    console.error("Invalid photoData format");
    return;
  }

  const base64Data = photoData.split(",")[1];
  try {
    const byteString = atob(base64Data);
    const mimeString = photoData.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    // 如果需要建立 File 物件，可這樣做：
    selectedPhoto.value = new File([blob], `photo_${Date.now()}.jpg`, {
      type: mimeString,
    });
  } catch (err) {
    console.error("Base64 decoding failed:", err);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
