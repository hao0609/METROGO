<script setup>
import { ref, onMounted } from 'vue';
import { getLatestProducts } from '@/js/view/getProductData.js';

// 用來存儲最新的四筆商品資料
const latestProducts = ref([]);
// 載入狀態
const isLoading = ref(true);

// 獲取最新的商品資料
const fetchLatestProducts = async () => {
  try {
    isLoading.value = true;
    console.log("開始獲取最新商品資料...");
    
    // 獲取最新的4筆商品
    const products = await getLatestProducts(4);
    console.log("獲取到的商品資料:", products);
    
    if (products.length > 0) {
      console.log("商品排序結果 (按照 posted 日期從新到舊):");
      products.forEach((p, index) => {
        const name = p.name || p.productName || '未命名';
        const posted = p.posted || '未知日期';
        console.log(`${index + 1}. ${name} - 發布日期: ${posted}`);
      });
    }
    
    // 確保每個商品都有正確的圖片路徑
    products.forEach(product => {
      console.log("處理商品圖片:", product.productName, "目前圖片:", product.imageUrl);
      
      // 如果沒有 imageUrl 或路徑不正確，使用本地圖片
      // 檢查 imageUrl 是否為空或是否以 http 開頭
      if (!product.imageUrl || (!product.imageUrl.startsWith('http') && !product.imageUrl.startsWith('/'))) {
        // 根據商品ID或名稱指定預設圖片
        if (product.productName?.toLowerCase().includes('t恤') || 
            product.productName?.toLowerCase().includes('shirt') || 
            (product.Product && product.Product.toLowerCase().includes('衣'))) {
          product.imageUrl = '/src/assets/images/T-shirt.png';
        } else if (product.productName?.toLowerCase().includes('杯') || 
                  product.productName?.toLowerCase().includes('cup') || 
                  (product.Product && product.Product.toLowerCase().includes('杯'))) {
          product.imageUrl = '/src/assets/images/cap.png';
        } else if (product.productName?.toLowerCase().includes('明信片') || 
                  product.productName?.toLowerCase().includes('card') || 
                  (product.Product && product.Product.toLowerCase().includes('卡'))) {
          product.imageUrl = '/src/assets/images/card.png';
        } else {
          product.imageUrl = '/src/assets/images/card2.png'; // 預設圖片
        }
      }
      
      // 檢查圖片路徑是否需要添加前綴
      if (product.imageUrl && !product.imageUrl.startsWith('http') && !product.imageUrl.startsWith('/')) {
        product.imageUrl = '/' + product.imageUrl;
      }
      
      // 初始化收藏狀態
      product.favorite = false;
    });
    
    latestProducts.value = products;
    console.log('處理後的商品資料:', latestProducts.value);
  } catch (error) {
    console.error('獲取最新商品資料失敗:', error);
    // 發生錯誤時使用空陣列
    latestProducts.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 切換收藏狀態
const toggleFavorite = (product) => {
  product.favorite = !product.favorite;
  const productName = product.productName || product.ProductName || product.Product || '未命名商品';
  console.log(`${productName} 收藏狀態: ${product.favorite}`);
};

// 商品詳情彈窗功能已移除

onMounted(() => {
  console.log("HomeProductList 組件已掛載，準備獲取商品資料");
  fetchLatestProducts();
});
</script>

<template>
  <div class="products-card-container">
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在載入商品...</p>
    </div>
    <template v-else-if="latestProducts.length > 0">
      <div class="items">
        <div class="product-card" v-for="product in latestProducts" :key="product.id">
          <div class="product-img-container">
            <img 
              :src="product.imageUrl" 
              :alt="product.productName"
              @error="product.imageUrl = '/src/assets/images/default-product.png'"
            />
          </div>
          <div class="product-text">
            <h3 class="title2 bold product-title">{{ product.name || product.productName }}</h3>
            <p class="price">$ {{ product.price }}</p>
            <p>{{ product.summary || product.intro }}</p>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="no-products">
      <p>暫無商品資料</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/home";
</style>