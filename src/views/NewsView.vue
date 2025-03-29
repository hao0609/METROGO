<script setup>
import SearchIcon from "@/components/icons/Iconsearch.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import Pagination from '@/components/Pagination.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import newsData from '@/json/news.json';

const route = useRoute();
const newsId = computed(() => route.query.id);

const currentPage = ref(1);
const itemsPerPage = ref(10);
const selectedCategory = ref('all');
const searchKeyword = ref('');
const loadedData = ref(null);

// 類別選項
const categoryOptions = [
  { value: 'all', label: '全部分類' },
  { value: 'news', label: '最新消息' },
  { value: 'store', label: '商城' },
  { value: 'system', label: '系統公告' }
];

// 初始化數據
onMounted(() => {
  loadNewsData();
});

// 從 localStorage 或 JSON 文件加載數據
const loadNewsData = () => {
  try {
    // 嘗試從 localStorage 獲取數據
    const storedData = localStorage.getItem('newsData');
    
    // 如果 localStorage 中有數據，則使用它；否則使用導入的 JSON 數據
    loadedData.value = storedData ? JSON.parse(storedData) : { ...newsData };
    
    console.log('已加載新聞數據', loadedData.value);
  } catch (error) {
    console.error('加載新聞數據時出錯:', error);
    // 發生錯誤時使用默認的 JSON 數據
    loadedData.value = { ...newsData };
  }
};

// 合併並排序所有新聞
const allNews = computed(() => {
  if (!loadedData.value) return [];
  
  const combinedNews = [
    ...(loadedData.value.news || []).map(item => ({ ...item, type: 'news', tagClass: 'tag-1' })),
    ...(loadedData.value.store || []).map(item => ({ ...item, type: 'store', tagClass: 'tag-2' })),
    ...(loadedData.value.system || []).map(item => ({ ...item, type: 'system', tagClass: 'tag-3' }))
  ];

  // 按照 posted 日期排序（新到舊）
  return combinedNews.sort((a, b) => new Date(b.posted) - new Date(a.posted));
});

// 搜尋功能
const searchNews = () => {
  // 重置類別和分頁
  selectedCategory.value = 'all';
  currentPage.value = 1;
};

// 篩選後的新聞
const filteredNews = computed(() => {
  let result = allNews.value;

  // 先按類別篩選
  if (selectedCategory.value !== 'all') {
    result = result.filter(news => news.type === selectedCategory.value);
  }

  // 再按關鍵字篩選
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase();
    result = result.filter(news => 
      news.title.toLowerCase().includes(keyword) || 
      (news.description && news.description.toLowerCase().includes(keyword))
    );
  }

  return result;
});

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage.value);
});

// 當前頁面顯示的新聞
const displayedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredNews.value.slice(start, end);
});

// 翻頁處理
const handlePageChange = (page) => {
  currentPage.value = page;
  // 滾動到頁面頂部
  window.scrollTo(0, 0);
};

// 類別變更處理
const handleCategoryChange = () => {
  // 重置為第一頁
  currentPage.value = 1;
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // 如果日期無效
    
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  } catch (error) {
    console.error('日期格式化錯誤:', error);
    return '';
  }
};

// 獲取圖片URL，帶有後備圖片
const getImageUrl = (news) => {
  if (news.files && news.files.length > 0 && news.files[0].src) {
    return news.files[0].src;
  }
  // 後備圖片
  return 'https://picsum.photos/300/200';
};
</script>

<template>
    <Navbar_V1 />
    <div>
        <div class="news-hero bg-metro-green">
            <h1 class="hero-title txt-neutral-0">最新消息</h1>
        </div>
        <div class="content">
            <div class="filter-group">
                <div class="select-wrapper">
                    <select 
                      class="select-field" 
                      v-model="selectedCategory" 
                      @change="handleCategoryChange"
                    >
                        <option 
                          v-for="option in categoryOptions" 
                          :key="option.value" 
                          :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                    <span class="select-arrow"></span>
                </div>
                <div class="input-group">
                    <div class="input-wrapper with-icon">
                        <input 
                          type="text" 
                          class="input-field" 
                          placeholder="輸入關鍵字"
                          v-model="searchKeyword"
                          @keyup.enter="searchNews"
                        >
                        <SearchIcon class="input-icon" />
                    </div>
                </div>
            </div>

            <div class="news-list">
                <router-link 
                    v-for="news in displayedNews" 
                    :key="news.title"
                    :to="{ name: 'NewsDetail', query: { id: news.title }}"
                    class="news-card"
                >
                    <div class="news-card-tag" :class="news.tagClass">
                        {{ 
                            news.type === 'news' ? '最新消息' : 
                            news.type === 'store' ? '商城' : 
                            '系統公告' 
                        }}
                    </div>
                    <div class="img-news-photo" :style="{ backgroundImage: `url('${getImageUrl(news)}')` }"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">{{ news.title }}</div>
                        <div class="card-content">
                          <p class="caption news-date">{{ formatDate(news.posted) }}</p>
                          <p v-html="news.description"></p>
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- 無資料提示 -->
            <div v-if="displayedNews.length === 0" class="no-data-message">
                目前沒有符合搜尋條件的資訊
            </div>

            <!-- 切頁 -->
            <Pagination 
            :current-page="currentPage"
            :total-pages="totalPages"
            theme="default"
            @page-change="handlePageChange"
            />
        </div>
    </div>

    <Footer />
</template>

<style lang="scss" scoped>
@use '../assets/sass/page/news.scss';
</style>