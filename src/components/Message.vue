<template>
  <div class="message-board">
    <div class="input-container">
      <textarea v-model="message" placeholder="撰寫評論..." class="input-box"></textarea>
      <label class="file-upload">
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="file-input"
        />
        <span>+</span>
      </label>
    </div>
    <button @click="submitMessage" class="submit-btn">送出</button>

    <!-- <div v-if="previewUrl" class="preview">
      <p>預覽圖片：</p>
      <img :src="previewUrl" alt="Uploaded Image" class="preview-image" />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");
const imageFile = ref(null);
// const previewUrl = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const submitMessage = () => {
  if (!message.value.trim() && !imageFile.value) {
    alert("請輸入留言或上傳圖片");
    return;
  }

  const formData = new FormData();
  formData.append("message", message.value);
  if (imageFile.value) {
    formData.append("image", imageFile.value);
  }

  console.log("送出的資料:", formData);
  alert("留言已送出！");

  // 清空輸入框與預覽
  message.value = "";
  imageFile.value = null;
  //   previewUrl.value = null;
};
</script>

<style scoped>
.message-board {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.input-box {
  flex: 1;
  height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 3px dashed #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}
.file-upload input {
  display: none;
}
.file-upload span {
  font-size: 14px;
  color: #555;
}
.submit-btn {
  width: 200px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #0056b3;
}
.preview {
  margin-top: 10px;
}
.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
