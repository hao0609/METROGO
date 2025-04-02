<script setup>
import { ref, computed, onMounted, inject } from 'vue';

// 引入組件
import Navbar_V1 from "../components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import Alert_web_M from '@/components/Alert_web_M.vue';
import alert_logout_successful from "../alert/alert_logout_successful.vue";

// 引入圖標組件
import SubwayRightIcon from '@/components/icons/IconSubwayRight.vue';
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';
import HearFillIcon from '@/components/icons/IconHeartfill.vue';
import CartIcon from '@/components/icons/IconCart.vue';
import AddIcon from '@/components/icons/IconAdd.vue';
import EditIcon from '@/components/icons/IconAdminEdit.vue';
import DeleteIcon from '@/components/icons/IconAdminDelete.vue';

// 引入用戶資訊獲取 & 更新函數
import { getUserProfile } from '@/js/view/checkUserDB_UserProfile';
import { handleUserProfileUpdate } from '@/js/view/updateUserDB_UserProfile';
import { updateUserPassword, handlePasswordUpdate, validatePasswordFormat } from '@/js/view/updateUserDB_Password';

// 登出
import { logoutUser } from "@/js/view/signout";
import { useRouter } from 'vue-router';

// 確保用戶狀態已加載
const userReady = ref(false);


// 判斷用戶是否為 google 帳戶進行登入

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
const checkUserIsGoogleAccount = () => {
    const isGoogleLogin = user.providerData.some(provider => provider.providerId === 'google.com');
    if (isGoogleLogin) {
        console.log('用戶使用 Google 帳戶登入');
        // 隱藏修改密碼欄位按鈕
        CheckUserCanEditPWD.value = false
    }else{
        console.log('用戶未使用 Google 帳戶登入');
        CheckUserCanEditPWD.value = true
    }
}


onMounted(() => {
  // 等待用戶狀態準備好
  const checkUserStatus = () => {
    if (user_status.value && user_status.value.uid) {
      userReady.value = true;
    } else {
      // 如果用戶狀態還未準備好，500ms 後再檢查
      setTimeout(checkUserStatus, 500);
    }

    checkUserIsGoogleAccount()

  };
  
  checkUserStatus();
});

// 使用 inject 來接 app.vue provide 的 user 狀態
const user_status = inject("user"); // 取得用戶狀態

// 狀態管理
const activeMenuItem = ref('userInfo'); // 預設顯示會員資料 tab
const menuItems = ref([
    { id: 'userInfo', text: '會員資料' },
    { id: 'changePassward', text: '修改密碼' },
    // { id: 'productCollection', text: '商品收藏' }
]);

// 會員資料
const userName = ref("");
const userEmail = ref("--");

// 用戶積分
const userPoints = ref("--");

// 照片上傳相關
const fileInput = ref(null);
const photoUrl = ref('');
const selectedFile = ref(null);
const isPhotoDeleted = ref(false);
const photoStatus = ref('default');

// 計算屬性：是否有照片
const hasPhoto = computed(() => photoUrl.value !== '');

// 修改密碼欄位按鈕是否顯示，預設為顯示 ( 若為 google 障戶登入使用者則隱藏)
const CheckUserCanEditPWD = ref(true);

// 密碼相關狀態
const passwordForm = ref({
    newPassword: '',
    confirmPassword: '',
    isNewPasswordValid: true,
    isConfirmPasswordValid: true,
    passwordErrorMsg: '',
    passwordMatchErrorMsg: '',
    passwordFormatErrorMsg: '',
    passwordLengthErrorMsg: ''
});

// 密碼可見性狀態
const passwordVisible = ref({
    newPassword: false,
    confirmPassword: false
});

// 切換密碼可見性
const togglePasswordVisibility = (field) => {
    passwordVisible.value[field] = !passwordVisible.value[field];
};

// 彈窗
const alertM = ref(null);
const alertSuccess = ref(null);
const alertFailed = ref(null);
const passwordAlert = ref(null);
const passwordSuccessAlert = ref(null);
const passwordFailedAlert = ref(null);

// 菜單點擊切換
const handleMenuClick = (menuId) => {
    activeMenuItem.value = menuId;
};

// 移動端菜單選擇變化
const handleMobileMenuChange = (event) => {
    activeMenuItem.value = event.target.value;
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
    
    // 創建本地URL以預覽圖片
    photoUrl.value = URL.createObjectURL(file);
    selectedFile.value = file;

    // 更新照片狀態為 uploaded
    photoStatus.value = 'uploaded';
};

