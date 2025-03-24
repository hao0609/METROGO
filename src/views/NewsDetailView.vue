<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackIcon from '@/components/icons/IconBack.vue';
import newsData from '@/json/news.json';

const route = useRoute();
const router = useRouter();

// 存儲當前新聞詳情的響應式變量
const currentNews = ref(null);

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

// 返回上一頁
const goBack = () => {
  router.push('/news');
};

// 根據標題找到對應的新聞
const findNewsItem = (title) => {
  // 在不同分類中尋找匹配的新聞
  const allNews = [
    ...newsData.news.map(item => ({ ...item, type: 'news', tagClass: 'tag-1' })),
    ...newsData.store.map(item => ({ ...item, type: 'store', tagClass: 'tag-2' })),
    ...newsData.system.map(item => ({ ...item, type: 'system', tagClass: 'tag-3' }))
  ];

  return allNews.find(item => item.title === title);
};

// 組件掛載時獲取新聞詳情
onMounted(() => {
  // 從路由獲取新聞標題
  const newsTitle = route.query.id;
  
  // 找到對應的新聞
  currentNews.value = findNewsItem(newsTitle);
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
                    <div class="img-news-photo"></div>
                </div>
                <div class="card-text-wrap">
                    <div class="title2 bold card-title">{{ currentNews.title }}</div>
                    <div class="card-content">
                        <p class="caption news-date">{{ formatDate(currentNews.posted) }}</p>
                        <p>{{ currentNews.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="no-content">
        <p>找不到相關新聞內容</p>
        <button @click="goBack">返回列表</button>
    </div>
</template>

<script>
export default {
    name: "NewsDetailView"
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/page/news';
</style>