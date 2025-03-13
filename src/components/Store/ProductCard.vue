<script setup>

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'toggle-favorite', 'product-click'])

const addToCart = () => {
  emit('add-to-cart', props.product)
}

const toggleFavorite = () => {
  emit('toggle-favorite', props.product)
}

const handleProductClick = () => {
  console.log('商品卡片被點擊:', props.product)
  try {
    emit('product-click', props.product)
    console.log('已觸發click-product事件')
  } catch (e) {
    console.error('觸發事件错誤:', e)
  }
}
</script>

<template>
    
<div class="product-card"  @click="handleProductClick">
    <div class="product-card__image">
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">{{ product.price }}</p>
    </div>
    <div class="product-card__actions">
      <button 
        class="product-card__favorite" 
        :class="{ 'is-favorite': product.isFavorite }"
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
@import '@/assets/sass/base/color.scss';
@import '@/assets/sass/base/reset.scss';



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
    color:$neutral-700;
  }
  
  &__price {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color:$primary-400;
  }
  
  &__actions {
    display: flex;
    padding: 0 15px 15px;
    justify-content: space-between;
  }
  
  &__favorite, &__cart {
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