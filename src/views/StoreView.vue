<script setup>
import { ref } from 'vue';


const saleBanner = ref('/src/assets/images/store/store-banner.png');
const notebookCoffee = ref('/src/assets/images/store/notecoffee.png');
const camping = ref('/src/assets/images/store/service.png');
const cooking = ref('/src/assets/images/store/cook.png');
const towels = ref('/src/assets/images/store/towel.png');
const livingRoom = ref('/src/assets/images/store/home.png');


const handleExperience = () => {
  console.log('立即體驗點擊');
  
};

const handleDesignService = () => {
  console.log('設計服務點擊');
  
};

const handleLearnMore = (category) => {
  console.log(`了解更多關於 ${category} 的資訊`);
  
};


</script>
<template>
 
 <div class="section-b">
    <section class="sale-banner">
      <img :src="saleBanner" alt="SALE">
    </section>

    <!-- 生活質感升級 Section -->
    <section class="section">
      <h1 class="section-title">生活質感升級</h1>
      
      <section class="content-block">
        <section class="text-content">
          <h2>專業，從完美文具開始</h2>
          <p>嚴選商務文具，從筆記本到簽字筆，搭配精緻皮革收納，展現專業品味。讓每次書寫和展示，都能提升您的職場質感。</p>
          <button class="primary-btn" @click.prevent="handleExperience">立即選購</button>
        </section>
        <section class="image-content">
          <img :src="notebookCoffee" alt="筆記本和咖啡">
        </section>
      </section>
    </section>

    <!-- 為您打造專屬體驗 Section -->
    <section class="section">
      <h2 class="section-title">打造專屬體驗</h2>
      
      <section class="content-block reverse">
        <section class="text-content">
          <h2>軟裝設計服務</h2>
          <p>用心傾聽您的需求和願望，精心規劃每個細節，從此刻起打造屬於您的物品。</p>
          <button class="primary-btn" @click.prevent="handleDesignService">立即選購</button>
        </section>
        <section class="image-content">
          <img :src="camping" alt="用心傾聽">
        </section>
      </section>
    </section>

    <!-- 發掘日常的美好 Section -->
    <section class="section">
      <h2 class="section-title with-line">發掘日常的美好</h2>
      
      <section class="card-container">
        <!-- Card 1 -->
        <section class="card">
          <section class="card-image">
            <img :src="cooking" alt="日常料理">
          </section>
          <section class="card-content">
            <h3>日常好物</h3>
            <p>平價質感的日常文具，為生活增添一份溫暖。實用與美感兼具，讓每天的小確幸從文具開始。</p>
            <button class="small-btn" @click.prevent="handleLearnMore('cooking')">了解更多</button>
          </section>
        </section>

        <!-- Card 2 -->
        <section class="card">
          <section class="card-image">
            <img :src="towels" alt="優質毛巾">
          </section>
          <section class="card-content">
            <h3>限量好物</h3>
            <p>以驚喜超值單品，為美好的居家日常加值。不可錯過的限時優惠，現在買更划算！</p>
            <button class="small-btn" @click.prevent="handleLearnMore('towels')">了解更多</button>
          </section>
        </section>

        <!-- Card 3 -->
        <section class="card">
          <section class="card-image">
            <img :src="livingRoom" alt="現在流行好物">
          </section>
          <section class="card-content">
            <h3>現在買最划算</h3>
            <p>精選出清品，三件以上再享 9 折，買越多省越多。</p>
            <button class="small-btn" @click.prevent="handleLearnMore('hotItems')">了解更多</button>
          </section>
        </section>
      </section>
    </section>
 </div>

</template>

<style lang="scss" scoped>
@import '@/assets/sass/base/color.scss';
@import '@/assets/sass/base/reset.scss';



.section-b {
  font-family: 'Noto Sans TC', Arial, sans-serif;
  color: $neutral-700;
  
  
}

.section {
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: 'Dela Gothic One',sans-serif;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  


  
  &.with-line {
    position: relative;
    margin-bottom: 3rem;
    text-align: left;
    
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
  }
}


.sale-banner {
  margin-bottom: 2rem;
  width: 100%;
  height: 450px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}


.content-block {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  justify-content: center;
  margin:0 auto;
  
  
  .text-content {
    flex: 1;
    padding: 1rem;
    
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      
    }
    
    p {
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
  }
  
  .image-content {
    flex: 1;
    
    
    img {
      width: 100%;
      height: auto;
      border-radius: 15px;
     
    }
  }
}


.primary-btn {
  background-color: $primary-400;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: darken($primary-400, 10%);
  }
  
}

.small-btn {
  background-color: transparent;
  color: $primary-400;
  border: 1px solid $primary-400;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: $primary-400;
    color: white;
  }
  
  }



.card-container {
  display: flex;
  gap: 30px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  flex: 1;
  min-width: 300px;
  
  
  
  .card-image {
    width:350px;
    height: 450px;
    border-radius: 15px;
    
    
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      display: block;
    }
  }
  
  .card-content {
    padding: 1.5rem 0;
    
    h3 {
      margin-bottom: 0.8rem;
      font-weight: 600;
      font-size: 24px;
    }
    
    p {
      margin-bottom: 1.2rem;
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>