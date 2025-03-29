<script>
import BackIcon from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';
import Alert_web_M from '@/components/Alert_web_M.vue';
import { ref, onMounted } from 'vue';
import newsData from '@/json/news.json';

export default {
  name: "AdminNewsAddView",
  components: {
    Alert_web_M,
    BackIcon
  },
  data() {
    return {
      newsForm: {
        date: new Date().toISOString().substr(0, 10),
        category: 'news',
        title: '',
        content: '',
        imageUrl: ''
      },
      imageStatus: 'none', // 'none', 'failed', 'success'
      isEditMode: false,
      originalCategory: null, // 保存編輯項目的原始類別
      originalIndex: null, // 保存編輯項目的原始索引
    }
  },
  setup() {
    const router = useRouter();
    
    // 資料保存成功 Alert 彈窗資訊
    const dataUpdateSuccess = ref({
      fristTitle: '保存成功',
      svg_icon: `
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 0C36 0 0 36 0 80C0 124 36 160 80 160C124 160 160 124 160 80C160 36 124 0 80 0ZM80 144C44.72 144 16 115.28 16 80C16 44.72 44.72 16 80 16C115.28 16 144 44.72 144 80C144 115.28 115.28 144 80 144ZM116.72 44.64L64 97.36L43.28 76.72L32 88L64 120L128 56L116.72 44.64Z" fill="#00C9A7"/>
      </svg>
      `,
      SecondTittle: '可在前台看到更新後的資料',
      ThirdTittle: '',
      ButtonText: '確認',
      allowOutsideClick: true,
      function: () => {}
    });

    // 資料保存失敗 Alert 彈窗資訊
    const dataUpdateFailed = ref({
      fristTitle: '保存失敗',
      svg_icon: `
      <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
      </svg>
      `,
      SecondTittle: '請確認所有欄位填寫正確',
      ThirdTittle: '',
      ButtonText: '確認',
      allowOutsideClick: true,
      function: () => {}
    });
    
    const dataSuccessAlert = ref(null);
    const dataFailedAlert = ref(null);
    
    return {
      router,
      dataUpdateSuccess,
      dataUpdateFailed,
      dataSuccessAlert,
      dataFailedAlert
    }
  },
  mounted() {
    // 檢查是否有編輯數據
    this.checkForEditData();
    
    // 如果 imageUrl 已有值，則檢查圖片
    if (this.newsForm.imageUrl) {
      this.checkImage();
    }
  },
  methods: {
    checkForEditData() {
      // 嘗試從 localStorage 獲取編輯數據
      const editingItem = localStorage.getItem('editingNewsItem');
      
      if (editingItem) {
        try {
          const editData = JSON.parse(editingItem);
          
          // 填充表單數據
          this.newsForm.date = editData.date || new Date().toISOString().substr(0, 10);
          this.newsForm.category = editData.category || 'news';
          this.newsForm.title = editData.title || '';
          this.newsForm.content = editData.content || '';
          this.newsForm.imageUrl = editData.imageUrl || '';
          
          // 保存原始類別和索引，用於後續更新
          this.originalCategory = editData.originalCategory;
          this.originalIndex = editData.originalIndex;
          
          // 設置為編輯模式
          this.isEditMode = true;
          
          console.log('正在編輯現有項目:', editData);
        } catch (error) {
          console.error('解析編輯數據時出錯:', error);
        }
      }
    },
    goBack() {
      // 清除編輯數據
      localStorage.removeItem('editingNewsItem');
      this.router.push('/admin/news');
    },
    checkImage() {
      if (!this.newsForm.imageUrl) {
        this.imageStatus = 'none';
        return;
      }
      
      // 建立一個Image物件來檢查圖片能否載入
      const img = new Image();
      
      // 添加超時處理
      const timeoutId = setTimeout(() => {
        this.imageStatus = 'failed';
        console.log('圖片載入超時');
      }, 5000); // 設定5秒超時
      
      img.onload = () => {
        clearTimeout(timeoutId);
        this.imageStatus = 'success';
        console.log('圖片載入成功');
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        this.imageStatus = 'failed';
        console.log('圖片載入失敗');
      };
      
      img.src = this.newsForm.imageUrl;
      console.log('嘗試載入圖片:', this.newsForm.imageUrl);
    },
    validateForm() {
      // 檢查所有必填欄位是否已填寫
      if (!this.newsForm.date || 
          !this.newsForm.category || 
          !this.newsForm.title || 
          !this.newsForm.content) {
        return false;
      }
      
      // 檢查圖片是否已正確載入
      if (this.imageStatus !== 'success') {
        return false;
      }
      
      return true;
    },
    saveNews() {
      // 驗證表單
      if (this.validateForm()) {
        // 根據是編輯還是新增來處理
        let result;
        if (this.isEditMode) {
          result = this.updateNewsInJson();
        } else {
          result = this.addNewsToJson();
        }
        
        if (result) {
          // 顯示成功彈窗
          this.dataSuccessAlert.showAlert();
          
          // 設置彈窗確認按鈕的回調
          this.dataUpdateSuccess.function = () => {
            // 清除編輯數據
            localStorage.removeItem('editingNewsItem');
            this.goBack(); // 點擊確認後返回列表頁
          };
        } else {
          // 如果操作失敗，顯示失敗彈窗
          this.dataFailedAlert.showAlert();
        }
      } else {
        // 驗證失敗，顯示錯誤彈窗
        this.dataFailedAlert.showAlert();
      }
    },
    addNewsToJson() {
      // 根據所選類別，將新聞添加到對應的數組中
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('.')[0] + '+08:00';
      
      // 構建新聞對象
      const newNewsItem = {
        title: this.newsForm.title,
        description: this.newsForm.content,
        begin: "",
        end: "",
        posted: formattedDate,
        modified: formattedDate,
        url: "",
        files: [
          {
            src: this.newsForm.imageUrl
          }
        ],
        links: []
      };
      
      try {
        // 從 localStorage 獲取最新的數據，如果不存在則使用導入的默認數據
        let currentData = JSON.parse(localStorage.getItem('newsData')) || { ...newsData };
        
        // 根據選擇的類別添加到相應的數組尾部
        if (this.newsForm.category === 'news') {
          // 確保陣列存在
          if (!Array.isArray(currentData.news)) {
            currentData.news = [];
          }
          currentData.news.push(newNewsItem);
        } else if (this.newsForm.category === 'shop') {
          // 確保陣列存在
          if (!Array.isArray(currentData.store)) {
            currentData.store = [];
          }
          currentData.store.push(newNewsItem);
        } else if (this.newsForm.category === 'system') {
          // 確保陣列存在
          if (!Array.isArray(currentData.system)) {
            currentData.system = [];
          }
          currentData.system.push(newNewsItem);
        }
        
        // 保存更新後的數據到 localStorage
        localStorage.setItem('newsData', JSON.stringify(currentData));
        
        console.log('已新增數據到', this.newsForm.category, '類別的尾部');
        console.log('更新後的新聞數據：', currentData);
        
        return true;
      } catch (error) {
        console.error('添加新聞時出錯:', error);
        return false;
      }
    },
    updateNewsInJson() {
      // 更新現有的新聞項目
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('.')[0] + '+08:00';
      
      // 構建更新後的新聞對象
      const updatedNewsItem = {
        title: this.newsForm.title,
        description: this.newsForm.content,
        begin: "",
        end: "",
        posted: this.newsForm.date + " 00:00:00 +08:00", // 使用表單中的日期
        modified: formattedDate, // 當前日期作為修改時間
        url: "",
        files: [
          {
            src: this.newsForm.imageUrl
          }
        ],
        links: []
      };
      
      try {
        // 從 localStorage 獲取當前數據
        let currentData = JSON.parse(localStorage.getItem('newsData')) || { ...newsData };
        
        // 根據原始類別和索引更新項目
        const categoryMap = {
          'news': 'news',
          'store': 'store',
          'system': 'system'
        };
        
        // 確保原始類別和索引有效
        if (this.originalCategory && this.originalIndex !== null && 
            this.originalIndex >= 0 && categoryMap[this.originalCategory]) {
          
          // 取得實際的類別名稱
          const actualCategory = categoryMap[this.originalCategory];
          
          // 檢查數組是否存在且索引是否有效
          if (Array.isArray(currentData[actualCategory]) && 
              this.originalIndex < currentData[actualCategory].length) {
            
            // 如果用戶選擇了不同的類別，則需要從原類別中刪除並添加到新類別中
            if (this.originalCategory !== this.newsForm.category) {
              // 從原類別中刪除
              currentData[actualCategory].splice(this.originalIndex, 1);
              
              // 添加到新類別中
              const newCategory = categoryMap[this.newsForm.category];
              if (!Array.isArray(currentData[newCategory])) {
                currentData[newCategory] = [];
              }
              currentData[newCategory].push(updatedNewsItem);
            } else {
              // 在原位置更新項目
              currentData[actualCategory][this.originalIndex] = updatedNewsItem;
            }
            
            // 保存更新後的數據到 localStorage
            localStorage.setItem('newsData', JSON.stringify(currentData));
            
            console.log('已更新索引為', this.originalIndex, '的項目在', actualCategory, '類別中');
            console.log('更新後的新聞數據：', currentData);
            
            return true;
          } else {
            console.error('無效的數組或索引:', actualCategory, this.originalIndex);
          }
        } else {
          console.error('無效的原始類別或索引:', this.originalCategory, this.originalIndex);
        }
        
        return false;
      } catch (error) {
        console.error('更新新聞時出錯:', error);
        return false;
      }
    }
  },
  watch: {
    'newsForm.imageUrl': {
      handler: function(newVal) {
        this.checkImage();
      }
    }
  }
};
</script>

