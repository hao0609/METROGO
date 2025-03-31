<script setup>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import "animate.css";

import { RouterLink } from "vue-router";
import { ref, onMounted } from 'vue';
import { useNewsData } from "@/js/view/getNewsData.js";
import HomeProductList from "@/components/Home/ProductList.vue";

const { getLatestNews, formatDate, getImageUrl } = useNewsData();
const latestNews = ref([]);

onMounted(() => {
  // 獲取最新的兩筆新聞
  latestNews.value = getLatestNews();
});

</script>

<template>
  <Navbar_V1 />
  <!-- Banner -->
  <div class="banner">
    <h1>METROGO</h1>
    <div class="banner-content-container">
      <div class="person-container">
        <div class="left-container animate__animated animate__zoomInDown">
          <img src="../assets/images/home/hero-left.svg" alt="" />
        </div>
        <div class="right-container animate__animated animate__fadeInUpBig">
          <img src="../assets/images/home/hero-right.svg" alt="" />
        </div>
      </div>
      <div class="labels-container">
        <RouterLink to="/general-mission">
          <div
            class="icons-container gerneral-mission-img animate__animated animate__heartBeat"
          >
            <img src="../assets/images/home/gerneral_mission.svg" alt="" />
          </div>
          <p class="gerneral-mission-title btn bold">一般任務</p></RouterLink
        >

        <RouterLink to="/news">
          <div
            class="icons-container news-img animate__animated animate__heartBeat"
          >
            <img src="../assets/images/home/news.svg" alt="" />
          </div>
          <p class="news-title btn bold">最新消息</p>
        </RouterLink>

        <RouterLink to="/special-mission">
          <div
            class="icons-container special-mission-img animate__animated animate__heartBeat"
          >
            <img src="../assets/images/home/special_mission.svg" alt="" />
          </div>
          <p class="special-mission-title btn bold">特殊任務</p></RouterLink
        >

        <RouterLink to="/sights">
          <div
            class="icons-container sights-img animate__animated animate__heartBeat"
          >
            <img src="../assets/images/home/sights.svg" alt="" />
          </div>
          <p class="sights-title btn bold">景點介紹</p>
        </RouterLink>

        <RouterLink to="/store">
          <div
            class="icons-container store-img animate__animated animate__heartBeat"
          >
            <img src="../assets/images/home/store.svg" alt="" />
          </div>
          <p class="store-title btn bold">商城</p>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="benefits">
    <h2>透過我們可以得到</h2>
    <div class="card-container">
      <div class="card aqua-card">
        <p class="title1 bold">捷運沿線景點推薦</p>
        <p class="bold hidden">精選特色景點，帶你發現台北不為人知的一面</p>
        <div class="benefits-img hidden">
          <img src="../assets/images/home/benefits1.svg" alt="" />
        </div>
      </div>
      <div class="card orange-card">
        <p class="title1 bold">貼近日常的互動遊戲</p>
        <p class="bold hidden">透過有趣的任務遊戲，讓探索城市變得更豐富！</p>
        <div class="benefits-img hidden">
          <img src="../assets/images/home/benefits2.svg" alt="" />
        </div>
      </div>
      <div class="card pink-card">
        <p class="title1 bold">客製化的商品</p>
        <p class="bold hidden">獨特的紀念品和限定商品，紀錄你的探索回憶</p>
        <div class="benefits-img hidden">
          <img src="../assets/images/home/benefits3.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="news">
    <div class="title-btn">
      <h2>最新消息別錯過</h2>
      <RouterLink to="/news"><button class="btn_filled">查看更多</button></RouterLink>
    </div>
    <div class="news-container">
      <div 
        v-for="news in latestNews" 
        :key="news.title" 
        class="news-content"
      >
        <div class="news-img-container">
          <img :src="getImageUrl(news)" :alt="news.title" />
        </div>
        <div class="text-container">
          <div class="title-tag">
            <p class="title2 bold">
              {{ news.title }}
            </p>
            <div class="news-tag bold">
              {{ 
                news.type === 'news' ? '最新消息' : 
                news.type === 'store' ? '商城' : 
                '系統公告' 
              }}
            </div>
          </div>
          <p>{{ formatDate(news.posted) }}</p>
          <p class="new-desc">{{ news.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="products">
    <div class="title-btn">
      <h2>最新商品</h2>
      <RouterLink to="/store"><button class="btn_filled">查看更多</button></RouterLink>
    </div>
    <HomeProductList />
  </div>
  <!-- <HomeProducts /> -->
  <Footer />
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/home";
</style>
