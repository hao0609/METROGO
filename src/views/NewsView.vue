<script setup>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import Pagination from '@/components/Pagination.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const newsId = computed(() => route.query.id); // 使用 newsId 獲取對應的新聞詳情

const currentPage = ref(1); // 切頁
const itemsPerPage = ref(10); // 切頁
const newsItems = ref([
    {
        id: 1,
        category: '最新消息',
        tagClass: 'tag-1',
        title: '臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！',
        date: '2024/12/01',
        content: '臺北市雙層觀光巴士Yes！Bus推出全新路線，帶領旅客深入探索臺北最具魅力的寧夏夜市。此路線將帶您體驗夜市的獨特風情，品嚐道地美食，感受臺北夜生活的熱情與活力。'
    },
    {
        id: 2,
        category: '最新消息',
        tagClass: 'tag-1',
        title: '客家公園GO好玩2025新增館舍服務，兜兜姐姐出任務客家文化中心唱跳親子樂',
        date: '2024/12/01',
        content: '客家公園於2025年新增多項館舍服務，特別邀請知名兒童節目主持人兜兜姐姐在客家文化中心舉辦唱跳活動。活動內容豐富多元，包含客家歌謠教唱、親子舞蹈互動，以及傳統客家遊戲體驗，旨在讓親子共同感受客家文化的魅力，增進親子關係。'
    },
    {
        id: 3,
        category: '商城',
        tagClass: 'tag-2',
        title: '貓奴課程又來囉 臺北市毛孩學院春季班熱烈招生中',
        date: '2024/12/01',
        content: '臺北市毛孩學院春季班正式開放報名，特別推出針對貓咪飼主的專業課程。課程內容涵蓋貓咪行為解析、健康照護、營養飲食，以及與貓咪互動技巧等，旨在提升飼主對貓咪的了解，促進人寵和諧共處。'
    },
    {
        id: 4,
        category: '系統公告',
        tagClass: 'tag-3',
        title: '網站維護公告',
        date: '2024/10/01',
        content: '為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。'
    },
    {
        id: 5,
        category: '系統公告',
        tagClass: 'tag-3',
        title: '網站維護公告',
        date: '2024/07/01',
        content: '為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。'
    },
    {
        id: 6,
        category: '系統公告',
        tagClass: 'tag-3',
        title: '網站維護公告',
        date: '2024/07/01',
        content: '為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。'
    },
    {
        id: 7,
        category: '系統公告',
        tagClass: 'tag-3',
        title: '網站維護公告',
        date: '2024/07/01',
        content: '為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。'
    }
    ]);

// API 相關數據
const taipeiData = ref(null);
const isLoading = ref(false);
const error = ref(null);

// 計算頁數
const totalPages = computed(() => {
  return Math.ceil(newsItems.value.length / itemsPerPage.value);
});

const displayedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return newsItems.value.slice(start, end);
});

// API方法
const fetchTaipeiData = async () => {
    try {
        console.log('開始請求 API');
        const apiUrl = 'https://data.taipei/api/v1/dataset/9cdbc2ad-39ba-4aca-8f52-8f6312f5523a?scope=resourceAquire';
        
        const response = await fetch(apiUrl);
        console.log('API 回應狀態:', response.status, response.ok);
        
        if (response.ok) {
            const data = await response.json();
            console.log('成功獲取資料:', data);
            
            return data.result ? data.result.results || data.result : data;
        } else {
            throw new Error(`獲取資料失敗: ${response.status}`);
        }
    } catch (error) {
        console.error('請求錯誤:', error);
        throw error;
    }
};

