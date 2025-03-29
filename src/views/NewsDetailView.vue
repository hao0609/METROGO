<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackIcon from '@/components/icons/IconBack.vue';
import newsData from '@/json/news.json';

const route = useRoute();
const router = useRouter();

// 存儲當前詳情變量
const currentNews = ref(null);
const loadError = ref(false);

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

// 返回上一頁
const goBack = () => {
  router.push('/news');
};

// 獲取圖片URL，帶有後備圖片
const getImageUrl = (news) => {
  if (news && news.files && news.files.length > 0 && news.files[0].src) {
    return news.files[0].src;
  }
  // 後備圖片
  return 'https://picsum.photos/720/480';
};

// 從 localStorage 或 JSON 文件加載數據
const loadNewsData = () => {
  try {
    // 嘗試從 localStorage 獲取數據
    const storedData = localStorage.getItem('newsData');
    
    // 如果 localStorage 中有數據，則使用它；否則使用導入的 JSON 數據
    return storedData ? JSON.parse(storedData) : { ...newsData };
  } catch (error) {
    console.error('加載新聞數據時出錯:', error);
    loadError.value = true;
    // 發生錯誤時使用默認的 JSON 數據
    return { ...newsData };
  }
};

// 根據標題找到對應的新聞
const findNewsItem = (title) => {
  // 獲取當前數據源
  const currentData = loadNewsData();
  
  // 在不同分類中尋找匹配的新聞
  const allNews = [
    ...(currentData.news || []).map(item => ({ ...item, type: 'news', tagClass: 'tag-1' })),
    ...(currentData.store || []).map(item => ({ ...item, type: 'store', tagClass: 'tag-2' })),
    ...(currentData.system || []).map(item => ({ ...item, type: 'system', tagClass: 'tag-3' }))
  ];

  return allNews.find(item => item.title === title);
};

// 組件掛載時獲取新聞詳情
onMounted(() => {
  // 從路徑獲取最新消息標題
  const newsTitle = route.query.id;
  
  // 找到對應的最新消息
  currentNews.value = findNewsItem(newsTitle);
  
  // 如果找不到相應的新聞，可能是 localStorage 和 URL 參數不匹配
  if (!currentNews.value) {
    console.warn('找不到相應的新聞:', newsTitle);
  }
  
  // 滾動到頁面頂部
  window.scrollTo(0, 0);
});
</script>

<template>
    <div v-if="currentNews">
        <div class="detail-content">
            <div class="return-btn title2 bold" @click="goBack">
                <BackIcon/> 返回
            </div>
            <div class="news-card-detail">
                <div 
                  class="news-card-tag" 
                  :class="currentNews.tagClass"
                >
                    {{ 
                        currentNews.type === 'news' ? '最新消息' : 
                        currentNews.type === 'store' ? '商城' : 
                        '系統公告' 
                    }}
                </div>
                <div class="img-area">
                    <div class="img-news-photo" :style="{ backgroundImage: `url('${getImageUrl(currentNews)}')` }"></div>
                </div>
                <div class="card-text-wrap">
                    <div class="title2 bold card-title">{{ currentNews.title }}</div>
                    <div class="card-content detail-content-text">
                      <p class="caption news-date">{{ formatDate(currentNews.posted) }}</p>
                      <div v-html="currentNews.description"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="no-content">
        <p>找不到相關新聞內容</p>
        <button class="btn_filled" @click="goBack">返回列表</button>
    </div>
</template>


<style lang="scss" scoped>
@import '../assets/sass/page/news';
</style>