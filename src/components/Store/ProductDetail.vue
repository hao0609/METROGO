<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
  // 保留原有的props
  product: {
    type: Object,
    required: true
  },
  additionalImages: {
    type: Array,
    default: () => []
  },
  productDescriptionImage: {
    type: String,
    default: ''
  },
  productDescription: {
    type: String,
    default: '尚無商品描述'
  },

 
  descriptionImages: {
    type: Array,
    default: () => []
  }
});

// 交互狀態
const selectedImageIndex = ref(0);
const selectedColor = ref(props.colors && props.colors.length > 0 ? props.colors[0].value : null);
const quantity = ref(1);
const isInWishlist = ref(props.product?.isFavorite || false);

// 標籤頁配置 - 移除了規格標籤
const tabs = [
  { label: '商品描述', value: 'description' }
];
const activeTab = ref(0);

// 方法
const selectImage = (index) => {
  selectedImageIndex.value = index;
};

const addToCart = () => {
  console.log('添加到購物車', {
    productId: props.product.id,
    name: props.product.name,
    color: selectedColor.value,
    quantity: quantity.value,
    price: props.product.price
  });
  
};

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
  console.log(isInWishlist.value ? '添加到收藏' : '從收藏中移除');
  
};

</script>

<template>
<div class="product-detail" v-if="product">
    <div class="product-detail__container">
      <!-- 商品圖片區 -->
      <div class="product-detail__images">
        <div class="product-detail__main-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-detail__thumbnails" v-if="additionalImages && additionalImages.length > 0">
          <div 
            v-for="(image, index) in additionalImages" 
            :key="index" 
            class="product-detail__thumbnail"
            :class="{ 'active': selectedImageIndex === index }"
            @click="selectImage(index)"
          >
            <img :src="image" :alt="`${product.name} - 圖 ${index + 1}`" />
          </div>
        </div>
      </div>
      
      <!-- 商品資訊區 -->
      <div class="product-detail__info">
        <h1 class="product-detail__title">{{ product.name }}</h1>
        <div class="product-detail__category">{{ product.category }}</div>
        
        <div class="product-detail__price">
          <span class="product-detail__current-price">{{ product.price }}</span>
        </div>
        

        
        <div class="product-detail__quantity">
          <h3>數量</h3>
          <div class="quantity-selector">
            <button 
              class="quantity-btn decrease" 
              @click="quantity > 1 && quantity--"
              :disabled="quantity <= 1"
            >-</button>
            <input type="number" v-model.number="quantity" min="1" max="99" />
            <button 
              class="quantity-btn increase" 
              @click="quantity < 99 && quantity++"
              :disabled="quantity >= 99"
            >+</button>
          </div>
        </div>
        
        <div class="product-detail__actions">
          <button class="action-btn add-to-cart" @click="addToCart">加入購物車</button>
          <button class="action-btn add-to-wishlist" @click="toggleWishlist">
            <i class="heart-icon" :class="{ 'filled': isInWishlist }">♥</i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 商品詳細資訊區 - 移除了規格標籤頁 -->
    <div class="product-detail__tabs">
      <div class="tabs-header">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="tab"
          :class="{ 'active': activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="tab-content">
        <div class="product-description">
          <div class="product-image-description" v-if="productDescriptionImage">
            <img :src="productDescriptionImage" alt="商品詳細圖" />
          </div>
          
          <div class="additional-description-images" v-if="descriptionImages && descriptionImages.length > 0">
            <img 
              v-for="(image, index) in descriptionImages" 
              :key="`desc-img-${index}`" 
              :src="typeof image === 'string' ? image : image.url" 
              :alt="typeof image === 'string' ? `${product.name} 詳細圖 ${index + 1}` : (image.alt || `${product.name} 詳細圖 ${index + 1}`)"
              class="additional-description-image"
            />
          </div>
          
          <div v-html="productDescription"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="product-detail__not-found">
    商品不存在或已下架
  </div>

</template>

<style lang="scss" scoped>

@import '@/assets/sass/base/color.scss';
@import '@/assets/sass/base/reset.scss';

// 商品詳情頁樣式
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  &__container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  
  // 圖片區域
  &__images {
    flex: 1;
    max-width: 50%;
    padding-right: 30px;
  }
  
  &__main-image {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid $neutral-150; // 添加了顏色
    border-radius: 4px;
    overflow: hidden;
    
    &::before {
      content: '';
      display: block;
      padding-top: 100%; 
    }
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  &__thumbnails {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  &__thumbnail {
    width: calc(25% - 8px);
    position: relative;
    border: 1px solid $neutral-150;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    
    &::before {
      content: '';
      display: block;
      padding-top: 100%; 
    }
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &.active {
      border-color: $primary-400;
      box-shadow: 0 0 0 2px rgba($primary-400, 0.3);
    }
  }
  
  // 商品資訊區域
  &__info {
    flex: 1;
    max-width: 50%;
  }
  
  &__title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  &__category {
    color: $neutral-400;
    margin-bottom: 15px;
    font-size: 16px;
  }
  
  &__price {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    
    .product-detail__current-price {
      font-size: 24px;
      font-weight: 600;
      color: red;
    }
  }
  
  &__colors {
    margin-bottom: 20px;
    
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  
  &__quantity {
    margin-bottom: 20px;
    
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    
    .quantity-selector {
      display: flex;
      align-items: center;
      width: 120px;
      height: 40px;
      border: 1px solid $neutral-150;
      border-radius: 4px;
      overflow: hidden;
      
      .quantity-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $neutral-50;
        border: none;
        font-size: 18px;
        
        &:hover:not(:disabled) {
          background-color: darken($neutral-50, 5%);
        }
      }
      
      input {
        flex: 1;
        height: 100%;
        border: none;
        text-align: center;
        font-size: 16px;
        
        // 移除輸入框上下箭頭
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Firefox */
        -moz-appearance: textfield;
      }
    }
  }
  
  &__actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    
    .action-btn {
      height: 46px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.add-to-cart {
        flex: 1;
        background-color: $primary-400;
        color: white;
        
        &:hover {
          background-color: #9538c4;
        }
      }
      
      &.add-to-wishlist {
        width: 46px;
        background-color: $neutral-50;
        
        .heart-icon {
          font-size: 24px;
          color: $neutral-400;
          
          &.filled {
            color: red;
          }
        }
        
        &:hover {
          background-color: darken($neutral-50, 5%);
        }
      }
    }
  }
  
  // 標籤頁樣式
  &__tabs {
    margin-bottom: 40px;
    width: 100%; 
    
    .tabs-header {
      display: flex;
      border-bottom: 1px solid $neutral-150;
      margin-bottom: 20px;
      
      .tab {
        padding: 12px 20px;
        cursor: pointer;
        position: relative;
        color: $neutral-400;
        
        &.active {
          color: $primary-400;
          font-weight: 500;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: $primary-400;
          }
        }
      }
    }
  }
    
  .tab-content {
    width: 100%; 
    
    .product-description {
      .product-image-description {
        margin-bottom: 20px;
        
        img {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
        }
      }
      
      p {
        margin-bottom: 15px;
      }
      
      .additional-description-images {
        margin-bottom: 20px;
        
        .additional-description-image {
          max-width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
          margin-bottom: 15px;
        }
      }
    }
  }
  
  &__not-found {
    text-align: center;
    padding: 60px 0;
    font-size: 18px;
    color: $neutral-50;
  }
}

</style>