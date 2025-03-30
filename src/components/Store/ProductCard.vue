<script setup>
import { defineProps } from "vue";
// 引入 sweetalert2 彈窗
import Swal from "sweetalert2";

// 接收父組件傳遞過來的單一產品資料
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// 定義 emit 事件，讓父組件可以監聽
const emit = defineEmits(["toggle-favorite"]);

// 切換收藏狀態
const toggleFavorite = () => {
  emit("toggle-favorite", props.product);
};

// 彈出 SweetAlert2 商品資訊視窗
const showProductModal = (product) => {
  Swal.fire({
    title: product.name, // 顯示商品名稱
    html: `
      <img src="${product.image}" alt="${product.name}" style="width: 70%; height:auto; object-fit: cover; margin-bottom: 10px;">
      <h2 style="text-align:left; font-size:24px; padding-bottom:20px;" >商品描述</h2>
      <p style="text-align:left; font-size:14px; font-weight:bold;">${product.intro}</p>
      <h2 style="text-align:left ; font-size:24px; padding:20px 0px;" >商品規格</h2>
      <p style="text-align:left; font-size:14px; font-weight:bold;">${product.spec}</p>
    `,
    showConfirmButton: false, // 隱藏確認按鈕
    didOpen: () => {
      // 直接設置標題樣式
      document.querySelector(".swal2-title").style.fontWeight = "400";
    },
  });
};
</script>

<template>
  <div class="product-card">
    <div class="product-card__image">
      <img
        :src="product.image"
        :alt="product.name"
        @click="showProductModal(product)"
      />
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">$ {{ product.price }}</p>
    </div>
    <div class="product-card__actions">
      <p>{{ product.summary }}</p>
      <button
        class="product-card__favorite"
        :class="{ 'add-favorite': product.favorite }"
        @click.stop="toggleFavorite"
      >
        <span class="heart-icon"></span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/base/color.scss";
@import "@/assets/sass/base/reset.scss";

.product-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    transform: translateY(-5px);
  }

  &__image {
    position: relative;
    padding-top: 100%; // 正方形比例
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  &__name {
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: $neutral-700;
    font-weight: 600;
  }

  &__price {
    font-size: 18px;
    font-weight: bold;
    color: $primary-400;
  }

  &__actions {
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
    p {
      font-size: 14px;
    }
  }

  &__favorite {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin: 5px;
    &:hover {
      color: red;
    }
  }

  &__favorite {
    .heart-icon {
      width: 25px;
      height: 25px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>');
      background-size: contain;
      background-repeat: no-repeat;
    }

    &.add-favorite .heart-icon {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>');
    }
  }
}
</style>