const loadData = async () => {
console.log('開始載入資料');
  isLoading.value = true;
  error.value = null;
  
  try {
    taipeiData.value = await fetchTaipeiData();
  } catch (err) {
    error.value = '獲取資料時發生錯誤';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page) => {
    currentPage.value = page;
};

onMounted(() => {
    console.log('元件已掛載，開始載入資料');
    loadData();
});

// export default {
//     setup (){
//         const taipeiData = ref(null);
//         const isLoading = ref(false);
//         const error = ref(null);

//         const fetchTaipeiData = async () => {
//       try {
//         const apiUrl = 'https://data.taipei/api/v1/dataset/9cdbc2ad-39ba-4aca-8f52-8f6312f5523a?scope=resourceAquire';
        
//         const response = await axios.get(apiUrl);
        
//         if (response.status === 200 && response.data) {
//           console.log('成功獲取資料:', response.data);
          
//           return response.data.result ? response.data.result.results || response.data.result : response.data;
//         } else {
//           throw new Error(`獲取資料失敗: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('請求錯誤:', error);
//         throw error;
//       }
//     };

//     const loadData = async () => {
//       isLoading.value = true;
//       error.value = null;
      
//       try {
//         taipeiData.value = await fetchTaipeiData();
//       } catch (err) {
//         error.value = '獲取資料時發生錯誤';
//         console.error(err);
//       } finally {
//         isLoading.value = false;
//       }
//     };
    
//     onMounted(() => {
//       loadData();
//     });

//     return {
//       taipeiData,
//       isLoading,
//       error,
//       loadData
//     };

//     },
//     name: "NewsView",
//     created() {
//         const newsId = this.$route.query.id; // 使用 newsId 獲取對應的新聞詳情
//     },
//     components: {
//         Pagination
//     },
//     data() {
//         return {
//             currentPage: 1, // 切頁
//             itemsPerPage: 10, // 切頁
//             newsItems: [
//                 {
//                     id: 1,
//                     category: '最新消息',
//                     tagClass: 'tag-1',
//                     title: '臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！',
//                     date: '2024/12/01',
//                     content: '臺北市雙層觀光巴士Yes！Bus推出全新路線，帶領旅客深入探索臺北最具魅力的寧夏夜市。此路線將帶您體驗夜市的獨特風情，品嚐道地美食，感受臺北夜生活的熱情與活力。'
//                 },
//                 {
//                     id: 2,
//                     category: '最新消息',
//                     tagClass: 'tag-1',
//                     title: '客家公園GO好玩2025新增館舍服務，兜兜姐姐出任務客家文化中心唱跳親子樂',
//                     date: '2024/12/01',
//                     content: '客家公園於2025年新增多項館舍服務，特別邀請知名兒童節目主持人兜兜姐姐在客家文化中心舉辦唱跳活動。活動內容豐富多元，包含客家歌謠教唱、親子舞蹈互動，以及傳統客家遊戲體驗，旨在讓親子共同感受客家文化的魅力，增進親子關係。'
//                 },
                
//             ]
//         }
//     },
//     computed: {
//     totalPages() {
//       return Math.ceil(this.newsItems.length / this.itemsPerPage);
//     },
//     displayedNews() {
//       const start = (this.currentPage - 1) * this.itemsPerPage;
//       const end = start + this.itemsPerPage;
//       return this.newsItems.slice(start, end);
//     },
// },
// };
</script>

<template>
    <Navbar_V1 />
    <div>
        <div class="news-hero bg-metro-green">
            <h1 class="hero-title txt-neutral-0">最新消息</h1>
            <div class="metroshape-group left">
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
            </div>
            <div class="metroshape-group right">
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
                <div class="metroshape bg-green-400"></div>
            </div>
        </div>
        <div class="content">
            <div class="filter-group">
                <div class="select-wrapper">
                    <select class="select-field">
                        <option value="option1" selected>全部分類</option>
                        <option value="option2">最新消息</option>
                        <option value="option3">商城</option>
                        <option value="option4">系統公告</option>
                    </select>
                    <span class="select-arrow"></span>
                </div>
                <div class="input-group">
                    <div class="input-wrapper">
                        <input type="text" class="input-field" placeholder="輸入關鍵字">
                    </div>
                    <button class="btn_filled">查詢</button>
                </div>
            </div>

            <div class="news-list">
                <!-- <div class="news-card">
                    <div class="news-card-tag">未分類</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！</div>
                        <div class="card-content">
                            <p class="caption txt-neutral-400"> 2024/12/01</p>
                            <p>
                                臺北市雙層觀光巴士Yes！Bus推出全新路線，帶領旅客深入探索臺北最具魅力的寧夏夜市。此路線將帶您體驗夜市的獨特風情，品嚐道地美食，感受臺北夜生活的熱情與活力。
                            </p>
                        </div>
                    </div>
                </div> -->
                <router-link 
                    v-for="news in newsItems" 
                    :key="news.id"
                    :to="{ name: 'NewsDetail', query: { id: news.id }}"
                    class="news-card"
                >
                    <div class="news-card-tag" :class="news.tagClass">{{ news.category }}</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">{{ news.title }}</div>
                        <div class="card-content">
                            <p class="caption news-date">{{ news.date }}</p>
                            <p>{{ news.content }}</p>
                        </div>
                    </div>
                </router-link>
                <div class="news-card">
                    <div class="news-card-tag tag-1">最新消息</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">客家公園GO好玩2025新增館舍服務，兜兜姐姐出任務客家文化中心唱跳親子樂</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/12/01</p>
                            <p>
                                客家公園於2025年新增多項館舍服務，特別邀請知名兒童節目主持人兜兜姐姐在客家文化中心舉辦唱跳活動。活動內容豐富多元，包含客家歌謠教唱、親子舞蹈互動，以及傳統客家遊戲體驗，旨在讓親子共同感受客家文化的魅力，增進親子關係。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-card-tag tag-2">商城</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">貓奴課程又來囉 臺北市毛孩學院春季班熱烈招生中</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/12/01</p>
                            <p>
                                臺北市毛孩學院春季班正式開放報名，特別推出針對貓咪飼主的專業課程。課程內容涵蓋貓咪行為解析、健康照護、營養飲食，以及與貓咪互動技巧等，旨在提升飼主對貓咪的了解，促進人寵和諧共處。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-card-tag tag-3">系統公告</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">網站維護公告</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/10/01</p>
                            <p>
                                為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-card-tag tag-3">系統公告</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">網站維護公告</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/07/01</p>
                            <p>
                                為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-card-tag tag-3">系統公告</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">網站維護公告</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/07/01</p>
                            <p>
                                為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。
                            </p>
                        </div>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-card-tag tag-3">系統公告</div>
                    <div class="img-news-photo"></div>
                    <div class="card-text-wrap">
                        <div class="title2 bold card-title">網站維護公告</div>
                        <div class="card-content">
                            <p class="caption news-date"> 2024/07/01</p>
                            <p>
                                為了提供更穩定的服務，我們將於2025年2月25日凌晨0點至4點進行系統維護。在此期間，網站部分功能可能會暫時無法使用，敬請見諒。
                            </p>
                        </div>
                    </div>
                </div>
                
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
