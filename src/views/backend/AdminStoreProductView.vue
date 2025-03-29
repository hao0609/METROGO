<script setup>
  import BackIcon from '@/components/icons/IconBack.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
  import Alert_web_M from '@/components/Alert_web_M.vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  const router = useRouter();

  // 返回上一頁
  const goBack = () => {
    router.push('/admin/store');
  };

  // 照片上傳相關
  const fileInput = ref(null);
  const photoUrl = ref('');
  const selectedFile = ref(null);
  const isPhotoDeleted = ref(false);
  const photoStatus = ref('default'); // 'default', 'nophoto', 'uploaded'

  // 彈窗參考
  const deletePhotoAlert = ref(null);
  const dataSuccessAlert = ref(null);
  const dataFailedAlert = ref(null);

  // 顯示刪除照片確認提示
  const showDeletePhotoConfirm = () => {
    deletePhotoAlert.value.showAlert();
  };

  // 刪除照片提示確認
  const deletePhoto = () => {
    showDeletePhotoConfirm();
  };

  // 實際執行刪除照片的函數
  const performDeletePhoto = () => {
    photoUrl.value = '';
    selectedFile.value = null;
    isPhotoDeleted.value = true;
    photoStatus.value = 'nophoto';
  };

  // 點擊上傳區域或編輯按鈕時觸發文件上傳
  const triggerFileUpload = () => {
    fileInput.value.click();
  };

  // 處理文件上傳
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn('未選擇檔案');
      selectedFile.value = null;
      return;
    }
    
    // 驗證文件是否為圖片
    if (!file.type.match('image.*')) {
      alert('請上傳圖片文件');
      selectedFile.value = null;
      return;
    }
    
    // 驗證文件大小（小於2MB）
    if (file.size > 2 * 1024 * 1024) {
      alert('圖片大小不能超過2MB');
      selectedFile.value = null;
      return;
    }
    
    // 創建本地URL以預覽圖片
    photoUrl.value = URL.createObjectURL(file);
    selectedFile.value = file;

    // 更新照片狀態為 uploaded
    photoStatus.value = 'uploaded';
  };

  // 初始化
  onMounted(() => {
    // 設置初始狀態
    photoStatus.value = 'nophoto';
  });

  // 刪除照片 Alert 彈窗資訊
  const deletePhotoalertInfo = ref({
    fristTitle: '刪除商品圖片',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
    </svg>
    `,
    SecondTittle: '是否刪除商品圖片',
    ThirdTittle: '刪除後將無法復原',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {
      // 執行刪除照片的邏輯
      performDeletePhoto();
    }
  });

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

  // 表單數據
  const productForm = ref({
    name: '',
    summary: '',
    description: '',
    price: ''
  });

  // 驗證表單是否完整
  const validateForm = () => {
    // 檢查所有必填欄位
    if (!productForm.value.name.trim()) {
      return false;
    }
    if (!productForm.value.summary.trim()) {
      return false;
    }
    if (!productForm.value.description.trim()) {
      return false;
    }
    if (!productForm.value.price.trim()) {
      return false;
    }
    
    // 檢查是否上傳了圖片
    if (photoStatus.value !== 'uploaded') {
      return false;
    }
    
    return true;
  };

  // 保存商品表單
  const saveProduct = () => {
    // 驗證表單
    if (validateForm()) {
      // 表單完整，顯示成功彈窗
      console.log('保存商品表單', {
        ...productForm.value,
        photoUrl: photoUrl.value,
        selectedFile: selectedFile.value ? selectedFile.value.name : null
      });
      
      // 顯示成功彈窗
      dataSuccessAlert.value.showAlert();
    } else {
      // 表單不完整，顯示失敗彈窗
      dataFailedAlert.value.showAlert();
    }
  };
</script>

<template>
  <div>
    <!-- 返回按鈕 -->
    <div class="return-btn title2 bold" @click="goBack">
      <BackIcon/> 返回
    </div>
    
    <h1 class="admin-title">新增商品</h1>
      
    <div class="admin-form gap-32 pr-100">
      <div class="form-group">
        <label class="input-label">商品名稱</label>
        <div class="input-wrapper">
        <input type="text" class="input-field" placeholder="請輸入商品名稱" v-model="productForm.name">
        </div>
      </div>
      
      <div class="form-group">
        <div class="input-wrapper">
          <label class="input-label">商品簡述</label>
          <textarea class="input-field textarea" placeholder="請輸入商品簡易描述(建議在 20 字以內)" v-model="productForm.summary"></textarea>
        </div>
      </div>
      
      <div class="form-group">
        <div class="input-wrapper">
          <label class="input-label">商品說明</label>
          <textarea class="input-field textarea" placeholder="請輸入商品完整說明" v-model="productForm.description"></textarea>
        </div>
      </div>
      
      <div class="form-group w-s">
        <label class="input-label">建議售價</label>
        <div class="input-wrapper">
        <input type="text" class="input-field" placeholder="請輸入建議售價參考" v-model="productForm.price">
        </div>
      </div>
      
      <div class="form-group">
        <label class="input-label">商品圖片</label>
      
        <div class="img-preview">
          <!-- 根據圖片狀態動態顯示不同內容 -->
          <div v-if="photoStatus === 'default'" class="img-preview-photo default">
            <img src="../assets/images/login/img_userprofile_default.svg">
          </div>
          <div v-else-if="photoStatus === 'nophoto'" class="img-preview-photo nophoto" @click="triggerFileUpload">
            <AddIcon/><span>上傳照片</span>
          </div>
          <div v-else-if="photoStatus === 'uploaded'" class="img-preview-photo uploaded">
            <img :src="photoUrl" alt="商品圖片" />
            <div class="hover-section">
              <EditIcon @click="triggerFileUpload" />
              <DeleteIcon @click="deletePhoto" />
            </div>
          </div>
          
          <!-- 隱藏的文件上傳輸入框 -->
          <input 
            type="file" 
            ref="fileInput" 
            accept="image/*" 
            style="display: none" 
            @change="handleFileUpload"
          />
          
          <p class="caption upload-note">檔案大小需小於 2 MB</p>
        </div>
      </div>
    
      <div class="form-cta">
        <button class="btn_filled" @click="saveProduct">保存</button>
      </div>
          
    </div>
    
    <!-- 彈窗 -->
    <Alert_web_M ref="deletePhotoAlert" :alertInfo="deletePhotoalertInfo" />
    <Alert_web_M ref="dataSuccessAlert" :alertInfo="dataUpdateSuccess" />
    <Alert_web_M ref="dataFailedAlert" :alertInfo="dataUpdateFailed" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-product.scss";
</style>
