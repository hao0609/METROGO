// 首頁載入最新消息列表

import { ref } from 'vue';
import newsData from '@/json/news.json';

export function useNewsData() {
  const loadedData = ref(null);

  // 移除 HTML 標記的函數
  const stripHtmlTags = (html) => {
    if (!html) return '';
    
    // 創建一個臨時的 div 元素
    const temp = document.createElement('div');
    
    // 將 HTML 字串設置為 div 的 innerHTML
    temp.innerHTML = html;
    
    // 返回純文字內容
    return temp.textContent || temp.innerText || '';
  };

  // 初始化數據
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

  // 獲取最新的新聞
  const getLatestNews = (count = 2) => {
    if (!loadedData.value) return [];
    
    const combinedNews = [
      ...(loadedData.value.news || []).map(item => ({ 
        ...item, 
        type: 'news', 
        tagClass: 'tag-1',
        description: stripHtmlTags(item.description) // 移除 HTML 標記
      })),
      ...(loadedData.value.store || []).map(item => ({ 
        ...item, 
        type: 'store', 
        tagClass: 'tag-2',
        description: stripHtmlTags(item.description) // 移除 HTML 標記
      })),
      ...(loadedData.value.system || []).map(item => ({ 
        ...item, 
        type: 'system', 
        tagClass: 'tag-3',
        description: stripHtmlTags(item.description) // 移除 HTML 標記
      }))
    ];

    // 按照 posted 日期排序（新到舊）
    return combinedNews.sort((a, b) => new Date(b.posted) - new Date(a.posted)).slice(0, count);
  };

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
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

  // 初始化加載
  loadNewsData();

  return {
    loadedData,
    loadNewsData,
    getLatestNews,
    formatDate,
    getImageUrl
  };
}