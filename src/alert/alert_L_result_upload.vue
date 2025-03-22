<template>
  <div class="modal-overlay" v-if="visible" @click.stop>
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <h2>上傳結果</h2>
        <div class="result-icon" :class="{ correct: isCorrect, incorrect: !isCorrect }">
          <span v-if="isCorrect"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="252"
              height="253"
              viewBox="0 0 252 253"
              fill="none"
            >
              <path
                d="M126 21.5C68.25 21.5 21 68.75 21 126.5C21 184.25 68.25 231.5 126 231.5C183.75 231.5 231 184.25 231 126.5C231 68.75 183.75 21.5 126 21.5ZM126 210.5C79.695 210.5 42 172.805 42 126.5C42 80.195 79.695 42.5 126 42.5C172.305 42.5 210 80.195 210 126.5C210 172.805 172.305 210.5 126 210.5ZM174.195 80.09L105 149.285L77.805 122.195L63 137L105 179L189 95L174.195 80.09Z"
                fill="#00C9A7"
              /></svg
          ></span>
          <span v-else
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="252"
              height="252"
              viewBox="0 0 252 252"
              fill="none"
            >
              <path
                d="M126 233.577C184.748 233.577 233.577 184.851 233.577 126C233.577 67.2523 184.64 18.4229 125.892 18.4229C67.0457 18.4229 18.4277 67.2523 18.4277 126C18.4277 184.851 67.1492 233.577 126 233.577ZM126.005 215.649C76.2167 215.649 36.4502 175.779 36.4502 126C36.4502 76.3199 76.1087 36.3509 125.892 36.3509C175.568 36.3509 215.537 76.3244 215.645 126C215.748 175.783 175.671 215.649 125.996 215.649M125.892 145.089C130.95 145.089 133.799 142.24 133.902 136.759L135.486 81.0719C135.594 75.6899 131.373 71.6849 125.784 71.6849C120.087 71.6849 116.082 75.5864 116.186 80.9639L117.558 136.759C117.662 142.137 120.618 145.089 125.892 145.089ZM125.892 179.365C131.9 179.365 137.277 174.514 137.277 168.399C137.277 162.175 132.008 157.428 125.892 157.428C119.669 157.428 114.498 162.279 114.498 168.399C114.498 174.411 119.772 179.365 125.892 179.365Z"
                fill="#FCD34D"
              /></svg
          ></span>
        </div>
        <grandchild-component class="title1 bold">{{ lineTitle }}</grandchild-component>
        <div class="title1 bold">{{ resultMessage }}</div>
      </div>
      <div class="modal-footer">
        <div class="confirm-btn" v-if="isCorrect">
          <button class="submit-btn small" @click="closeModal">確認</button>
        </div>
        <div class="btn-group" v-if="!isCorrect">
          <button class="btn small" @click="closeModal">關閉</button>
          <button class="btn small" @click="retryUpload">重新上傳</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert_L_result_upload",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    lineTitle: { type: String, default: "" },
  },
  computed: {
    resultMessage() {
      // 根據 isCorrect 來決定顯示的訊息
      return this.isCorrect ? "上傳成功" : "訊號不佳或格式錯誤，請重新上傳";
    },
  },
  methods: {
    closeModal() {
      this.$emit("close"); // 通知父組件關閉彈窗
    },
    retryUpload() {
      // 當使用者點擊重新作答時，發出 retry 事件
      this.$emit("retry");
    },
  },
  // mounted() {
  //   console.log("lineTitle:", this.lineTitle);
  // },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
