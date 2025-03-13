<script setup>

const handleStartExperience = () => {
  console.log('開始體驗');
};

</script>
<template>

<section class="hero">
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1>
          METRO GO<span class="metro-icon"
            ><img src="/src/assets/images/banner-icon.png"
          /></span>
        </h1>
        <p>
          在
          MetroGo，每個捷運站都是你的遊戲關卡，我們精心設計了橫跨五條捷運線的一日遊、半日遊等特殊任務
        </p>
        <p class="sub-text">透過拍照打卡，一步步探索台北的獨特魅力</p>
        <!-- <button class="btn-primary" @click.prevent="handleStartExperience">
          立即體驗<svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </button> -->
        <RouterLink to="/general-mission/red" custom v-slot="{ navigate }">        
          <button class="btn-primary" @click.prevent="handleStartExperience; navigate()">
          立即體驗<svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </button>
        </RouterLink>
      </div>
      <div class="hero-image">
        <img
          src="/src/assets/images/hero-banner.png"
          alt="MetroGo Illustration"
        />
      </div>
    </div>
 </section>

</template>

<style lang="scss" scoped>

@import'@/assets/sass/base/reset.scss';



.hero {
  width: 100%;
  background-color: #fff6fe;
  overflow: hidden;
  
  .hero-wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding-right: 80px;
    padding-left: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
}

  .hero-content {
    margin-top: 30px;
    flex: 1;
     & h1{
      font-size:48px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      margin-bottom: 20px;
     }
      & p{
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
      }
      & .sub-text{
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        margin-top: 10px;
      }
      & .btn-primary{
        margin-top:20px;
        font-size: 18px;
        background-color:#8C25C0;
        border:none;
        padding:15px 30px;
        color:#fff;
        border-radius: 30px;
      }
      & .btn-primary:hover{
        cursor: pointer;
        background-color: #fff;
        color: #8C25C0;
        border:2px solid #8C25C0;
      }
       & svg{
         margin-left: 5px;
       }

     }
  
     .metro-icon{
        display: inline-block;
        width: 30px;
        margin-left: 10px;

        & img{
          width: 100%;
          height: auto;
          object-fit: cover;
          overflow: hidden;
        }
     }
   



  .hero-image {
    margin-top: 20px;
    flex: 1;
    img {
      max-width: 100%;
      height: auto;
    }
  }


@media (max-width: 768px){

    .hero {
      .hero-wrapper {
        flex-direction: column;
        text-align: left;
        width: 100%;
        padding:20px 40px;
        
        .hero-content {
          margin-bottom: 2rem;
        }
      }
    }
}
 
    



</style>