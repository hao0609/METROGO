<script setup>
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
  import Alert_web_M from '@/components/Alert_web_M.vue';
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  import GetAllProductData from '../../js/view/Backend/getAllProductDB_Data.js';
  import { deleteProduct as deleteProductFromDB } from '../../js/view/Backend/deleteProductDB.js';


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

  // 彈窗參考
  const deleteProductAlert = ref(null);

  // 要刪除的商品ID
  const productToDelete = ref(null);
  
  // 取得所有商品的資料並處理成陣列資料
  const getProductData = async() => {
    try {
      const productDataObj = await GetAllProductData();
      console.log("取得商品資料原始物件:", productDataObj);

      if (productDataObj) {
        // 先把 ID 保存到數組中以便檢查順序
        const productIDs = Object.keys(productDataObj);
        console.log("原始商品ID列表:", productIDs);
        
        productItems.value = Object.entries(productDataObj).map(([key, value]) => {
          console.log(`處理商品 ID: ${key}, 名稱: ${value.name}`);
          return {
            id: key, // 使用Firebase中的實際ID
            name: value.name || '',
            price: value.price || '',
            posted: value.posted || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
            ...value
          };
        });

        console.log("處理後的商品陣列:", productItems.value.map(item => `ID: ${item.id}, 名稱: ${item.name}`));

        // 排序：按照 id 由小到大排序（數字排序）
        productItems.value.sort((a, b) => {
          const idA = parseInt(a.id, 10);
          const idB = parseInt(b.id, 10);
          
          if (!isNaN(idA) && !isNaN(idB)) {
            return idA - idB;
          } else {
            return a.id.localeCompare(b.id);
          }
        });
        
        console.log("排序後的商品陣列:", productItems.value.map(item => `ID: ${item.id}, 名稱: ${item.name}`));
        
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
  const editProduct = (productID, index) => {
    console.log('-- 編輯流程開始 --');
    
    // 獲取當前要編輯的完整商品資料
    const currentProduct = paginatedProducts.value[index];
    
    console.log(`編輯商品，Firebase ID: ${productID}, 商品名稱: ${currentProduct.name}`);
    
    // 將商品完整資訊編碼後傳遞
    router.push({
      path: '/admin/store-product',
      query: {
        mode: 'edit', 
        id: productID,
        name: encodeURIComponent(currentProduct.name),
        intro: encodeURIComponent(currentProduct.intro || ''),
        summary: encodeURIComponent(currentProduct.summary || ''),
        spec: encodeURIComponent(currentProduct.spec || ''),
        price: encodeURIComponent(currentProduct.price || ''),
        image: encodeURIComponent(currentProduct.image || '')
      }
    });
    
    console.log('-- 編輯流程結束 --');
  }

  // 顯示刪除確認彈窗
  const showDeleteConfirm = (productID) => {
    productToDelete.value = productID;
    deleteProductAlert.value.showAlert();
  };

  // 執行刪除商品
  const performDeleteProduct = async () => {
    try {
      if (!productToDelete.value) return;
      
      console.log(`正在刪除商品 ID: ${productToDelete.value}`);
      const result = await deleteProductFromDB(productToDelete.value);
      
      if (result.success) {
        console.log(`商品 ${productToDelete.value} 已成功刪除`);
        // 重新載入商品列表
        await getProductData();
      } else {
        console.error(`刪除商品失敗: ${result.message}`);
        alert(`刪除失敗: ${result.message}`);
      }
    } catch (error) {
      console.error('執行刪除商品時發生錯誤:', error);
      alert('刪除過程中發生錯誤');
    } finally {
      // 重置要刪除的商品ID
      productToDelete.value = null;
    }
  };

  // 刪除商品按鈕點擊處理器
  const handleDeleteProduct = (productID) => {
    showDeleteConfirm(productID);
  };

  onMounted(() => {
    getProductData();
  });

  // 彈窗們
  const deleteProductalertInfo = ref({
    fristTitle: '刪除商品',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
    </svg>
    `,
    SecondTittle: '確定要刪除此商品嗎？',
    ThirdTittle: '刪除後就無法復原',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: performDeleteProduct
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
            <th>No.</th>
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
            <!-- 顯示從1開始的序號 -->
            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td>{{ product.posted }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td class="action-buttons">
              <!-- 點擊時傳遞實際的Firebase ID -->
              <button class="table-btn edit-btn" @click="editProduct(product.id, index)">
                <EditIcon/>
              </button>
              <button class="table-btn edit-btn" @click="handleDeleteProduct(product.id)">
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

  <!-- 彈窗 -->
  <Alert_web_M ref="deleteProductAlert" :alertInfo="deleteProductalertInfo" />
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
</style>