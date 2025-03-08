<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetailComponent from '../components/Store/ProductDetail.vue'


const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  product: {
    type: Object,
    default: null
  }
})

const route = useRoute()
const productData = ref(props.product) 

const fetchProductData = async (productId) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模擬商品數據庫
      const productsDb = [
      {
    id: 1,
    name: '馬克杯',
    price: 'NT$900',
    image: '/src/assets/images/cap.png',
    description: '500ml的容量，適合各式大小的場合使用',
    isFavorite: false,
    category: '自有品牌',
    // 商品展示額外圖片
    additionalImages: [
      '/src/assets/images/store/cap1.png',
      '/src/assets/images/store/cap2.png',
    ],
    
    descriptionImages: [
      {
        url: '/src/assets/images/store/capdetail1.png',
        alt: '商品展示'
      },
      {
        url: '/src/assets/images/store/capdetail2.png',
        alt: '商品特點展示'
      }
    ],
    specifications: [
      { title: '品牌名稱', value: 'METROGO' },
      { title: '款式', value: '有側把手' },
      { title: '容量', value: '401~600ml' },
      { title: '材質', value: '全陶瓷' },
      { title: '產地', value: '台灣' },
    ]
  },
       
      ]
      
      // 查找對應的ID商品
      const product = productsDb.find(p => p.id === Number(productId))
      resolve(product || null)
    }, 500)
  })
}

onMounted(async () => {
 
  if (!productData.value) {
    // 1. 嘗試從query中獲取
    if (route.query.productData) {
      try {
        productData.value = JSON.parse(route.query.productData)
      } catch (e) {
        console.error('解析query数据失败', e)
      }
    }
    
    // 2. 嘗試從localStorage獲取
    if (!productData.value && localStorage.getItem('currentProduct')) {
      try {
        const storedProduct = JSON.parse(localStorage.getItem('currentProduct'))
        if (storedProduct && storedProduct.id === Number(props.id)) {
          productData.value = storedProduct
        }
      } catch (e) {
        console.error('解析localStorage數據失敗', e)
      }
    }
    
    // 3. 通過api獲取
    if (!productData.value) {
      productData.value = await fetchProductData(props.id)
    }
  }
})

</script>
<template>
    
    <div class="product-detail-container" v-if="productData">
    <!-- 返回按钮 -->
    <div class="back-link">
      <router-link to="/category" class="back-button">
        &larr; 返回商品列表
      </router-link>
    </div>
    

    <ProductDetailComponent
      :product="productData"
      :additionalImages="productData.additionalImages || []"
      :colors="productData.colors || []"
      :productDescription="productData.description || ''"
      :productSpecifications="productData.specifications || []"
      :descriptionImages="productData.descriptionImages || []"
    />
  </div>
  <div v-else class="loading">
    <p>正在加载商品信息...</p>
  </div>

</template>

<style lang="scss" scoped>

.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  margin-bottom: 20px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #666;
}




</style>