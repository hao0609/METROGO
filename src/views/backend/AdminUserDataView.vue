<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-userdata.scss";
</style>

<style lang="scss">
 .admin-photo-alert {
  h2 {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: 500;
    font-size: 32px;
  }
 }
</style>

<script setup>
import BackIcon from "@/components/icons/IconBack.vue";
import AdminEyeIcon from "@/components/icons/IconAdminEye.vue";
import PhotoIcon from "@/components/icons/IconPhoto.vue";
import { ref, onMounted, inject, computed} from 'vue';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';
const router = useRouter();
// import emitter from '../../eventbus/eventbus.js';
import GetUserData from '../../js/view/Backend/checkUserDB_UserData.js'
import handlePhotoReview from '../../js/view/Backend/photoReview.js';
import defaultAvatar from '@/assets/images/login/img_userprofile_default.svg'

// const emitter = inject('emitter');   // Inject `emitter`

// 路線名稱對應表 - 移到全域以便各函數使用
const routeMapping = {
  棕線: '文湖線',
  紅線: '淡水信義線',
  綠線: '松山新店線',
  黃線: '中和新蘆線',
  藍線: '板南線',
};

onMounted(() => {
  // 不使用 eventbus，會有組件掛載時間差問題
  // emitter.once('viewUser', ()=> {alert()});

  // 改用 sessionStorage
  const userID = sessionStorage.getItem('selectedUserID')
  // console.log(userID);
  getUserData(userID);
});

const userData = ref({
  id: '',
  name: '',
  email: '',
  avatar: '',
  MissionGeneralData: {},
  specialMissionData: {}
})

const photoURL = ref('')
const tableData = ref([])
const specialItems = ref([])
const photoDetail = ref([])
const currentSelectedRoute = ref(null)
const showPhotoDetail = ref(false)
const message = ref('');
const messageType = ref(''); // 新增，用於控制訊息類型
const showMessage = ref(false);

const getUserData = async(userID) => {
  console.log(`目前點選的會員資料的會員ID是: ${userID}`);
  const data =  await GetUserData(userID)

  //console.log('測試',data);
  
  userData.value.id = data.會員編號;
  userData.value.name = data.會員暱稱;
  userData.value.email = data.電子郵件;
  userData.value.avatar = data.會員頭像;
  userData.value.specialMissionData = data.特殊任務遊戲進度;
  
  if (userData.value.avatar == "") {
    photoURL.value = defaultAvatar
  }else{
    photoURL.value = userData.value.avatar
  }
  
  // userData.value.avatar = data.avatar;
  const MissionGeneralData = data.一般任務遊戲進度

  console.log(MissionGeneralData);
  // 表格資料整理

  // 第一步 Object.entries 將 object 透過鍵值轉成 陣列
  // 第二步 使用 flatMap() 來進行陣列轉換並展平結果
  // 第三步 使用 Object.keys(stations) 將每線的車站資料轉成陣列
  // 第四布 使用 map 將目前處理的路線名稱以及陣列中的站名轉換成物件

  tableData.value =  
    Object.entries(MissionGeneralData).flatMap(([routeName, stations])=>
      Object.entries(stations).map(([stationName, info]) => ({
          route: routeMapping[routeName],    // 顯示對應的路線名稱
          station: stationName,  
          checkedIn: info.打卡狀態,
          checkedInTime: info.打卡時間 === '' ? '尚未打卡' : info.打卡時間 // 判斷打卡時間
      }))
    );
  
  // 處理特殊任務資料
  specialItems.value = Object.entries(userData.value.specialMissionData || {}).map(([routeName, routeData], index) => {
    // 計算總站點數量 (排除問答狀態)
    const totalStations = Object.keys(routeData).filter(key => key !== '問答狀態').length;
    
    // 只計算照片狀態為"審核通過"的站點數量
    const completedPhotos = Object.entries(routeData)
      .filter(([key, value]) => 
        key !== '問答狀態' && value.照片狀態 === '審核通過'
      ).length;
      
    // 計算審核中的照片數量
    const pendingPhotos = Object.entries(routeData)
      .filter(([key, value]) => 
        key !== '問答狀態' && value.照片狀態 === '審核中'
      ).length;

    return {
      id: index + 1,
      route: routeMapping[routeName] || routeName,
      originalRoute: routeName, // 保存原始路線名稱方便查詢
      completephotocount: `${completedPhotos}/${totalStations}`,
      questioncomplete: routeData.問答狀態 ? '已完成' : '未完成',
      pending: pendingPhotos
    };
  });
  console.log("特殊任務資料:", specialItems.value); // 調試用
}

