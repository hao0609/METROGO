

<script setup>
import { computed } from 'vue'

// 定義 props
const props = defineProps({
    message: {
    type: Object,
    required: true,
    validator: (value) => {
      return value &&
             typeof value === 'object' &&
             typeof value.userName === 'string' &&
             typeof value.rating === 'number' &&
             value.rating >= 0 &&
             value.rating <= 5 &&
             typeof value.content === 'string' &&
             Array.isArray(value.images) &&
             typeof value.timestamp === 'string'
    }
  }
})

// 預設頭像
const defaultAvatar = computed(() => {
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%23E0E0E0"/%3E%3Cpath d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%23999"/%3E%3C/svg%3E'
})
</script>


<template>
    <div class="message-card">
        <div class="message-header">
        <img
        :src="defaultAvatar"
        :alt="message.userName + '的頭像'"
            class="user-avatar"
        />
        <div class="user-info">
            <span class="user-name">{{ message.userName }}</span>
            <span class="rating">{{ '★'.repeat(message.rating) + '☆'.repeat(5 - message.rating) }}</span>
        </div>
        </div>
        <div class="message-content">
        {{ message.content }}
        </div>
        <div class="message-img-group">
        <img
            v-for="(image, index) in message.images"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            class="message-image"
        />
        </div>
        <div class="timestamp">{{ message.timestamp }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/_metro-line.scss";
</style>