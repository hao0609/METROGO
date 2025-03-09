<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    name: "馬克杯",
    price: 900,
    image: "/src/assets/images/cap.png",
  },
  {
    id: 2,
    name: "T-shirt",
    price: 900,
    image: "/src/assets/images/T-shirt.png",
  },
  {
    id: 3,
    name: "識別證",
    price: 500,
    image: "/src/assets/images/card.png",
  },
  {
    id: 4,
    name: "明信片",
    price: 800,
    image: "/src/assets/images/card2.png",
  },
]);

const handleViewMoreProducts = () => {
  console.log("查看更多商品");
};

const handleAddToWishlist = (product) => {
  console.log("加入收藏:", product);
};

const handleAddToCart = (product) => {
  console.log("加入購物車:", product);
};

const handleCompareProduct = (product) => {
  console.log("加入比較:", product);
};
</script>

<template>
  <section class="products">
    <div class="products-wrapper">
      <div class="section-header">
        <h2>最新商品</h2>
        <button class="view-more" @click.prevent="handleViewMoreProducts">
          查看更多
        </button>
      </div>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">NT{{ product.price }}</span>
          </div>
          <div class="product-actions">
            <button
              class="action-btn"
              title="收藏"
              @click.prevent="handleAddToWishlist(product)"
            >
              ❤️
            </button>
            <button
              class="action-btn"
              title="加入購物車"
              @click.prevent="handleAddToCart(product)"
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products {
  background: #f8f0ff;
  width: 100%;
  padding: 40px 120px;

  // 平板
  @media (max-width: 1024px) {
    padding: 40px 60px;
  }

  // 手機
  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  .products-wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    // 手機版標題和按鈕改為垂直排列
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    h2 {
      font-size: 2rem;
      color: #333;
      font-weight: bold;

      @media (max-width: 1024px) {
        font-size: 1.8rem;
      }

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .view-more {
      background: #6a0dad;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 18px;

      @media (max-width: 768px) {
        width: 100%;
        padding: 12px;
      }

      &:hover {
        background: #fff;
        border: 2px solid #6a0dad;
      }
    }
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    // 平板改為兩欄
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    // 手機改為單欄
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      width: 100%; // 改為相對寬度
      box-shadow: 0 2px 8px rgba(106, 13, 173, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .product-image {
        width: 100%;
        aspect-ratio: 1 / 1;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .product-info {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #eee;

        @media (max-width: 768px) {
          padding: 1.2rem;
        }

        .product-name {
          color: #333;
          font-weight: 500;
        }

        .product-price {
          color: #6a0dad;
          font-weight: 600;
        }
      }

      .product-actions {
        display: flex;
        justify-content: space-around;
        padding: 1rem;

        @media (max-width: 768px) {
          padding: 1.2rem;
        }

        .action-btn {
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

          @media (max-width: 768px) {
            width: 44px;
            height: 44px;
            font-size: 1.4rem;
          }

          &:hover {
            background: rgba(106, 13, 173, 0.1);
          }
        }
      }
    }
  }
}
</style>
