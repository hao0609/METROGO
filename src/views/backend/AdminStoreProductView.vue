<template>
    <div>
      <h1 class="admin-title">商品管理</h1>
    
      <div class="admin-form gap-32 pr-100">

        <div class="form-group">
          <label class="input-label">商品名稱</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">商品網址</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="form-group">
          <div class="input-wrapper">
            <label class="input-label">商品簡述</label>
            <textarea class="input-field textarea" placeholder="Placeholder"></textarea>
          </div>
        </div>

        <div class="form-group">
        <label class="input-label">商品圖片</label>
        <div class="input-wrapper with-upload-button ">
          <input type="text" class="input-field" placeholder="Placeholder">
          <button class="upload-button">上傳按鈕</button>
        </div>
        <p class="caption upload-note">只允許 JPEG/JPG/WebP，檔案大小需小於 2MB</p>
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


        <div class="select-group w-s">
          <label class="select-label">標籤</label>
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
          <label class="input-label">售價</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="form-group" style="padding-left: 160px">
          <label class="input-label">折扣價</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">點數兌換</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>


        <div class="form-group">
          <label class="input-label">庫存數量</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>

        <div class="form-group">
          <label class="input-label">商品狀態</label>
          <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Placeholder">
          </div>
        </div>


        <div class="form-cta">
          <button class="btn_filled">新增或修改</button>
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
  name: "AdminStoreProductView",
  components: {
    // EditIcon,
    // DeleteIcon,
    // AddIcon,
  },
  
};
</script>
