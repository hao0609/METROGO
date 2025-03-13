<script setup>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import "animate.css";
// import HomeHero from "@/components/Home/HeroBanner.vue";
import HomeFeatures from "@/components/Home/IconFeatures.vue";

import HomeBenefits from "@/components/Home/Benfits.vue";
import HomeProducts from "@/components/Home/Products.vue";
import HomeNews from "@/components/Home/News.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <Navbar_V1 />
  <!-- Banner -->
  <div class="banner">
    <h1>METROGO</h1>
    <div class="left-container animate__animated animate__zoomInDown">
      <img src="../assets/images/home/hero-left.svg" alt="" />
    </div>
    <div class="right-container animate__animated animate__bounceInUp">
      <img src="../assets/images/home/hero-right.svg" alt="" />
    </div>
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
  <div class="benefits">
    <h2>透過我們可以得到</h2>
    <div class="card-container">
      <div class="card aqua-card">
        <p class="title1 bold">捷運沿線景點推薦</p>
        <p class="bold">精選特色景點，帶你發現台北不為人知的一面</p>
        <div class="benefits-img">
          <img src="../assets/images/home/benefits1.svg" alt="" />
        </div>
      </div>
      <div class="card orange-card">
        <p class="title1 bold">貼近日常的互動遊戲</p>
        <p class="bold">透過有趣的任務遊戲，讓探索城市變得更豐富！</p>
        <div class="benefits-img">
          <img src="../assets/images/home/benefits2.svg" alt="" />
        </div>
      </div>
      <div class="card pink-card">
        <p class="title1 bold">客製化的商品</p>
        <p class="bold">獨特的紀念品和限定商品，紀錄你的探索回憶</p>
        <div class="benefits-img">
          <img src="../assets/images/home/benefits3.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="news">
    <div class="title-btn">
      <h2>最新消息別錯過</h2>
      <button class="btn_filled">查看更多</button>
    </div>
    <div class="news-container">
      <div class="news-content">
        <div class="news-img-container">
          <img src="../assets/images/sample.jpg" alt="" />
        </div>
        <div class="text-container">
          <div class="title-tag">
            <p class="title2 bold">
              臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！
            </p>
            <div class="news-tag bold">景點介紹</div>
          </div>
          <p>2024/12/01</p>
          <p>
            從雙層巴士的高處俯瞰街景，感受城市夜晚的獨特氛圍，無論是古老的建築美感還是夜市裡的香氣四溢，都能讓你深刻體會臺北的文化魅力與活力。
          </p>
        </div>
      </div>
      <div class="news-content">
        <div class="news-img-container">
          <img src="../assets/images/sample.jpg" alt="" />
        </div>
        <div class="text-container">
          <div class="title-tag">
            <p class="title2 bold">
              臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！
            </p>
            <div class="news-tag bold">景點介紹</div>
          </div>
          <p>2024/12/01</p>
          <p>
            從雙層巴士的高處俯瞰街景，感受城市夜晚的獨特氛圍，無論是古老的建築美感還是夜市裡的香氣四溢，都能讓你深刻體會臺北的文化魅力與活力。
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="products">
    <div class="title-btn">
      <h2>最新商品</h2>
      <button class="btn_filled">查看更多</button>
    </div>
    <div class="products-card-container">
      <div class="product-card">
        <div class="product-img-container">
          <img src="../assets/images/cap.png" alt="" />
        </div>
        <div class="product-text">
          <p class="title1 bold product-title">馬克杯</p>
          <p>只是一個平凡的馬克杯而已。</p>
          <div class="price">$450</div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img-container">
          <img src="../assets/images/card.png" alt="" />
        </div>
        <div class="product-text">
          <p class="title1 bold product-title">馬克杯</p>
          <p>只是一個平凡的馬克杯而已。</p>
          <div class="price">$450</div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img-container">
          <img src="../assets/images/card2.png" alt="" />
        </div>
        <div class="product-text">
          <p class="title1 bold product-title">明信片組</p>
          <p>只是一組明信片而已。</p>
          <div class="price">$450</div>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img-container">
          <img src="../assets/images/T-shirt.png" alt="" />
        </div>
        <div class="product-text">
          <p class="title1 bold product-title">馬克杯</p>
          <p>只是一件衣服而已。</p>
          <div class="price">$450</div>
        </div>
      </div>
    </div>
  </div>
  <!-- <HomeProducts /> -->

  <Footer />
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/home";
</style>


