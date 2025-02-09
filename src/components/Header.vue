<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSubMenuOpen = ref(false);


const toggleSubMenu = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value;
};


const handleClickOutside = (event) => {
  if (!event.target.closest('.nav-item')) {
    isSubMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <main>
    <header class="header">
      <div class="header-wrapper">
        <div class="logo">
          <a href="">
            <img src="../assets/images/Logo_white.svg" alt="logo" />
          </a>
        </div>
        <div class="nav-menu">
          <ul class="nav-item">
            <li><a href="">景點介紹</a></li>
            <li>
              <a href="#" @click.prevent="toggleSubMenu">
                積分任務 <span :class="{ 'rotate': isSubMenuOpen }">▼</span>
              </a>
              <ul class="sub-item" v-if="isSubMenuOpen">
                <li><a href="">一般任務</a></li>
                <li><a href="">特殊任務-半日遊</a></li>
                <li><a href="">特殊任務-一日遊</a></li>
              </ul>
            </li>
            <li><a href="">線上商城</a></li>
            <li><a href="">最新消息</a></li>
          </ul>
          </div>
          <div class="header-icon">
            <button class="cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                />
              </svg>
            </button>
            <button class="Login">登入</button>
          
        </div>
      </div>
    </header>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/sass/component/header.scss';


.rotate {
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}
</style>
