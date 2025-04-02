<script>
import Alert_web_M from '@/components/Alert_web_M.vue';
import EditIcon from '@/components/icons/IconAdminEdit.vue';
import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
import AddIcon from '@/components/icons/IconAdd.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

// 引入JSON數據
import newsData from '@/json/news.json';

export default {
  name: "AdminNewsView",
  components: {
    Alert_web_M,
    EditIcon,
    DeleteIcon,
    AddIcon,
  },
  data() {
    return {
      newsItems: [],
      filteredNewsItems: [],
      paginatedItems: [],
      selectedCategory: 'all',
      dataLoadError: false,
      currentPage: 1,
      itemsPerPage: 10,
      newsToDelete: null, // 用於存儲將要刪除的項目
      originalItems: [] // 用於存儲原始的項目，包含完整的最新消息資料
    }
  },
  setup() {
    const router = useRouter();

    // 資料刪除 Alert 彈窗資訊
    const dataDelete = ref({
      fristTitle: '刪除資料',
      svg_icon: `
      <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
      </svg>
      `,
      SecondTittle: '刪除後將無法復原',
      ThirdTittle: '',
      ButtonText: '確認',
      allowOutsideClick: true,
      function: () => {}
    });
    
    const dataDeleteAlert = ref(null);
    
    return {
      router,
      dataDelete,
      dataDeleteAlert
    }
  },
  computed: {
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.filteredNewsItems.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.loadNewsData();
  },
  methods: {
    loadNewsData() {
      try {
        // 首先嘗試從 localStorage 獲取資料
        let storedData = localStorage.getItem('newsData');
        
        // local 如果沒有存儲的資料，則使用 json 原始資料
        const currentData = storedData ? JSON.parse(storedData) : newsData;
        
        // 保存原始資料（包含完整的新聞信息）
        this.originalItems = {
          news: [...currentData.news],
          store: [...currentData.store],
          system: [...currentData.system]
        };
        
        // 將資料格式化為需要的格式
        const formattedNews = currentData.news.map((item, index) => ({
          id: index + 1,
          originalIndex: index, // 存儲原始索引，用於後續編輯和刪除
          posted: this.formatDate(item.posted),
          category: '最新消息',
          categoryKey: 'news',
          title: item.title,
          content: item.description,
          imageUrl: item.files && item.files.length > 0 ? item.files[0].src : '',
          originalData: item // 存儲完整的原始數據
        }));
        
        const formattedStore = currentData.store.map((item, index) => ({
          id: formattedNews.length + index + 1,
          originalIndex: index,
          posted: this.formatDate(item.posted),
          category: '商城',
          categoryKey: 'store',
          title: item.title,
          content: item.description,
          imageUrl: item.files && item.files.length > 0 ? item.files[0].src : '',
          originalData: item
        }));
        
        const formattedSystem = currentData.system.map((item, index) => ({
          id: formattedNews.length + formattedStore.length + index + 1,
          originalIndex: index,
          posted: this.formatDate(item.posted),
          category: '系統公告',
          categoryKey: 'system',
          title: item.title,
          content: item.description,
          imageUrl: item.files && item.files.length > 0 ? item.files[0].src : '',
          originalData: item
        }));
        
        // 將所有項目合併到一個數組中
        this.newsItems = [
          ...formattedNews,
          ...formattedStore,
          ...formattedSystem
        ];
        
        // 初始化篩選
        this.filterNewsByCategory();
        
      } catch (error) {
        console.error('處理數據時出錯:', error);
        
        // 如果處理失敗，設置錯誤狀態
        this.newsItems = [];
        this.filteredNewsItems = [];
        this.paginatedItems = [];
        this.dataLoadError = true;
      }
    },
    filterNewsByCategory() {
      if (this.selectedCategory === 'all') {
        this.filteredNewsItems = [...this.newsItems];
      } else {
        // 根據類別篩選新聞項目
        const categoryMap = {
          'news': '最新消息',
          'shop': '商城',
          'system': '系統公告'
        };
        
        this.filteredNewsItems = this.newsItems.filter(
          item => item.category === categoryMap[this.selectedCategory]
        );
      }
      
      // 重置到第一頁並更新分頁數據
      this.currentPage = 1;
      this.updatePaginatedItems();
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedItems = this.filteredNewsItems.slice(startIndex, endIndex);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.updatePaginatedItems();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.updatePaginatedItems();
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      // 處理日期格式，轉換為 YYYY/MM/DD 格式
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`; // 返回 YYYY/MM/DD 格式
    },
    handleEdit(id) {
      // 處理編輯邏輯
      const newsItem = this.newsItems.find(item => item.id === id);
      
      if (!newsItem) {
        console.error('找不到要編輯的項目:', id);
        return;
      }
      
      // 將要編輯的新聞項目保存到 localStorage
      localStorage.setItem('editingNewsItem', JSON.stringify({
        date: newsItem.posted, // 使用已格式化的日期
        category: newsItem.categoryKey, // 使用分類鍵
        title: newsItem.title,
        content: newsItem.content,
        imageUrl: newsItem.imageUrl,
        originalCategory: newsItem.categoryKey,
        originalIndex: newsItem.originalIndex
      }));
      
      // 導航到編輯頁面
      this.router.push({ name: 'AdminNewsAdd' });
    },
    handleDelete(id) {
      // 找到要刪除的項目
      const newsItem = this.newsItems.find(item => item.id === id);
      
      if (!newsItem) {
        console.error('找不到要刪除的項目:', id);
        return;
      }
      
      // 設置將要刪除的項目
      this.newsToDelete = newsItem;
      
      // 設置刪除確認回調
      this.dataDelete.function = () => this.confirmDelete();
      
      // 顯示刪除確認彈窗
      this.dataDeleteAlert.showAlert();
    },
    confirmDelete() {
      // 確認刪除後的處理邏輯
      if (!this.newsToDelete) return;
      
      try {
        // 從 localStorage 獲取當前數據
        let currentData = JSON.parse(localStorage.getItem('newsData')) || { ...newsData };
        
        // 根據類別和索引刪除相應的項目
        const category = this.newsToDelete.categoryKey;
        const index = this.newsToDelete.originalIndex;
        
        // 映射 categoryKey 到實際的 JSON 屬性名
        const categoryMap = {
          'news': 'news',
          'store': 'store',
          'system': 'system'
        };
        
        // 從數組中刪除指定項目
        if (Array.isArray(currentData[categoryMap[category]])) {
          currentData[categoryMap[category]].splice(index, 1);
          
          // 保存更新後的數據到 localStorage
          localStorage.setItem('newsData', JSON.stringify(currentData));
          
          // 重新加載數據
          this.loadNewsData();
          
          console.log(`已從 ${category} 類別中刪除索引為 ${index} 的項目`);
        } else {
          console.error(`無法刪除: ${categoryMap[category]} 不是有效的數組`);
        }
      } catch (error) {
        console.error('刪除項目時出錯:', error);
      }
      
      // 清除要刪除的項目引用
      this.newsToDelete = null;
    },
    goToAddNews() {
      // 清除可能存在的編輯數據
      localStorage.removeItem('editingNewsItem');
      this.router.push({ name: 'AdminNewsAdd' });
    },
    handleCategoryChange(event) {
      this.selectedCategory = event.target.value;
      this.filterNewsByCategory();
    },
    // 添加重置localStorage功能（可選）
    resetToDefault() {
      if (confirm('確定要重置到默認數據嗎？這將刪除所有您的更改。')) {
        localStorage.removeItem('newsData');
        this.loadNewsData(); // 重新載入預設數據
      }
    }
  }
};
</script>

<template>
  <div>
    <h1 class="admin-title">最新消息管理</h1>  
    <div class="filter-group">
      <button class="btn_filled small with-icon" @click="goToAddNews">
        <AddIcon/>新增最新消息
      </button>
      <div class="select-wrapper small auto-left">
        <select class="select-field" v-model="selectedCategory" @change="handleCategoryChange">
          <option value="all">全部分類</option>
          <option value="news">最新消息</option>
          <option value="shop">商城</option>
          <option value="system">系統公告</option>
        </select>
        <span class="select-arrow"></span>
      </div>
    </div>
    
    <div v-if="dataLoadError" class="error-message">
      資料讀取失敗，請稍候再試
    </div>
    <div v-else class="admin-table">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>上架時間</th>
            <th>類別</th>
            <th>標題</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(news, index) in paginatedItems"
            :key="news.id"
            :class="{ 'highlight-row': index % 2 === 1 }"
          >
            <td>{{ news.id }}</td>
            <td>{{ news.posted }}</td>
            <td>{{ news.category }}</td>
            <td class="td-title">{{ news.title }}</td>
            <td class="action-buttons">
              <button class="table-btn edit-btn" @click="handleEdit(news.id)">
                <EditIcon/>
              </button>
              <button class="table-btn delete-btn" @click="handleDelete(news.id)">
                <DeleteIcon/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分頁按鈕 -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
          <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z" />
          </svg>
        </button>
        <span class="title2 bold">第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
          <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z" />
          </svg>
        </button>
      </div>
      
      <!-- 添加重置按鈕（可選） -->
      <!-- <div class="reset-container">
        <button @click="resetToDefault" class="btn_outline small">重置數據</button>
      </div> -->
    </div>
  </div>

  <!-- 彈窗 -->
  <Alert_web_M ref="dataDeleteAlert" :alertInfo="dataDelete" />
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-news.scss";
</style>