// 顯示刪除照片確認提示
const showDeletePhotoConfirm = () => {
    alertM.value.showAlert();
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

// 組件掛載時獲取用戶積分
onMounted(async () => {
    try {
        // 確保用戶狀態已經準備好
        while (!user_status.value?.uid) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        const userInfo = await getUserProfile(user_status.value);
        
        // 顯示用戶積分
        userPoints.value = userInfo.points;
        
        // 更新用戶名稱和信箱
        userName.value = userInfo.userName || ''; 
        userEmail.value = userInfo.email || '--';

        // 判斷會員頭像狀態
        if (userInfo.userPhoto) {
            photoUrl.value = userInfo.userPhoto;
            photoStatus.value = 'uploaded';
        } else {
            photoStatus.value = 'nophoto';
        }
    } catch (error) {
        console.error('載入用戶資訊時發生錯誤:', error);
    }
});

// 顯示資料更新提示
const showUpdateAlert = async () => {
    try {
        const result = await handleUserProfileUpdate({
            userStatus: user_status.value,
            userName: userName.value,
            imageFile: selectedFile.value,
            photoUrl: photoUrl.value,
            isPhotoDeleted: isPhotoDeleted.value
        });

        if (result.success) {
            // 更新成功
            alertSuccess.value.showAlert();
            
            // 更新本地照片URL和狀態
            if (result.photoUrl) {
                photoUrl.value = result.photoUrl;
                photoStatus.value = 'uploaded';
            } else {
                photoStatus.value = 'nophoto';
            }
        } else {
            // 更新失敗
            alertFailed.value.showAlert();
        }

        // 重置狀態
        selectedFile.value = null;
        isPhotoDeleted.value = false;
    } catch (error) {
        console.error('更新過程發生未處理的錯誤:', error);
        alertFailed.value.showAlert();
    }
};

//// 密碼更新 ////

const handlePasswordSubmit = async () => {
    // 重置驗證狀態和錯誤訊息
    passwordForm.value.isNewPasswordValid = true;
    passwordForm.value.isConfirmPasswordValid = true;
    passwordForm.value.passwordErrorMsg = '';
    passwordForm.value.passwordMatchErrorMsg = '';
    passwordForm.value.passwordFormatErrorMsg = '';
    passwordForm.value.passwordLengthErrorMsg = '';
    
    try {
        // 使用 JS 檔中的 handlePasswordUpdate 函數進行密碼更新
        const result = await handlePasswordUpdate(
            user_status.value, 
            passwordForm.value.newPassword, 
            passwordForm.value.confirmPassword
        );
        
        if (result.success) {
            // 密碼更新成功
            passwordUpdateSuccess.value.ThirdTittle = '';
            passwordSuccessAlert.value.showAlert();
            // 清空密碼表單
            passwordForm.value.newPassword = '';
            passwordForm.value.confirmPassword = '';
        } else {
            // 處理各種錯誤情況
            switch (result.type) {
                case 'validation_error':
                    if (result.field === 'newPassword') {
                        passwordForm.value.isNewPasswordValid = false;
                        passwordForm.value.passwordErrorMsg = result.message;
                    } else if (result.field === 'confirmPassword') {
                        passwordForm.value.isConfirmPasswordValid = false;
                        passwordForm.value.passwordErrorMsg = result.message;
                    }
                    break;

                case 'length_error':
                    if (result.field === 'newPassword') {
                        passwordForm.value.isNewPasswordValid = false;
                        passwordForm.value.passwordLengthErrorMsg = result.message;
                    } else if (result.field === 'confirmPassword') {
                        passwordForm.value.isConfirmPasswordValid = false;
                        passwordForm.value.passwordLengthErrorMsg = result.message;
                    }
                    break;
                    
                case 'format_error':
                    if (result.field === 'newPassword') {
                        passwordForm.value.isNewPasswordValid = false;
                        passwordForm.value.passwordFormatErrorMsg = result.message;
                    } else if (result.field === 'confirmPassword') {
                        passwordForm.value.isConfirmPasswordValid = false;
                        passwordForm.value.passwordFormatErrorMsg = result.message;
                    }
                    break;
                    
                case 'match_error':
                    passwordForm.value.isNewPasswordValid = false;
                    passwordForm.value.isConfirmPasswordValid = false;
                    passwordForm.value.passwordMatchErrorMsg = result.message;
                    break;
                
                case 'auth_requires_recent_login':
                    // 對於需要重新登入的情況，顯示特別的提示
                    passwordUpdateFailed.value.SecondTittle = '需要重新登入';
                    passwordUpdateFailed.value.ThirdTittle = '請登出並重新登入後再嘗試修改密碼';
                    passwordFailedAlert.value.showAlert();
                    break;
                    
                default:
                    // 其他未知錯誤，顯示失敗提示
                    passwordUpdateFailed.value.SecondTittle = '密碼更新失敗';
                    passwordUpdateFailed.value.ThirdTittle = '請再試一次';
                    passwordFailedAlert.value.showAlert();
            }
        }
    } catch (error) {
        console.error('更新密碼時發生錯誤:', error);
        passwordFailedAlert.value.showAlert();
    }
};

//// 登出 ////

// 引入路由
const router = useRouter();

// 登出彈窗參考
const alert_logout_successful_ref = ref(null);

// 處理登出功能
const handleLogout = async () => {
    try {
        // 執行登出
        const logout_success = await logoutUser();
        
        if (logout_success) {
            // 顯示登出成功彈窗
            alert_logout_successful_ref.value.UserLogOutSuccessful();
            
            // 使用 setTimeout 延遲導航，給足夠時間顯示彈窗
            setTimeout(() => {
                console.log("導航到首頁");
                router.push("/home");
            }, 2000); // 彈窗顯示 2 秒後導航到首頁
        } else {
            console.error("登出失敗");
        }
    } catch (error) {
        console.error("登出過程中發生錯誤:", error);
    }
};

// 刪除照片 Alert 彈窗資訊
const deletePhotoalertInfo = ref({
    fristTitle: '刪除頭像',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
    </svg>
    `,
    SecondTittle: '是否刪除照片',
    ThirdTittle: '刪除後將無法復原',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {
        // 執行刪除照片的邏輯
        performDeletePhoto();
    }
});

// 更新資料成功 Alert 彈窗資訊
const updateInfoSuccess = ref({
    fristTitle: '成功',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 0C36 0 0 36 0 80C0 124 36 160 80 160C124 160 160 124 160 80C160 36 124 0 80 0ZM80 144C44.72 144 16 115.28 16 80C16 44.72 44.72 16 80 16C115.28 16 144 44.72 144 80C144 115.28 115.28 144 80 144ZM116.72 44.64L64 97.36L43.28 76.72L32 88L64 120L128 56L116.72 44.64Z" fill="#00C9A7"/>
    </svg>
    `,
    SecondTittle: '資料已更新',
    ThirdTittle: '',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {}
});

// 更新資料失敗 Alert 彈窗資訊
const updateInfoFailed = ref({
    fristTitle: '失敗',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
    </svg>
    `,
    SecondTittle: '資料更新失敗',
    ThirdTittle: '請再試一次',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {}
});

//// 彈窗 ////

// 密碼更新成功 Alert 彈窗資訊
const passwordUpdateSuccess = ref({
    fristTitle: '成功',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 0C36 0 0 36 0 80C0 124 36 160 80 160C124 160 160 124 160 80C160 36 124 0 80 0ZM80 144C44.72 144 16 115.28 16 80C16 44.72 44.72 16 80 16C115.28 16 144 44.72 144 80C144 115.28 115.28 144 80 144ZM116.72 44.64L64 97.36L43.28 76.72L32 88L64 120L128 56L116.72 44.64Z" fill="#00C9A7"/>
    </svg>
    `,
    SecondTittle: '密碼已更新',
    ThirdTittle: '',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {}
});

// 密碼更新失敗 Alert 彈窗資訊
const passwordUpdateFailed = ref({
    fristTitle: '失敗',
    svg_icon: `
    <svg width="160" height="160" viewBox="0 0 160 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M79.9983 160C123.687 160 160 123.765 160 80C160 36.3122 123.607 0 79.918 0C36.1557 0 0 36.3122 0 80C0 123.765 36.2327 160 79.9983 160ZM80.0017 146.668C42.9759 146.668 13.4028 117.018 13.4028 80C13.4028 43.0553 42.8956 13.3322 79.918 13.3322C116.86 13.3322 146.584 43.0587 146.664 80C146.741 117.022 116.937 146.668 79.995 146.668M79.918 94.1956C83.6795 94.1956 85.7978 92.0773 85.8748 88.0014L87.0528 46.5891C87.1331 42.5868 83.9941 39.6085 79.8377 39.6085C75.601 39.6085 72.6226 42.5098 72.6996 46.5088L73.7203 88.0014C73.7973 92.0003 75.9959 94.1956 79.918 94.1956ZM79.918 119.685C84.3856 119.685 88.3847 116.078 88.3847 111.53C88.3847 106.902 84.4659 103.372 79.918 103.372C75.2898 103.372 71.4447 106.979 71.4447 111.53C71.4447 116.001 75.3668 119.685 79.918 119.685Z" fill="#FCD34D"/>
    </svg>
    `,
    SecondTittle: '密碼更新失敗',
    ThirdTittle: '請再試一次',
    ButtonText: '確認',
    allowOutsideClick: true,
    function: () => {}
});

</script>

<template>
    <Navbar_V1 />
    <div class="container">
        <div class="side-bar">
            <div class="side-bar-top">
                <div v-if="photoStatus === 'default'" class="profile-pic default">
                    <img src="../assets/images/login/img_userprofile_default.svg">
                </div>
                <div v-else-if="photoStatus === 'nophoto'" class="profile-pic default">
                    <img src="../assets/images/login/img_userprofile_default.svg">
                </div>
                <div v-else-if="photoStatus === 'uploaded'" class="profile-pic uploaded">
                    <img :src="photoUrl" alt="用戶照片" />
                </div>
                <div class="point-group">
                    <p class="caption txt-neutral-400">目前積分</p>
                    <div class="title1 bold">{{ userPoints }}</div>
                </div>
            </div>
            <div class="side-bar-bottom">
                <div class="menu">
                <div
                  v-for="(item, index) in menuItems" 
                  :key="index"
                >
                    <div 
                        v-if="item.id === 'changePassward' ? CheckUserCanEditPWD : true"
                        class="menu-item"
                        :class="{ active: activeMenuItem === item.id }"
                        @click="handleMenuClick(item.id)"
                    >
                        {{ item.text }}<SubwayRightIcon/>
                    </div>
                </div>
                    <button class="btn_white small" @click="handleLogout">登出</button>
                </div>
                <div class="menu_mobile">
                    <div class="select-group">
                        <div class="select-wrapper">
                            <select class="select-field" @change="handleMobileMenuChange($event)">
                                <template v-for="(item, index) in menuItems" :key="index">
                                    <option v-if="item.id !== 'changePassward' || CheckUserCanEditPWD" :value="item.id">
                                    {{ item.text }}
                                    </option>
                                </template>
                            </select>
                            <span class="select-arrow"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 會員資料 -->
        <div class="container-right" id="userInfo" :style="{ display: activeMenuItem === 'userInfo' ? 'block' : 'none' }">
            <div class="title1 bold">會員資料</div>
            <div class="content">
                <div v-if="photoStatus === 'default'" class="profile-pic default">
                    <img src="../assets/images/login/img_userprofile_default.svg">
                </div>
                <div v-else-if="photoStatus === 'nophoto'" class="profile-pic nophoto" @click="triggerFileUpload">
                    <AddIcon/>上傳照片
                </div>
                <div v-else-if="photoStatus === 'uploaded'" class="profile-pic uploaded">
                    <img :src="photoUrl" alt="用戶照片" />
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
                <div class="form-group">
                    <label class="input-label">暱稱</label>
                    <div class="input-wrapper">
                        <input 
                            type="text" 
                            class="input-field" 
                            v-model="userName" 
                            placeholder="請輸入你的名稱"
                            autocomplete="off"
                        >
                    </div>
                </div>
                <div class="form-group disabled">
                    <label class="input-label">會員信箱</label>
                    <div class="input-wrapper">
                        <input type="text" class="input-field" v-model="userEmail" disabled>
                    </div>
                </div>
                <button class="btn_filled" @click="showUpdateAlert">更新資料</button>
            </div>
        </div>
        
        <!-- 修改密碼 -->
        <div class="container-right" id="changePassward" :style="{ display: activeMenuItem === 'changePassward' ? 'block' : 'none' }">
            <div class="title1 bold">修改密碼</div>
            <div class="content">   
                <div class="form-group" :class="{ error: !passwordForm.isNewPasswordValid }">
                    <label class="input-label required">設定新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input 
                            :type="passwordVisible.newPassword ? 'text' : 'password'" 
                            class="input-field" 
                            placeholder="請輸入新密碼"
                            v-model="passwordForm.newPassword"
                            autocomplete="off"
                        >
                        <EyeoffIcon 
                            class="input-icon" 
                            v-if="!passwordVisible.newPassword" 
                            @click="togglePasswordVisibility('newPassword')"
                        />
                        <EyeIcon 
                            class="input-icon" 
                            v-if="passwordVisible.newPassword" 
                            @click="togglePasswordVisibility('newPassword')"
                        />
                        <!-- 密碼為空值時錯誤錯誤 -->
                        <span class="error-message" v-if="!passwordForm.isNewPasswordValid && passwordForm.passwordErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordErrorMsg }}
                        </span>
                        <!-- 密碼小於 6 位字數時錯誤訊息 -->
                        <span class="error-message" v-if="!passwordForm.isNewPasswordValid && passwordForm.passwordLengthErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordLengthErrorMsg }}
                        </span>
                        <!-- 密碼格式不符時錯誤訊息 -->
                        <span class="error-message" v-if="!passwordForm.isNewPasswordValid && passwordForm.passwordFormatErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordFormatErrorMsg }}
                        </span>
                    </div>
                </div>
                <div class="form-group" :class="{ error: !passwordForm.isConfirmPasswordValid }">
                    <label class="input-label required">再次輸入新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input 
                            :type="passwordVisible.confirmPassword ? 'text' : 'password'" 
                            class="input-field" 
                            placeholder="再次確認新密碼"
                            v-model="passwordForm.confirmPassword"
                            autocomplete="off"
                        >
                        <EyeoffIcon 
                            class="input-icon" 
                            v-if="!passwordVisible.confirmPassword" 
                            @click="togglePasswordVisibility('confirmPassword')"
                        />
                        <EyeIcon 
                            class="input-icon" 
                            v-if="passwordVisible.confirmPassword" 
                            @click="togglePasswordVisibility('confirmPassword')"
                        />
                        <!-- 密碼為空值時錯誤錯誤 -->
                        <span class="error-message" v-if="!passwordForm.isConfirmPasswordValid && passwordForm.passwordErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordErrorMsg }}
                        </span>
                        <!-- 密碼小於 6 位字數時錯誤訊息 -->
                        <span class="error-message" v-if="!passwordForm.isConfirmPasswordValid && passwordForm.passwordLengthErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordLengthErrorMsg }}
                        </span>
                        <!-- 密碼格式不符時錯誤訊息 -->
                        <span class="error-message" v-if="!passwordForm.isConfirmPasswordValid && passwordForm.passwordFormatErrorMsg && !passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordFormatErrorMsg }}
                        </span>
                        <!-- 密碼不符的錯誤訊息 -->
                        <span class="error-message" v-if="passwordForm.passwordMatchErrorMsg">
                            {{ passwordForm.passwordMatchErrorMsg }}
                        </span>
                    </div>
                </div>
                <button class="btn_filled" @click="handlePasswordSubmit">更新密碼</button>
            </div>
        </div>

        <!-- 商品收藏 -->
        <!-- <div class="container-right" id="productCollection" :style="{ display: activeMenuItem === 'productCollection' ? 'block' : 'none' }">
            <div class="title1 bold">商品收藏</div>
            <div class="content">   
                <div class="product-list">  
                    <div class="product">
                        <div class="img-product-photo"></div>
                        <div class="btn-group">
                            <button class="btn_outline small">查看詳情</button>
                            <div class="cart-btn"><HearFillIcon/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>   
    
    <Footer />
    
    <!-- 彈窗 -->
    <Alert_web_M ref="alertM" :alertInfo="deletePhotoalertInfo" />
    <Alert_web_M ref="alertSuccess" :alertInfo="updateInfoSuccess" />
    <Alert_web_M ref="alertFailed" :alertInfo="updateInfoFailed"/>
    <Alert_web_M ref="passwordSuccessAlert" :alertInfo="passwordUpdateSuccess" />
    <Alert_web_M ref="passwordFailedAlert" :alertInfo="passwordUpdateFailed" />
    <alert_logout_successful ref="alert_logout_successful_ref" />
</template>

<style lang="scss" scoped>
@use '../assets/sass/page/userprofile.scss';
</style>