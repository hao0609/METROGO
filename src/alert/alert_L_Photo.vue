<template>
  <div class="modal-overlay" @click.stop>
    <div class="modal-content" @click.stop>
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <button class="close-btn" @click="handleCancel">
        <span>&#10005;</span>
      </button>
      <div class="modal-body">
        <div class="title1 bold">{{ message }}</div>

        <div for="photo-upload" class="add-photo" id="dropzone" ref="dropzone">
          <label v-if="!imgSrc" class="add-icon" for="photo-upload">+</label>
          <!-- 顯示拍照後的圖片  -->
          <img v-if="imgSrc" :src="imgSrc" alt="Captured Photo" class="alert-img" />
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
        <button class="submit-btn" @click="uploadPhoto" :disabled="!selectedPhoto">
          送出
        </button>
        <alert_L_result_upload
          :isCorrect="isCorrect"
          :visible="showResult"
          :lineTitle="lineTitle"
          @close="closeModalHandler"
          @retry="retryHandler"
        />
        <!-- @close="showResult = false" -->
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
import { ref, onMounted, watch } from "vue";
// import alert_user_photo_open from "@/alert/alert_user_photo_open.vue";
import alert_user_camera_open from "@/alert/alert_user_camera_open.vue";
import alert_camera from "@/alert/alert_camera.vue";
import alert_L_result_upload from "@/alert/alert_L_result_upload.vue";
import { storage, database } from "@/firebase/firebaseConfig.js";
import { ref as fsRef, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import updateUser_UploadPhotoData from "../js/view/MissionSpecail/updateUser_UploadPhotoData";
const props = defineProps({
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  img: { type: String, default: null },
  lineTitle: { type: String, default: "" },
  mission: { type: String, default: "" },
  GetUserId: { type: String, default: "" },
  checkText: { type: String, default: "" },
});

// 告訴父元件哪個站點的照片調整為審核中
const currentSation = ref("");

// dropzone
const dropzone = ref(null);
const dragOver = (event) => {
  event.preventDefault();
};
const fileInput = ref(null);
// 上傳
const selectedPhoto = ref(null); // 使用者上傳的檔案
const downloadURL = ref(""); // 上傳檔案的下載連結
const error = ref(""); // 上傳失敗的訊息
const uploadedFilePath = ref("");
const isCorrect = ref(false);
const showResult = ref(false);
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
// dropzone
const dropped = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file) return;
  selectedPhoto.value = file;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    // 更新預覽圖片
    imgSrc.value = reader.result;
  });
};
onMounted(() => {
  if (dropzone.value) {
    dropzone.value.addEventListener("dragover", dragOver);
    dropzone.value.addEventListener("drop", dropped);
  }
});
const uploadPhoto = async () => {
  const { lineTitle, mission, GetUserId } = props;
  // const timestamp = Date.now();
  // const originalFileName = selectedPhoto.value.name;
  // 取得今天的日期，並格式化為 YYYYMMDD 格式
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");
  const formattedDateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
  const fileName = `${mission}_${lineTitle}_${formattedDateTime}`;

  // Firebase Storage 儲存路徑
  const filePath = `photos/${GetUserId}/${fileName}`;
  const storageRef = fsRef(storage, filePath);
  // console.log("GetUserId:", GetUserId);
  // console.log("mission:", mission);
  // console.log("父元件的lineTitle:", lineTitle);

  try {
    error.value = ""; // 清除之前的錯誤訊息(如果有的話)，避免影響到目前的上傳
    const snapshot = await uploadBytes(storageRef, selectedPhoto.value); // 將選好的檔案存到剛剛建立的儲存位置
    downloadURL.value = await getDownloadURL(snapshot.ref);
    // console.error("獲取圖片 URL 失敗:", err);

    console.log("圖片上傳成功,URL:", downloadURL.value);

    // 照片上傳成功後，把用戶會員資料表的圖片 URL 跟 審核狀態變更為 "審核中"

    updateUser_UploadPhotoData(
      GetUserId,
      mission,
      lineTitle,
      downloadURL.value,
      formattedDateTime
    );

    currentSation.value = props.lineTitle;

    isCorrect.value = true;
    showResult.value = true; // 顯示上傳結果彈窗
    // 將上傳記錄直接存入以使用者 ID 為文件的 Firestore 文件中

    // const userDocRef = doc(database, "users", props.GetUserId);
    // await setDoc(
    //   userDocRef,
    //   {
    //     userId: props.GetUserId,
    //     mission: props.mission,
    //     imageURL: downloadURL.value,
    //     lineTitle: props.lineTitle,
    //     uploadedAt: serverTimestamp(),
    //     filePath: filePath,
    //   },
    //   { merge: true }
    // ); // 使用 merge 避免覆蓋其他欄位（如果需要累計資料則不適用）
    // 儲存至 Firestore
    // const uploadsCollectionRef = db, props.GetUserId, "uploads");
    // const docRef = await addDoc(uploadsCollectionRef, {
    //   mission: props.mission,
    //   imageURL: downloadURL.value,
    //   lineTitle: props.lineTitle,
    //   uploadedAt: serverTimestamp(),
    //   filePath: filePath, // 上傳路徑
    // });
    // console.log("Firestore 紀錄成功，文件 ID:", docRef.id);
    // console.log("Firestore 更新成功");
    error.value = "";

    emit("uploadSuccess", currentSation.value);
    // 更新 Vue 狀態
    downloadURL.value = downloadURL.value;
    isCorrect.value = true;
  } catch (err) {
    console.error("上傳失敗，filePath:", filePath, "錯誤訊息:", err.message, {
      GetUserId,
      mission,
      lineTitle,
    });
    isCorrect.value = false;
    error.value = `Error uploading file: ${err.message}`;
  } finally {
    showResult.value = true; // 顯示上傳結果彈窗
  }
};
// 當 isCorrect 變為 true 時，自動通知父元件上傳成功
watch(isCorrect, (newVal) => {
  if (newVal) {
    console.log("孫元件：上傳成功，觸發 uploadSuccess 事件");
    emit("uploadSuccess", {
      filePath: uploadedFilePath.value,
      downloadURL: downloadURL.value,
    });
  }
});
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

const emit = defineEmits(["cancel", "uploadSuccess", "retry"]);

// const uploadFile = () => {
//   emit("confirm");
// };
const closeModalHandler = () => {
  // 關閉結果彈窗，並同時關閉問題彈窗（例如發送 cancel 事件給父組件）
  showResult.value = false;
  emit("cancel"); // 可通知父組件關閉整個問答流程
  reset();
};
const handleCancel = () => {
  emit("cancel");
  reset();
};
const retryHandler = () => {
  showResult.value = false;
  emit("retry");
  reset();
};
const reset = () => {
  imgSrc.value = ""; // 清空圖片預覽
  selectedPhoto.value = null; // 清空選擇的檔案
  // 如果 fileInput 有 ref，則也可以清空它的值
  // if (fileInput.value) {
  //   fileInput.value.value = "";
  // }
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
