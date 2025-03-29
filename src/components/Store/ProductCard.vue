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
const emit = defineEmits(["add-to-cart", "toggle-favorite"]);
// 加入購物車
const addToCart = () => {
  emit("add-to-cart", props.product);
};
// 切換收藏狀態
const toggleFavorite = () => {
  emit("toggle-favorite", props.product);
};

// 彈出 SweetAlert2 商品資訊視窗
const showProductModal = (product) => {
  let quantity = 1;
  Swal.fire({
    title: product.name, // 顯示商品名稱
    html: `
      <img src="${product.image}" alt="${
      product.name
    }" style="width: 100%; height:auto; object-fit: cover; margin-bottom: 10px;">
     <div style="display: flex; flex-direction: column; gap: 20px">
      <p style="font-size: 20px; color: #8C25C0 ; font-weight: 600;" >價格：$${
        product.price
      }</p>
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
        <button id="decrease-quantity" style="padding: 5px 10px;">-</button>
        <input id="quantity" value="${quantity}" style="font-size: 18px; text-align:center;" ></input>
        <button id="increase-quantity" style="padding: 5px 10px;">+</button>
     </div>
        </div>
      <button id="add-to-cart" style="margin-top: 10px; padding: 10px 20px; background-color: #ff9800; color: white; border: none; cursor: pointer;">
        加入購物車
      </button>
      <button id="toggle-favorite" style="margin-top: 10px; padding: 10px 20px; background-color: ${
        product.favorite ? "red" : "#ccc"
      }; color: white; border: none; cursor: pointer;">
        ${product.favorite ? "❤️ 取消收藏" : "🤍 加入收藏"}
      </button>
    `,

    showConfirmButton: false, // 隱藏確認按鈕
    customClass: {
      title: "custom-title", // 設定 title 的自定義類別
    },
    didOpen: () => {
      document.querySelector(".swal2-title").style.fontWeight = "400";
      // 綁定數量增加/減少按鈕
      document
        .getElementById("increase-quantity")
        .addEventListener("click", () => {
          quantity++;
          document.getElementById("quantity").value = quantity;
        });

      document
        .getElementById("decrease-quantity")
        .addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            document.getElementById("quantity").value = quantity;
          }
        });

      // 綁定加入購物車按鈕
      document.getElementById("add-to-cart").addEventListener("click", () => {
        emit("add-to-cart", { ...product, quantity });
        Swal.close(); // 關閉彈窗
      });

      // 綁定收藏按鈕
      document
        .getElementById("toggle-favorite")
        .addEventListener("click", () => {
          product.favorite = !product.favorite;
          emit("toggle-favorite", product);
          Swal.close(); // 關閉彈窗，避免 UI 沒有即時更新
        });
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
      <button
        class="product-card__favorite"
        :class="{ 'is-favorite': product.favorite }"
        @click.stop="toggleFavorite"
      >
        <span class="heart-icon"></span>
      </button>
      <button class="product-card__cart" @click.stop="addToCart">
        <span class="cart-icon"></span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/base/color.scss";
@import "@/assets/sass/base/reset.scss";

.product-card__name {
  font-weight: 600;
}

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
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  &__name {
    font-size: 16px;
    margin: 0 0 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: $neutral-700;
  }

  &__price {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: $primary-400;
  }

  &__actions {
    display: flex;
    padding: 0 15px 15px;
    justify-content: space-between;
  }

  &__favorite,
  &__cart {
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
      background: rgba(106, 13, 173, 0.1);
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

    &.is-favorite .heart-icon {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>');
    }
  }

  &__cart {
    .cart-icon {
      width: 25px;
      height: 25px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>
