<script setup>
import { ref } from 'vue'
// 引入圖片
import teachingImg from '@/assets/images/game-icon.png'
import flexibilityImg from '@/assets/images/guide-icon.png'
import mentoringImg from '@/assets/images/product-icon.png'

const benefits = ref([
  {
    title: '貼近日常的互動遊戲',
    description:'透過有趣的互動遊戲，讓探索城市變得更加有趣',
    image: teachingImg  // 使用引入的圖片
  },
  {
    title: '捷運沿線景點推薦',
    description:'精選各站特色景點，帶你發現台北不為人知的一面',
    image: flexibilityImg
  },
  {
    title: '客製化商品',
    description:'獨特的紀念品和商品，記錄你的探索回憶',
    image: mentoringImg
  }
])
</script>

<template>

<section class="benefits">
      <h2>在這裡你可以得到甚麼？</h2>
      <div class="benefit-list">
        <div v-for="benefit in benefits" :key="benefit.title" class="benefit-item">
          <div class="benefit-image">
            <img :src="benefit.image" :alt="benefit.title">
          </div>
          <h6>{{ benefit.title }}</h6>
          <p class="descripition">{{ benefit.description }}</p>
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>

@import'@/assets/sass/base/reset.scss';


.benefits {
    gap: 40px;
    align-items: center;
    padding: 40px 0;
    width: 100%;
    background-color: #f8f0ff;
    display: flex;
    flex-direction: column;

    // 手機版增加上下間距
    @media (max-width: 768px) {
        padding: 30px 0;
        gap: 30px;
    }
}

.benefits h2 {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;

    // 平板
    @media (max-width: 1024px) {
        font-size: 32px;
    }

    // 手機
    @media (max-width: 768px) {
        font-size: 28px;
        padding: 0 20px;
    }
}

.benefit-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
    
    // 平板改為兩欄
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding: 0 40px;
    }

    // 手機改為單欄
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
    
    .benefit-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        gap: 16px;
        margin: 10px 60px;
        padding: 20px 0;
        border-radius: 15px;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);

        // 平板調整
        @media (max-width: 1024px) {
            margin: 0;
            padding: 30px 20px;
        }

        // 手機調整
        @media (max-width: 768px) {
            margin: 0;
            padding: 30px 15px;
        }
        
        .benefit-image {
            width: 200px;
            height: 200px;
            background: #ffba22;
            border-radius: 50%;
            margin-bottom: 0px;
            padding: 10px;
            display: block;

            // 平板尺寸
            @media (max-width: 1024px) {
                width: 180px;
                height: 180px;
            }

            // 手機尺寸
            @media (max-width: 768px) {
                width: 160px;
                height: 160px;
            }
            
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        h6 {
            font-size: 18px;
            font-weight: bold;
            color: #8C25C0;
            font-family: Arial, Helvetica, sans-serif;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }

        .descripition {
            font-size: 16px;
            color: #333;
            text-align: left;
            font-weight: 400;
            padding: 0 20px;
            width: 100%;

            @media (max-width: 768px) {
                font-size: 14px;
                text-align: center;
                padding: 0 15px;
            }
        }

        &:hover {
            box-shadow: 0 8px 15px rgba(0,0,0,0.1);
            transform: translateY(-10px);

            @media (max-width: 768px) {
                transform: translateY(-5px); // 手機版減少上移距離
            }
        }
    }
}

</style>