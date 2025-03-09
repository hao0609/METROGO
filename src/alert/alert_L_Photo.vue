<template>
  <!-- <alert_web_M ref="alert_L_Photo" :alertInfo="AlertInfo"></alert_web_M> -->
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content mobile">
      <div class="close-button" @click="closeAlert">X</div>

      <div class="item-M">
        <!-- 圖片 -->
        <img :src="item.img" alt="image" class="modal-img" />
        <!-- 文字 -->
        <div class="txt">
          <!-- <div class="title2">{{ item.subtitle }}</div>
              <p>{{ item.message }}</p> -->
        </div>
        <!-- 按鈕 -->
        <footer class="modal-footer">
          <button class="btn cancel" @click="closeAlert">取消</button>
          <button class="btn confirm" @click="confirmAction">確認</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineExpose } from "vue";
// import alert_web_M from "../components/Alert_web_M.vue";

// const alert_L_Photo = ref(null);
const visible = ref(false);
const openPhotoAlert = () => {
  visible.value = true;
};

// const AlertInfo = {
//   // 彈窗內容資料
//   fristTitle: "123",
//   svg_icon: ``, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
//   SecondTittle: "123",
//   ThirdTittle: "123",
//   ButtonText: "123",
//   allowOutsideClick: null,
//   function: null,
// };

const confirmAction = () => {
  show.value = false;
};

const closeAlert = () => {
  visible.value = false;
};
// return {
//   title,
//   item,
//   items,
//   show,
//   confirmAction,
//   closeAlert,
// };

defineExpose({ openPhotoAlert }); // ✅ 讓父組件可以使用 showAlert_L_Photo()
</script>
<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
