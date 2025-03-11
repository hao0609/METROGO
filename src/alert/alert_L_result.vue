<template>
  <div class="modal-overlay" v-if="visible" @click.stop>
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <h2>{{ message }}</h2>
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn small" @click="closeModal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert_L_result",
  props: {
    visible: Boolean, // 控制彈窗顯示與否
    message: String, // 彈窗顯示的訊息
  },
  methods: {
    closeModal() {
      this.$emit("close"); // 通知父組件關閉彈窗
    },
  },
};
</script>
