<script setup>
 import { RouterView, RouterLink } from 'vue-router'
 import Header from '@/components/Header.vue';
 import Footer from '@/components/Footer.vue';
</script>

<template>
 
    <!--<保留 <router-view /> 来渲染路由组件 -->
    <div class="app-container">
    <Header />
    <RouterView/>
    <Footer />
  </div>
  
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>


