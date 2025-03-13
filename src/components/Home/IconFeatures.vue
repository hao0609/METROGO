<script setup>
import { ref } from 'vue';

import icon1 from '@/assets/images/icon1.png' 
import icon2 from '@/assets/images/icon2.png'
import icon3 from '@/assets/images/icon3.png'
import icon4 from '@/assets/images/icon4.png'

const features = ref([
  { icon: icon1, title: '獎勵積分', order: 1 },
  { icon: icon2, title: '互動遊戲', order: 2 },
  { icon: icon3, title: '任務成就', order: 3 },
  { icon: icon4, title: '購物商城', order: 4 }
]);
</script>

<template>
  <section class="icon-features">
    <div class="features-wrapper">
      <div v-for="feature in features" :key="feature.title" class="feature">
        <div class="icon"> <img :src="feature.icon" :alt="feature.title"></div>
        <p>{{ feature.title }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.icon-features {
  width: 100%;
  background: white;
  padding: 40px 0;
  overflow: hidden;
  
  .features-wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: flex;
    justify-content: space-around;
    gap: 4rem;
    flex-wrap: wrap; 

   
    @media (max-width: 1024px) {
      gap: 2rem;
      padding: 0 20px;
    }

   
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
      padding: 0 16px;
    }
  }

  .feature {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

 
    @media (max-width: 1024px) {
      width: calc(50% - 1rem); 
      margin-bottom: 1.5rem;
    }

   
    @media (max-width: 768px) {
      width: 100%; 
      margin-bottom: 1rem;
      
      
      justify-content: center;
      padding: 0 20px;
    }

    .icon {
      width: 80px;
      height: 80px;
      margin-bottom: 0.5rem;
      flex: none; 

    
      @media (max-width: 1024px) {
        width: 70px;
        height: 70px;
      }

     
      @media (max-width: 768px) {
        width: 100px;
        height: 100px;
        margin-bottom: 0;
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    p {
      font-size: 1.2rem;
      color: #333;
      flex: none; 
      margin-left: 20px;
      font-weight: bold;

   
      @media (max-width: 1024px) {
        font-size: 1.1rem;
      }

      
      @media (max-width: 768px) {
        font-size: 1rem;
        margin-left: 16px;
      }
    }
  }
}
</style>