// 查看照片詳情功能
const viewPhotoDetails = (route) => {
  console.log("查看照片詳情:", route);
  currentSelectedRoute.value = route;
  showPhotoDetail.value = true;
  
  console.log("可用的特殊任務資料:", userData.value.specialMissionData ? Object.keys(userData.value.specialMissionData) : "無資料");
  
  // 直接使用顯示名稱查詢，不需要轉換
  if (!userData.value.specialMissionData || !userData.value.specialMissionData[route]) {
    console.error('找不到對應的路線資料:', route);
    photoDetail.value = [];
    return;
  }

  const routeData = userData.value.specialMissionData[route];
  
  // 處理站點照片的資料
  photoDetail.value = Object.entries(routeData)
    .filter(([key]) => key !== '問答狀態')  // 排除問答狀態
    .map(([station, details]) => {
      // 格式化上傳時間
      let formattedTime = '--';
      if (details.上傳時間) {
        // 判斷時間格式是否為 YYYYMMDD_HHMMSS
        if (/^\d{8}_\d{6}$/.test(details.上傳時間)) {
          const timeStr = details.上傳時間;
          const year = timeStr.substring(0, 4);
          const month = timeStr.substring(4, 6);
          const day = timeStr.substring(6, 8);
          const hour = timeStr.substring(9, 11);
          const minute = timeStr.substring(11, 13);
          const second = timeStr.substring(13, 15);
          formattedTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
        } else {
          formattedTime = details.上傳時間;
        }
      }

      return {
        station: station,  // 站點名稱
        condition: details.審核條件 || '請拍照',  // 審核條件
        uploadTime: formattedTime,  // 格式化後的上傳時間
        reviewStatus: details.照片狀態 || '待審核',  // 照片狀態
        previewImage: details.目前照片URL || null,  // 照片URL
        // 僅審核中狀態可以進行審核操作
        canReview: details.照片狀態 === '審核中',
        // 新增預設 Radio 選取狀態
        defaultRadioValue: details.照片狀態 === '審核通過' ? 'pass' : 
                           details.照片狀態 === '審核未通過' ? 'reject' : null
      };
    });
    
  console.log("照片詳情:", photoDetail.value);
}

// 目前點選的頁籤
const activeTab= ref('general');
// 遊戲資料頁籤
const tabs = [
        { id: "general", label: "一般任務" },
        { id: "special", label: "特殊任務" },
        // { id: "achievements", label: "成就" },
]

// 每頁顯示筆數
const itemsPerPage = 10; // 每頁顯示 10 筆資料

// 目前頁數
const currentPage = ref(1);

// 計算總頁數
const totalPages = computed(() => 
  Math.ceil(tableData.value.length / itemsPerPage)
);

// 取得當前頁面的資料
const pagInStations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return tableData.value.slice(start, start + itemsPerPage);
});

// 翻頁功能
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

    const goBack = () => {
      router.push("/admin/user");
    }

// 顯示照片預覽彈窗
const showPhotoPreview = (item) => {  
  if (!item.previewImage) {
    console.error('無法顯示預覽圖片：未找到圖片URL');
    return;
  }
  
  // 使用 Sweetalert 直接顯示彈窗
  Swal.fire({
    title: item.station,
    text: item.condition,  
    imageUrl: item.previewImage, // 使用目前照片URL
    imageWidth: 440,
    imageHeight: 320,
    imageAlt: "照片預覽",
    customClass: {
        popup: 'admin-photo-alert',
        confirmButton: 'btn_filled'
      }
  });
};

