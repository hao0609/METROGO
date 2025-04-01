<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 引入 Swiper 輪播
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperInstance = ref(null);

// 輪播圖片陣列
const bannerImages = ref([
  {
    desktop: "/tid201/g2/images/store/storeBanner1.png",
    mobile: "/tid201/g2/images/store/storeBanner1.png",
  },
  {
    desktop: "/tid201/g2/images/store/storeBanner2.png",
    mobile: "/tid201/g2/images/store/storeBanner2.png",
  },
  {
    desktop: "/tid201/g2/images/store/storeBanner3.png",
    mobile: "/tid201/g2/images/store/storeBanner3.png",
  },
]);

// 監聽搜尋輸入，通知ProductList 組件
const searchQuery = ref("");
const placeholder = "想找什麼？";
const emit = defineEmits();
// 當搜尋內容改變時，發送事件將搜尋結果傳遞給父組件
const onSearch = () => {
  emit("search", searchQuery.value);
  console.log("你正在鍵入: " + searchQuery.value);
};
const isMobile = ref(false);

// 檢查螢幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  // 初始檢查
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // 初始化 Swiper
  swiperInstance.value = new Swiper(".swiper", {
    modules: [Autoplay, Navigation, Pagination],
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      // 已移除 bulletActiveClass 設定
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);

  // 清理 Swiper 實例
  if (swiperInstance.value) {
    swiperInstance.value.destroy();
  }
});
</script>

<template>
  <div class="banner-container">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(image, index) in bannerImages"
          :key="index"
        >
          <div
            class="banner"
            :style="{
              backgroundImage: `url(${
                isMobile ? image.mobile : image.desktop
              })`,
            }"
          ></div>
        </div>
      </div>
      <!-- 輪播控制項 -->
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div class="banner-search">
      <div class="search">
        <div class="search-container">
          <i class="search-icon" @click="onSearch"></i>
          <input
            type="text"
            class="search-input"
            :placeholder="placeholder"
            v-model="searchQuery"
            @keyup.enter="onSearch"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../assets/sass/base/color";

.banner-container {
  position: relative;
  height: 450px;
  overflow: hidden;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100%;
  height: 100%;
}

.banner {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-search {
  position: absolute;
  z-index: 10; // 提高層級，確保在輪播上方
  max-width: 800px;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
}

.search {
  width: 100%;

  &-container {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 25px;
    padding: 10px 40px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &-icon {
    width: 20px;
    height: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  &-input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;

    &::placeholder {
      color: #999;
    }
  }
}

// 自定義導航按鈕樣式
.swiper-button-next,
.swiper-button-prev {
  color: $neutral-200;
  margin: 0 40px; // 讓按鈕不要太靠邊
  width: 50px;
  height: 50px;

  &::after {
    font-size: 20px;
    border-radius: 50%;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 添加陰影效果
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
  }
}

.swiper-pagination {
  bottom: 20px !important;
}

.swiper-pagination-bullet {
  opacity: 0.7;
  background: white;
  width: 10px;
  height: 10px;
  margin: 0 6px;
}

.search-results {
  margin-top: 20px;
}
.search-results ul {
  list-style: none;
  padding: 0;
}
.search-results li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.search-results img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.search-icon:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

@media screen and (max-width: 768px) {
  .banner-search {
    left: 5%;
    right: 5%;
    max-width: 90%;
  }

  .search {
    &-input {
      font-size: 20px;
    }
  }
  .search-container {
    padding: 8px 20px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    margin: 0 15px;

    &::after {
      font-size: 18px; // 縮小按鈕大小
      padding: 8px 12px;
    }
  }
}

@media screen and (max-width: 480px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
}
</style>
