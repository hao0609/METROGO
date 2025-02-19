<template>
  <div class="task-with-reward">
    <div class="task-title">{{ task.title }}</div>

    <!-- 進度條 + 領取按鈕 -->
    <div class="progress-container">
      <progress :value="task.progress" max="100"></progress>
      <button v-if="task.progress < 100" @click="$emit('claim')">
        領取獎勳
      </button>
      <button v-else disabled class="claimed-btn">已領取</button>
    </div>

    <!-- 獎勵徽章（進度達到 100 顯示） -->
    <!-- <div v-if="task.progress === 100" class="badge-container">
      <img :src="badge" alt="徽章" />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    task: Object, // { progress: 50, title: "捷運站 1" }
    badge: String, // "捷運徽章 1.png"
  },
};
</script>

<style scoped>
.task-with-reward {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.task-title {
  font-size: 16px;
  font-weight: bold;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.badge-container {
  text-align: center;
  margin-top: 10px;
}

.badge-container img {
  width: 50px;
  height: 50px;
}
</style>
