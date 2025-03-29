<script setup>
  import BackIcon from '@/components/icons/IconBack.vue';
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  import GetAllProductData from '../../js/view/Backend/getAllProductDB_Data.js';

  const router = useRouter();

  // 宣告商品資料陣列
  const productItems = ref([]);

  // 目前頁數
  const currentPage = ref(1);

  // 每頁顯示筆數
  const itemsPerPage = 10; // 每頁顯示 10 筆資料

  // 搜尋文字
  const searchQuery = ref('');

  // 搜尋結果
  const searchResults = ref([]);

  // 取得所有商品的資料並處理成陣列資料
  const getProductData = async() => {
    try {
      const productDataObj = await GetAllProductData();
      console.log("取得商品資料:", productDataObj);

      if (productDataObj) {
        productItems.value = Object.entries(productDataObj).map(([key, value]) => {
          return {
            id: key,
            name: value.name || '',
            price: value.price || '',
            // 使用 firebase 中的 posted 欄位作為上架日期
            posted: value.posted || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
            // 其他可能需要的資料...
            ...value
          };
        });

        // 排序：按照 id 由小到大排序（數字排序）
        productItems.value.sort((a, b) => {
          // 將 id 轉為數字進行比較（假設 id 是數字字串，如 "1", "2" 等）
          const idA = parseInt(a.id, 10);
          const idB = parseInt(b.id, 10);
          
          // 若轉換成功則按數字大小排序，否則按字串排序
          if (!isNaN(idA) && !isNaN(idB)) {
            return idA - idB;
          } else {
            return a.id.localeCompare(b.id);
          }
        });
        
        searchResults.value = [...productItems.value]; // 預設顯示排序後的資料
      }
    } catch (error) {
      console.error('Failed to GetAllProductData:', error.message);
    }
  }

  // 計算總頁數
  const totalPages = computed(() => 
    Math.ceil(searchResults.value.length / itemsPerPage)
  );

  // 取得當前頁面的資料
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return searchResults.value.slice(start, start + itemsPerPage);
  });

  // 翻頁功能
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  // 搜尋功能 (按鈕觸發)
  const performSearch = () => {
    const query = searchQuery.value.trim().toLowerCase();
    console.log(query);
    
    if (!query) {
      searchResults.value = productItems.value; // 如果沒有輸入，顯示全部資料
      return;
    }

    searchResults.value = productItems.value.filter(product =>
      Object.values(product).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
    currentPage.value = 1; // 重置到第1頁
  };

  // 重置表格搜尋 
  const resetSearch = () => {
    searchQuery.value = '';
    searchResults.value = productItems.value;
    currentPage.value = 1;
  };

  // 新增商品功能
  const addProduct = () => {
    // 導向到新增商品頁面
    router.push('/admin/store-product');
  }

  // 編輯商品功能
  const editProduct = (productID) => {
    // 儲存當前選擇的商品ID
    sessionStorage.setItem('selectedProductID', productID);
    // 導向到編輯商品頁面
    router.push('/admin/product-edit');
  }

  // 刪除商品功能
  const deleteProduct = (productID) => {
    // 這裡應該加入確認刪除的對話框
    if (confirm('確定要刪除這個商品嗎？')) {
      // 實作刪除商品的邏輯
      console.log(`刪除商品 ID: ${productID}`);
      // 刪除後重新載入商品列表
      getProductData();
    }
  }

  onMounted(() => {
    getProductData();
  });
</script>

<template>
  <div>
    <h1 class="admin-title">商品管理</h1>  
    <div class="filter-group">
      <button class="btn_filled small with-icon" @click="addProduct"><AddIcon/>新增商品</button>
      <div class="auto-left" style="display: flex; gap: 4px;">
        <div class="input-wrapper small">
          <input type="text" class="input-field" placeholder="輸入商品名稱" v-model="searchQuery">
        </div>
        <button class="btn_filled small" @click="performSearch">查詢</button>
        <button class="btn_filled small" @click="resetSearch">重置</button>
      </div>
    </div>
    
    <div class="admin-table">
      <table>
        <thead>
          <tr>
            <th>編號</th>
            <th>上架日期</th>
            <th>商品名稱</th>
            <th>建議售價</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :class="{ 'highlight-row': index % 2 === 1 }"
          >
            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td>{{ product.posted }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td class="action-buttons">
              <button class="table-btn edit-btn" @click="editProduct(product.id)">
                <EditIcon/>
              </button>
              <button class="table-btn edit-btn" @click="deleteProduct(product.id)">
                <DeleteIcon/>
              </button>
            </td>
          </tr>
          <tr v-if="paginatedProducts.length === 0">
            <td colspan="5">找不到符合條件的商品資料</td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁按鈕 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
          <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"/>
          </svg>
        </button>
        <span class="title2 bold">第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
          <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
</style>