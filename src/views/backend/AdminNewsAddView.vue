<template>
    <div>
      <h1 class="admin-title">文章管理</h1>
    
      <div class="admin-form gap-32 pr-100">

        <div class="form-group">
          <label class="input-label">標題</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="select-group w-s">
          <label class="select-label">分類</label>
          <div class="select-wrapper">
            <select class="select-field">
              <option value="" disabled selected>未分類</option>
              <option value="option1">選項一</option>
              <option value="option2">選項二</option>
            </select>
            <span class="select-arrow"></span>
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <label class="input-label">簡介</label>
            <textarea class="input-field textarea" placeholder="Placeholder"></textarea>
          </div>
        </div>

        <div class="form-group">
        <label class="input-label">文章圖片</label>
        <div class="input-wrapper with-upload-button ">
          <input type="text" class="input-field" placeholder="Placeholder">
          <button class="upload-button">上傳按鈕</button>
        </div>
        <p class="caption upload-note">只允許 JPEG/JPG/WebP，檔案大小需小於 2MB</p>
        </div>


        <!-- 雙日期選擇 -->
        <div class="form-group w-s">
          <label class="select-label" for="dateRange">活動時間</label>
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

      <div class="form-cta">
          <button class="btn_filled">新增或修改</button>
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
  name: "AdminNewsAddView",
  components: {
    // EditIcon,
    // DeleteIcon,
    // AddIcon,
  },
  
};
</script>