// 處理審核點擊事件
const handleReviewClick = async (item, result) => {

  console.log('審核項目完整資訊:', item);
  console.log('當前路線:', currentSelectedRoute.value);
  console.log('用戶ID:', userData.value.id);

  console.log('審核參數:', {
    userId: userData.value.id,
    routeName: currentSelectedRoute.value,
    stationName: item.station,
    result
  });

  // 只有審核中的照片可以審核
  if (!item || item.reviewStatus !== '審核中') {
    console.warn('不符合審核條件的項目:', item);
    return;
  }
  
  try {
    // 更詳細的參數驗證
    if (!item || !currentSelectedRoute.value || !userData.value.id) {
      console.warn('審核參數不完整', { 
        item, 
        route: currentSelectedRoute.value, 
        userId: userData.value.id 
      });
      return;
    }

    // 呼叫審核處理函數
    const response = await handlePhotoReview(
      userData.value.id,       // 用戶ID
      currentSelectedRoute.value, // 路線名稱
      item.station,            // 站點名稱
      result                   // 審核結果: "通過" 或 "未通過"
    );

    if (response.success) {
      // 審核成功，更新本地資料狀態
      item.reviewStatus = result === "通過" ? "審核通過" : "審核未通過";
      item.canReview = false;  // 審核後不能再審核
      
      // 更新特殊任務進度
      const routeIndex = specialItems.value.findIndex(
        route => route.originalRoute === currentSelectedRoute.value
      );
      
      if (routeIndex !== -1) {
        const updatedCompletedPhotos = photoDetail.value.filter(
          photo => photo.reviewStatus === "審核通過"
        ).length;
        
        const totalStations = photoDetail.value.length;
        specialItems.value[routeIndex].completephotocount = 
          `${updatedCompletedPhotos}/${totalStations}`;
      }
      
      // 顯示成功訊息
      if (result === "通過") {
        message.value = `照片審核通過，已增加 ${response.points} 積分`;
        messageType.value = 'success';
      } else {
        message.value = '照片審核未通過';
        messageType.value = 'warning';
      }
      showMessage.value = true;
      setTimeout(() => {
        showMessage.value = false;
      }, 3000);
    } else {
      // 審核失敗
      message.value = '無法更新狀態，請稍後再試';
      messageType.value = 'error';
      showMessage.value = true;
      setTimeout(() => {
        showMessage.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error('審核處理錯誤:', error);
    
    // 系統錯誤提示
    message.value = '處理審核過程中發生錯誤';
    messageType.value = 'error';
    showMessage.value = true;
    setTimeout(() => {
      showMessage.value = false;
    }, 3000);
  }
};
</script>

<template>
  <div>
    <!-- 返回按鈕 -->
    <div class="return-btn title2 bold" @click="goBack"><BackIcon /> 返回</div>
    <h1 class="admin-title">會員資料</h1>
    <div class="user-profile">
      <p class="title2 bold">基本資料</p>
      <div class="profile-card">
        <img :src="photoURL" alt="會員圖像" class="avatar" />
        <div class="info">
          <div class="info-row">
            <p class="info-title bold">會員 ID</p>
            <span>{{ userData.id }}</span>
          </div>
          <div class="info-row">
            <p class="info-title bold">暱稱</p>
            <span>{{ userData.name }}</span>
          </div>
          <div class="info-row">
            <p class="info-title bold">電子郵件</p>
            <span>{{ userData.email }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="admin-form">
      <div class="tabs-container">
        <div class="tabs">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="tab-content">
          <!-- 一般任務頁籤 -->
          <div v-if="activeTab === 'general'">
            <!-- <div class="filter-group">
              <div class="select-wrapper small">
                <select class="select-field">
                  <option value="all" selected>路線</option>
                  <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
              </div>
              <div class="input-wrapper small">
                <input type="text" class="input-field" placeholder="捷運站名" />
              </div>
              <button class="btn_filled small">篩選</button>
            </div>-->
            <div class="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>路線</th>
                    <th>站名</th>
                    <th>打卡狀態</th>
                    <th>打卡時間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in pagInStations"
                    :key="index"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>{{ item.route }}</td>
                    <td>{{ item.station }}</td>
                    <td class="td-center">
                      <div class="CheckedinStatus_Box">
                          <div id="NotCheckedIn" class="CheckedInStatus" 
                          :class="{ 'not-checked-in': !item.checkedIn  }">
                            未打卡
                          </div>
                          <div id="CheckedIn" class="CheckedInStatus" 
                          :class="{ 'checked-in': item.checkedIn }">
                            已打卡
                          </div>
                      </div>
                    </td>
                    <td>{{ item.checkedInTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 分頁按鈕 -->
            <div class="pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
                <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"  />
                </svg>
              </button>
              <span class="title2 bold">第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁</span>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
                <svg class="pagination-btn-svg" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"  />
                </svg>            
              </button>
            </div>
          </div>
          <!-- 特殊任務頁籤 -->
          <div v-if="activeTab === 'special'" style="min-height: 680px;">
            <div class="admin-table special-mission">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>路線</th>
                    <th>照片完成進度</th>
                    <th>問答狀態</th>
                    <th>待審核照片</th>
                    <th>查看照片詳情</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(special, index) in specialItems"
                    :key="index"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ special.id }}</td>
                    <td>{{ special.route }}</td>
                    <td>{{ special.completephotocount }}</td>
                    <td>{{ special.questioncomplete }}</td>
                    <td>{{ special.pending }}</td>
                    <td class="action-buttons">
                      <button 
                        class="table-btn view-btn" 
                        @click="viewPhotoDetails(special.originalRoute)"
                      >
                        <AdminEyeIcon />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 照片詳情 -->
            <div v-if="showPhotoDetail" class="admin-table photo-detail-table">
              <div class="photo-detail-title">
                <span class="title2 bold route-name">{{ currentSelectedRoute }}</span>
                <span class="title2 bold">/照片詳情</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>捷運站點</th>
                    <th>審核條件</th>
                    <th>上傳時間</th>
                    <th>照片狀態</th>
                    <th>審核結果</th>
                    <th>預覽照片</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in photoDetail"
                    :key="index"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.station }}</td>
                    <td>{{ item.condition }}</td>
                    <td>{{ item.uploadTime }}</td>
                    <td>{{ item.reviewStatus }}</td>
                    <td class="td-center">
                      <div class="radio-group">
                        <label class="radio-container" :class="{ 'disabled': !item.canReview }">
                          <input 
                            type="radio" 
                            :name="`option_${index}`" 
                            class="radio-input" 
                            value="pass"
                            :disabled="!item.canReview"
                            @change="handleReviewClick(item, '通過')" 
                            :checked="item.defaultRadioValue === 'pass'"
                          />
                          <span class="radio-custom"></span>
                          <span class="radio-label">通過</span>
                        </label>
                        <label class="radio-container" :class="{ 'disabled': !item.canReview }">
                          <input 
                            type="radio" 
                            :name="`option_${index}`" 
                            class="radio-input" 
                            value="reject"
                            :disabled="!item.canReview"
                            @change="handleReviewClick(item, '未通過')" 
                            :checked="item.defaultRadioValue === 'reject'"
                          />
                          <span class="radio-custom"></span>
                          <span class="radio-label">未通過</span>
                        </label>
                      </div>
                    </td>
                    <td class="action-buttons">
                    <!-- 審核中的照片可以預覽 -->
                    <button 
                      v-if="item.previewImage" 
                      class="table-btn view-btn"
                      @click="showPhotoPreview(item)"
                    >
                      <PhotoIcon />
                    </button>
                    <!-- 沒有照片URL的情況 -->
                    <span v-else>--</span>
                  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>