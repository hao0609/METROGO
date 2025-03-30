<script setup>
  import BackIcon from '@/components/icons/IconBack.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
  import Alert_web_M from '@/components/Alert_web_M.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';

  import { handleProductUpdate, updateExistingProduct } from '../../js/view/Backend/updateProductDB.js';
  import { fetchSingleProductData, validateProductData, fillProductForm } from '../../js/view/Backend/getProductDB.js';

  const router = useRouter();
  const route = useRoute();

  // 編輯模式標誌
  const isEditMode = computed(() => route.query.mode === 'edit');
  
  // 頁面標題
  const pageTitle = computed(() => isEditMode.value ? '編輯商品' : '新增商品');

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
  const originalPhotoUrl = ref(''); // 保存原始照片URL，用於比較是否有更改

  // 商品ID
  const productId = ref('');

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

  // 獲取商品資料
  const fetchProductData = async (productId, expectedName) => {
    try {
      const productData = await fetchSingleProductData(productId, expectedName);
      
      if (productData) {
        fillProductForm(productForm, photoUrl, photoStatus, productData);
        return productData;
      } else {
        photoStatus.value = 'nophoto';
        return null;
      }
    } catch (error) {
      console.error('獲取商品資料時發生錯誤:', error);
      photoStatus.value = 'nophoto';
      return null;
    }
  };

  // 表單數據
  const productForm = ref({
    name: '',
    intro: '',
    summary: '',
    spec: '',
    price: ''
  });

  // 驗證表單是否完整
  const validateForm = () => {
    if (!productForm.value.name.trim()) return false;
    if (!productForm.value.intro.trim()) return false;
    if (!productForm.value.summary.trim()) return false;
    if (!productForm.value.spec.trim()) return false;
    if (!productForm.value.price.trim()) return false;
    if (photoStatus.value !== 'uploaded') return false;
    
    return true;
  };

  // 保存商品表單
  const saveProduct = async () => {
    if (validateForm()) {
      try {
        let result;
        
        if (isEditMode.value) {
          result = await updateExistingProduct({
            productId: productId.value,
            productData: {
              name: productForm.value.name,
              summary: productForm.value.summary,
              intro: productForm.value.intro,
              spec: productForm.value.spec, 
              price: productForm.value.price
            },
            imageFile: selectedFile.value,
            imageUrl: photoUrl.value,
            originalImageUrl: originalPhotoUrl.value,
            isPhotoDeleted: isPhotoDeleted.value
          });
        } else {
          result = await handleProductUpdate({
            productData: {
              name: productForm.value.name,
              summary: productForm.value.summary,
              intro: productForm.value.intro,
              spec: productForm.value.spec,
              price: productForm.value.price
            },
            imageFile: selectedFile.value
          });
        }
      
        // 判斷結果並顯示對應彈窗
        if (result && result.success) {
          // 更新成功
          dataUpdateSuccess.value.SecondTittle = isEditMode.value 
            ? `商品「${productForm.value.name}」已更新` 
            : `商品「${productForm.value.name}」已新增`;
          dataSuccessAlert.value.showAlert();
        } else {
          // 更新失敗
          dataUpdateFailed.value.SecondTittle = result.message || '請確認所有欄位填寫正確';
          dataFailedAlert.value.showAlert();
        }
      
      } catch (error) {
        // 發生錯誤時顯示失敗彈窗
        console.error('保存商品時發生錯誤:', error);
        dataUpdateFailed.value.SecondTittle = '商品儲存過程中發生錯誤';
        dataFailedAlert.value.showAlert();
      }
    } else {
      // 表單驗證失敗時顯示失敗彈窗
      dataUpdateFailed.value.SecondTittle = '請確認所有欄位已正確填寫';
      dataFailedAlert.value.showAlert();
    }
  };

  // 只保留一個 onMounted 函數，將兩個組合
  onMounted(async () => {  
    const editMode = route.query.mode === 'edit';
    const idFromRoute = route.query.id;
    const nameFromRoute = route.query.name ? decodeURIComponent(route.query.name) : null;
    const introFromRoute = route.query.intro ? decodeURIComponent(route.query.intro) : '';
    const summaryFromRoute = route.query.summary ? decodeURIComponent(route.query.summary) : '';
    const specFromRoute = route.query.spec ? decodeURIComponent(route.query.spec) : '';
    const priceFromRoute = route.query.price ? decodeURIComponent(route.query.price) : '';
    const imageFromRoute = route.query.image ? decodeURIComponent(route.query.image) : '';
    
    console.log(`路由參數: 
      mode=${route.query.mode}, 
      id=${idFromRoute}, 
      name=${nameFromRoute},
      intro=${introFromRoute},
      summary=${summaryFromRoute},
      spec=${specFromRoute},
      price=${priceFromRoute},
      image=${imageFromRoute}`);
    
    if (editMode && idFromRoute) {
      // 設置 ID
      productId.value = idFromRoute;
      
      // 如果路由中已有完整商品資訊，直接填充
      if (nameFromRoute) {
        productForm.value = {
          name: nameFromRoute,
          intro: introFromRoute,
          summary: summaryFromRoute,
          spec: specFromRoute,
          price: priceFromRoute
        };
        
        if (imageFromRoute) {
          photoUrl.value = imageFromRoute;
          originalPhotoUrl.value = imageFromRoute;
          photoStatus.value = 'uploaded';
        }
      } else {
        // 否則從數據庫獲取
        const data = await fetchProductData(idFromRoute, nameFromRoute);
        
        if (!data) {
          console.warn(`無法使用ID ${idFromRoute} 獲取數據`);
        }
      }
      
      // 驗證數據
      setTimeout(() => {
        const isValid = validateProductData(productForm, productId);
        if (!isValid) {
          console.warn('警告: 獲取的數據可能不是您點擊的商品!');
        }
      }, 500);
    } else {
      // 新增模式
      photoStatus.value = 'nophoto';
    }
    
    console.log('=== 元件掛載完成 ===');
  });
  
  // 彈窗們
  const deletePhotoalertInfo = ref({
    fristTitle: '刪除照片',
      svg_icon: `
      <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
      </svg>
      `,
      SecondTittle: '確定要刪除此商品照片嗎？',
      ThirdTittle: '刪除後就無法復原',
      ButtonText: '確認',
      allowOutsideClick: true,
      function: performDeletePhoto,
  });

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
      function: () => {
        router.push('/admin/store');
      }
  });

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

</script>

<template>
  <div>
    <!-- 返回按鈕 -->
    <div class="return-btn title2 bold" @click="goBack">
      <BackIcon/> 返回
    </div>
    
    <h1 class="admin-title">{{ pageTitle }}</h1>    
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
          <textarea class="input-field textarea" placeholder="請輸入商品完整說明" v-model="productForm.intro"></textarea>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrapper">
          <label class="input-label">商品規格</label>
          <textarea class="input-field textarea" placeholder="請輸入商品規格" v-model="productForm.spec"></textarea>
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
          <div v-if="photoStatus === 'nophoto'" class="img-preview-photo nophoto" @click="triggerFileUpload">
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