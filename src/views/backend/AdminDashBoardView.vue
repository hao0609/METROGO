<template>
    <div>
      <h1 class="admin-title">後台總覽</h1>
    
      <div class="admin-form gap-32">
          <div class="select-group w-s">
            <label class="select-label">標題文字</label>
            <div class="select-wrapper">
              <select class="select-field">
                <option value="" disabled selected>下拉選項</option>
                <option value="option1">選項一</option>
                <option value="option2">選項二</option>
              </select>
              <span class="select-arrow"></span>
              <!-- <span class="error-message">錯誤訊息</span> -->
            </div>
          </div>
  
          <div class="form-group">
            <label class="input-label">標題文字</label>
            <div class="input-wrapper">
            <input type="text" class="input-field" placeholder="Placeholder">
            </div>
          </div>
  
          <div class="form-group">
            <div class="input-wrapper">
              <label class="input-label">輸入內容</label>
              <textarea class="input-field textarea" placeholder="Placeholder"></textarea>
            </div>
          </div>
  
          <div class="form-group">
          <label class="input-label">驗證碼</label>
          <div class="input-wrapper with-upload-button ">
            <input type="text" class="input-field" placeholder="Placeholder">
            <button class="upload-button">上傳按鈕</button>
          </div>
          <p class="caption upload-note">只允許 JPEG/JPG/WebP，檔案大小需小於 2MB</p>
          </div>
  
  
          <!-- 單一日期選擇 -->
          <div class="form-group">
            <label class="select-label" for="singleDate">起訖時間</label>
            <div class="date-input-wrapper">
              <input 
                type="date" 
                id="singleDate" 
                class="form-input date-input"
                value="2025-01-01"
              >
            </div>
          </div>
  
          <!-- 雙日期選擇 -->
          <div class="form-group">
            <label class="select-label" for="dateRange">起訖時間</label>
            <div class="date-range-wrapper">
              <input 
                type="date" 
                class="form-input date-input"
                value="2025-01-01"
              >
              <input 
                type="date" 
                class="form-input date-input"
                value="2025-01-01"
              >
            </div>
          </div>
  
        </div>
      
      
    </div>
  </template>
  
  <style lang="scss" scoped>
  @use "@/assets/sass/page/backend/admin-common.scss";
  </style>
  
  <script>
  // import EditIcon from '@/components/icons/IconAdminEdit.vue';
  // import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
  // import AddIcon from '@/components/icons/IconAdd.vue';
  
  export default {
  name: "AdminDashBoardView",
  components: {
    // EditIcon,
    // DeleteIcon,
    // AddIcon,
  },
  
  };
  </script>
  