<script setup>
import { ref, computed, onMounted, defineProps, watch } from "vue";
import ProductCard from "../Store/ProductCard.vue";

const emit = defineEmits(["product-click"]);

// 接收父組件傳遞過來的 products
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  filteredProducts: {
    type: Array,
    required: false,
    default: () => [],
  },
});

// 處理頁面排序邏輯
const currentPage = ref(1);
const itemsPerPage = ref(8); // 一次顯示 8 個商品
const localFilteredProducts = ref([]);

const totalPages = computed(() => {
  return Math.ceil(localFilteredProducts.value.length / itemsPerPage.value);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return localFilteredProducts.value.slice(start, end);
});

// 切換頁面
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const activeSort = ref("newest");

// 排列應用
const applySorting = () => {
  switch (activeSort.value) {
    case "price-asc":
      localFilteredProducts.value.sort(
        (a, b) => extractPrice(a.price) - extractPrice(b.price)
      );
      break;
    case "price-desc":
      localFilteredProducts.value.sort(
        (a, b) => extractPrice(b.price) - extractPrice(a.price)
      );
      break;
    case "newest":
      // 根據 posted 日期從最新到最舊排序
      localFilteredProducts.value.sort(
        (a, b) => new Date(b.posted) - new Date(a.posted)
      );
      break;
  }

  currentPage.value = 1;
};

// 切換收藏狀態
const toggleFavorite = (product) => {
  product.favorite = !product.favorite;
};

const extractPrice = (priceString) => {
  return parseInt(priceString.replace(/[^0-9]/g, ""));
};

// 監聽排序方式變化
watch(activeSort, () => {
  currentPage.value = 1; // 只在排序方式變化時重置頁碼
  const currentSort = activeSort.value;

  switch (currentSort) {
    case "price-asc":
      localFilteredProducts.value.sort(
        (a, b) => extractPrice(a.price) - extractPrice(b.price)
      );
      break;
    case "price-desc":
      localFilteredProducts.value.sort(
        (a, b) => extractPrice(b.price) - extractPrice(a.price)
      );
      break;
    case "newest":
      localFilteredProducts.value.sort((a, b) => b.id - a.id);
      break;
  }
});

// 監聽產品資料變化，但不重置頁碼

watch(
  () => props.products,
  (newProducts) => {
    localFilteredProducts.value = [...newProducts];
    // 應用當前排序但不重置頁碼
    const currentSort = activeSort.value;

    switch (currentSort) {
      case "price-asc":
        localFilteredProducts.value.sort(
          (a, b) => extractPrice(a.price) - extractPrice(b.price)
        );
        break;
      case "price-desc":
        localFilteredProducts.value.sort(
          (a, b) => extractPrice(b.price) - extractPrice(a.price)
        );
        break;
      case "newest":
        localFilteredProducts.value.sort((a, b) => b.id - a.id);
        break;
    }
  },
  { immediate: true, deep: true }
);

// 監聽 filteredProducts
watch(
  () => props.filteredProducts,
  (newFilteredProducts) => {
    localFilteredProducts.value = [...newFilteredProducts];

    if (localFilteredProducts.value.length === 0) {
      currentPage.value = 1; // 當沒產品時，確保回到第一頁
    }
    applySorting();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  console.log(props.products); // 檢查是否有正確傳遞商品資料
  if (props.products && props.products.length > 0) {
    localFilteredProducts.value = [...props.products];
    applySorting();
  }
});
</script>

<template>
  <div class="product-list">
    <div class="product-list__filters">
      <div class="product-list__sort">
        <select v-model="activeSort" class="sort-select" @change="applySorting">
          <option value="newest">最新上架</option>
          <option value="price-asc">價格由低至高</option>
          <option value="price-desc">價格由高至低</option>
        </select>
      </div>
    </div>

    <div class="product-list__grid">
      <!-- 只顯示篩選後有商品的情況 -->
      <template v-if="paginatedProducts.length > 0">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @toggle-favorite="toggleFavorite"
        />
      </template>

      <!-- 顯示找不到商品的訊息 -->
      <div v-else class="empty-message">
        <p>目前沒有可顯示的商品。</p>
      </div>
    </div>

    <div class="product-list__pagination">
      <button class="pagination-btn prev" @click="prevPage">
        <span class="arrow-left"></span>
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        :class="['pagination-btn', { active: currentPage === page }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <span class="pagination-ellipsis" v-if="totalPages > 5">...</span>
      <button
        class="pagination-btn"
        v-if="totalPages > 5"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>
      <button class="pagination-btn next" @click="nextPage">
        <span class="arrow-right"></span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$product-card-radius: 8px;
$product-primary-color: #8860d0;
$product-text-color: #333333;
$product-background: #ffffff;
$product-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
$product-hover-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
$product-border-color: #eeeeee;
$product-transition: all 0.3s ease;

// 商品網格佈局混合器
@mixin product-grid($columns: 4, $gap: 20px) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
}

// 商品卡片基本樣式
@mixin product-card-base {
  background-color: $product-background;
  border-radius: $product-card-radius;
  overflow: hidden;
  box-shadow: $product-shadow;
  transition: $product-transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $product-hover-shadow;
  }
}

// 商品圖片容器樣式
@mixin product-image-container {
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

// 商品資訊區域樣式
@mixin product-info {
  padding: 15px;

  .product-name {
    font-size: 14px;
    margin: 0 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $product-text-color;
  }

  .product-price {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: $product-text-color;
  }
}

// 商品動作按鈕樣式
@mixin product-action-buttons {
  display: flex;
  padding: 0 15px 15px;
  justify-content: space-between;

  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

// 商品分類和過濾控制區樣式
@mixin product-filter-controls {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;

  .control-button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;

    .dropdown-icon {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #fff transparent transparent transparent;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 150px;
    margin-top: 5px;

    a {
      display: block;
      padding: 10px 15px;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}

// 商品分頁控制區樣式
@mixin product-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 30px;

  .pagination-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &.active {
      background-color: #333;
      color: #fff;
      border-color: #333;
    }

    &:hover:not(.active) {
      border-color: #999;
    }
  }
}

// 商品區域標題樣式
@mixin section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: $product-primary-color;
  }
}

// 空購物車或無結果提示樣式
@mixin empty-state {
  text-align: center;
  padding: 40px 0;

  .empty-icon {
    font-size: 48px;
    color: #ccc;
    margin-bottom: 15px;
  }

  .empty-text {
    font-size: 16px;
    color: #999;
    margin-bottom: 20px;
  }

  .empty-action {
    background-color: $product-primary-color;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: $product-transition;

    &:hover {
      background-color: darken($product-primary-color, 10%);
    }
  }
}

//組件樣式
.product-list {
  &__filters {
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-start;
  }

  &__sort {
    position: relative;
    width: 180px;
  }

  .sort-select {
    padding: 8px 30px 8px 30px;
    border-radius: 50px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-size: 16px;
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none"><path fill="%23333" d="M6 6L0 0h12L6 6z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #8c25c0;
    }
  }

  &__grid {
    @include product-grid(4, 20px);
  }

  &__pagination {
    @include product-pagination;

    .arrow-left {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 8px 5px 0;
      border-color: transparent #333 transparent transparent;
    }

    .arrow-right {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 8px;
      border-color: transparent transparent transparent #333;
    }
  }
}

.empty-message p {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #999;
}
</style>
