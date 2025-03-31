<template>
  <div class="modal-overlay" v-if="visible" @click.stop>
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <h2>問答結果</h2>
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
              height="253"
              viewBox="0 0 252 253"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M126 21.5C183.981 21.5 231 68.5187 231 126.5C231 184.481 183.981 231.5 126 231.5C68.0187 231.5 21 184.481 21 126.5C21 68.5187 68.0187 21.5 126 21.5ZM126 42.5002C79.685 42.5002 42.0002 80.1845 42.0002 126.5C42.0002 172.816 79.6845 210.5 126 210.5C172.316 210.5 210 172.816 210 126.5C210 80.1845 172.316 42.5002 126 42.5002ZM150.077 87.5767L164.923 102.424L140.847 126.5L164.923 150.577L150.077 165.424L126 141.347L101.923 165.424L87.0767 150.577L111.153 126.5L87.0767 102.424L101.923 87.5767L126 111.653L150.077 87.5767Z"
                fill="#E3002C"
              /></svg
          ></span>
        </div>
        <div class="title1 bold">{{ resultMessage }}</div>
      </div>
      <div class="modal-footer">
        <div class="confirm-btn" v-if="isCorrect">
          <button class="submit-btn small" @click="closeModal">確認</button>
        </div>
        <div class="btn-group" v-if="!isCorrect">
          <button class="btn small" @click="closeModal">關閉</button>
          <button class="btn small" @click="retryAnswer">重新作答</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert_L_result",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    resultMessage() {
      // 根據 isCorrect 來決定顯示的訊息
      return this.isCorrect ? "恭喜答對！" : "答錯了！";
    },
  },
  methods: {
    closeModal() {
      this.$emit("close"); // 通知父組件關閉彈窗
    },
    retryAnswer() {
      // 當使用者點擊重新作答時，發出 retry 事件
      this.$emit("retry");
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
