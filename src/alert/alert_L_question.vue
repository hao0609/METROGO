<template>
  <div class="modal-overlay" @click.stop>
    <div class="modal-content" @click.stop>
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <div class="modal-body">
        <h2>問答</h2>
        <div class="question-container">
          <div class="question-title title1 bold white">
            {{ question.text }}
          </div>
          <div
            class="answer-group title1 bold"
            v-for="answer in question.answers"
            :key="answer.id"
            @click="selectAnswer(answer.id)"
            :class="{ selected: selectedAnswer === answer.id }"
          >
            <span class="answer-circle">{{ answer.id }}</span>
            <ol class="answer-list">
              <li>
                {{ answer.text }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn small" @click="handleCancel">關閉</button>
          <button
            class="submit-btn small"
            @click="handleConfirm"
            :disabled="!selectedAnswer"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
  <alert_L_result
    :visible="showResult"
    :message="resultMessage"
    @close="closeResult"
  />
</template>

<script>
import alert_L_result from "./alert_L_result.vue";
export default {
  name: "alert_L_question",
  components: {
    alert_L_result,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAnswer: null,
      showResult: false,
      resultMessage: "",
    };
  },
  emits: ["confirm", "cancel"],
  methods: {
    handleConfirm() {
      // 判斷答案
      if (this.selectedAnswer === this.question.correct) {
        this.resultMessage = "回答正確！";
      } else {
        this.resultMessage = "回答錯誤！";
      }
      // 顯示結果彈窗
      this.showResult = true;
    },
    handleCancel() {
      this.$emit("cancel");
    },
    // 可在送出時回傳選擇的答案
    selectAnswer(answerId) {
      this.selectedAnswer = answerId;
      // console.log("選擇的答案 id:", answerId);
    },
    reset() {
      this.selectedAnswer = null; // 清空已選擇的答案
      this.resultMessage = ""; // 清空結果訊息
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