<template>
    <div>
      <!-- 返回按鈕 -->
      <div class="return-btn title2 bold" @click="goBack">
          <BackIcon/> 返回
      </div>
      <h1 class="admin-title">{{ isEditMode ? '編輯最新消息' : '新增最新消息' }}</h1>

      <div class="admin-form gap-32 pr-100">
        <!-- 日期選擇 -->
        <div class="form-group w-s">
          <label class="select-label" for="date">上架時間</label>
          <div class="date-range-wrapper">
            <input 
              type="date" 
              class="form-input date-input"
              v-model="newsForm.date"
            >
          </div>
        </div>

        <div class="select-group w-s">
          <label class="select-label">分類</label>
          <div class="select-wrapper">
            <select class="select-field" v-model="newsForm.category">
              <option value="news">最新消息</option>
              <option value="shop">商城</option>
              <option value="system">系統公告</option>
            </select>
            <span class="select-arrow"></span>
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">標題</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="請輸入標題" v-model="newsForm.title">
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <label class="input-label">內容</label>
            <textarea class="input-field textarea" placeholder="請輸入內容" v-model="newsForm.content"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">文章圖網址</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="請輸入網址" v-model="newsForm.imageUrl">
          </div>
        </div>
       
        <div class="img-preview">
          <!-- 根據圖片狀態動態顯示不同內容 -->
          <div v-if="imageStatus === 'none'" class="img-preview-photo no-photo">
            (尚未上傳照片)
          </div>
          <div v-else-if="imageStatus === 'failed'" class="img-preview-photo failed-photo">
            (預覽失敗，請確認網址是否正確)
          </div>
          <div v-else class="img-preview-photo with-photo" :style="{ backgroundImage: `url('${newsForm.imageUrl}')` }">
          </div>
        </div>
      </div>

      <div class="form-cta">
          <button class="btn_filled" @click="saveNews">保存</button>
      </div>
    </div>

  <!-- 彈窗 -->
  <Alert_web_M ref="dataSuccessAlert" :alertInfo="dataUpdateSuccess" />
  <Alert_web_M ref="dataFailedAlert" :alertInfo="dataUpdateFailed" />
</template>



<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-news.scss";
</style>

