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
        <div class="add-photo"><span class="add-icon">+</span></div>
        <!-- 可選擇性顯示圖片 -->
        <img v-if="img" :src="img" alt="Alert Image" class="alert-img" />
        <!-- </div> -->
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn small">拍照</button>
          <button class="btn small">從相簿上傳</button>
        </div>
        <button class="submit-btn" @click="handleConfirm">送出</button>
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

<script>
export default {
  name: "alert_L_Photo",
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    message2: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: null,
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    handleConfirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
