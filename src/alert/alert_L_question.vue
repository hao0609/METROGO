<template>
  <div class="modal-overlay" v-if="!showResult" @click.stop>
    <div class="modal-content" @click.stop>
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <div class="modal-body">
        <h2>問答</h2>
        <div class="question-container">
          <img
            class="img-qa qa"
            src="../assets/images/MissionSpecial/img_question.svg"
            alt=""
          />
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
    v-if="showResult"
    :visible="showResult"
    :isCorrect="isCorrect"
    @close="closeModalHandler"
    @retry="retryHandler"
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
      isCorrect: false, // 儲存答案是否正確
    };
  },
  emits: ["confirm", "cancel"],
  methods: {
    handleConfirm() {
      // 判斷答案
      this.isCorrect = this.selectedAnswer === this.question.correct;
      // 發送事件給父組件，傳遞 `question.id` 和 `isCorrect`
      this.$emit("update-question-status", {
        questionId: this.question.id,
        isCorrect: this.isCorrect,
      });
      // 顯示結果彈窗
      this.showResult = true;
    },

    handleCancel() {
      this.$emit("cancel");
      // this.reset();
    },
    // 可在送出時回傳選擇的答案
    selectAnswer(answerId) {
      this.selectedAnswer = answerId;
      this.question.selectedAnswer = answerId;
      // console.log("選擇的答案 id:", answerId);
    },
    closeModalHandler() {
      // 關閉結果彈窗，並同時關閉問題彈窗（例如發送 cancel 事件給父組件）
      this.showResult = false;
      this.$emit("cancel"); // 可通知父組件關閉整個問答流程
      // this.reset();
    },
    retryHandler() {
      this.showResult = false;
      // this.reset();
    },
    // reset() {
    //   // this.selectedAnswer = null; // 清空已選擇的答案
    //   this.isCorrect = false;
    // },
  },
  created() {
    if (this.question.selectedAnswer) {
      this.selectedAnswer = this.question.selectedAnswer;
    }
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
