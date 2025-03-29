<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-userdata.scss";


.td-center{
  display: flex;
  justify-content: center;
}

</style>

<script setup>
import BackIcon from "@/components/icons/IconBack.vue";
import AdminEyeIcon from "@/components/icons/IconAdminEye.vue";
import { ref, onMounted, inject,computed} from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
// import emitter from '../../eventbus/eventbus.js';
import GetUserData from '../../js/view/Backend/checkUserDB_UserData.js'

// const emitter = inject('emitter');   // Inject `emitter`

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
})

const tableData =  ref([])

const getUserData = async(userID) => {
  console.log(`目前點選的會員資料的會員ID是: ${userID}`);
  const data =  await GetUserData(userID)

  // console.log(data);

  userData.value.id = data.會員編號;
  
  userData.value.name = data.會員姓名;
  userData.value.email = data.電子郵件;
  // userData.value.avatar = data.avatar;
  const MissionGeneralData = data.一般任務遊戲進度

  console.log(MissionGeneralData);
  
  
  // 表格資料整理

  // 第一步 Object.entries 將 object 透過鍵值轉成 陣列
  // 第二步 使用 flatMap() 來進行陣列轉換並展平結果
  // 第三步 使用 Object.keys(stations) 將每線的車站資料轉成陣列
  // 第四布 使用 map 將目前處理的路線名稱以及陣列中的站名轉換成物件

  // 路線名稱調整變更表
  const routeMapping = {
    棕線: '文湖線',
    紅線: '淡水信義線',
    綠線: '松山新店線',
    黃線: '中和新蘆線',
    藍線: '板南線',
  };


  tableData.value =  
  
    Object.entries(MissionGeneralData).flatMap(([routeName, stations])=>
      Object.entries(stations).map(([stationName, info]) => ({
          route: routeMapping[routeName],    // 顯示對應的路線名稱
          station: stationName,  
          checkedIn: info.打卡狀態,
          checkedInTime: info.打卡時間 === '' ? '尚未打卡' : info.打卡時間 // 判斷打卡時間
                    
      }))
      
    )
  
  
  // console.log(tabledata.value);  
  
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

  const specialItems = [
        {
          id: 1,
          route: "淡水信義線",
          journeyTravel: "半日遊",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
          selected: false,
        },
        {
          id: 2,
          route: "淡水信義線",
          journeyTravel: "半日遊",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
          selected: false,
        },
        {
          id: 3,
          route: "板南線",
          journeyTravel: "一日遊",
          chapterStatus: "已集章",
          rewardStatus: "未領取",
          selected: false,
        },
      ]
  const achievementsItems= [
        {
          id: 1,
          category: "一般任務",
          name: "時光旅人",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 2,
          category: "一般任務",
          name: "文湖線",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 3,
          category: "特殊任務",
          name: "全制霸",
          chapterStatus: "已集章",
          rewardStatus: "未領取",
        },
      ]

    const goBack = () => {
      router.push("/admin/user");
    }

// export default {
//   name: "AdminUserDataView",
//   components: {
//     AdminEyeIcon,
//     BackIcon,
//     // EditIcon,
//     // DeleteIcon,
//     // AddIcon,
//   },
//   methods: {
//     goBack() {
//       this.$router.push("/admin/user");
//     },
//   },
//   data() {
//     return {
//       activeTab: "general",
//       tabs: [
//         { id: "general", label: "一般任務" },
//         { id: "special", label: "特殊任務" },
//         // { id: "achievements", label: "成就" },
//       ],
//       user: {
//         id: "TID201111",
//         name: "王測試",
//         email: "test@gmail.com",
//         avatar: "http://127.0.0.1:5500/img/pic-featured_1.svg", // 預設會員圖像
//       },
//       generalItems: [
//         {
//           id: 1,
//           route: "淡水信義線",
//           station: "台北車站",
//           punchStatus: "已打卡",
//           punchTime: "2024-11-20 22:56:05",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//         },
//         {
//           id: 2,
//           route: "淡水信義線",
//           station: "臺大醫院站",
//           punchStatus: "已打卡",
//           punchTime: "2024-11-20 22:56:05",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//         },
//         {
//           id: 3,
//           route: "板南線",
//           station: "忠孝新生站",
//           punchStatus: "已打卡",
//           punchTime: "2024-11-20 22:56:05",
//           chapterStatus: "已集章",
//           rewardStatus: "未領取",
//         },
//       ],
//       specialItems: [
//         {
//           id: 1,
//           route: "淡水信義線",
//           journeyTravel: "半日遊",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//           selected: false,
//         },
//         {
//           id: 2,
//           route: "淡水信義線",
//           journeyTravel: "半日遊",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//           selected: false,
//         },
//         {
//           id: 3,
//           route: "板南線",
//           journeyTravel: "一日遊",
//           chapterStatus: "已集章",
//           rewardStatus: "未領取",
//           selected: false,
//         },
//       ],
//       achievementsItems: [
//         {
//           id: 1,
//           category: "一般任務",
//           name: "時光旅人",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//         },
//         {
//           id: 2,
//           category: "一般任務",
//           name: "文湖線",
//           chapterStatus: "已集章",
//           rewardStatus: "已領取",
//         },
//         {
//           id: 3,
//           category: "特殊任務",
//           name: "全制霸",
//           chapterStatus: "已集章",
//           rewardStatus: "未領取",
//         },
//       ],
//     };
//   },
// };
</script>





<template>
  <div>
    <!-- 返回按鈕 -->
    <div class="return-btn title2 bold" @click="goBack"><BackIcon /> 返回</div>
    <h1 class="admin-title">會員資料</h1>
    <div class="user-profile">
      <p class="title2 bold">基本資料</p>
      <div class="profile-card">
        <img src="" alt="會員圖像" class="avatar" />
        <div class="info">
          <div class="info-row">
            <p class="info-title bold">會員 ID</p>
            <span>{{ userData.id }}</span>
          </div>
          <div class="info-row">
            <p class="info-title bold">姓名</p>
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
            <div class="filter-group">
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
            </div>
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
          </div>
          <!-- 特殊任務頁籤 -->
          <div v-if="activeTab === 'special'">
            <div class="filter-group">
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
            </div>
            <div class="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>路線</th>
                    <th>行程</th>
                    <th>集章狀態</th>
                    <th>獎勵領取</th>
                    <th>查看</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(special, index) in specialItems"
                    :key="special.id"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ special.id }}</td>
                    <td>{{ special.route }}</td>
                    <td>{{ special.journeyTravel }}</td>
                    <td>{{ special.chapterStatus }}</td>
                    <td>{{ special.rewardStatus }}</td>
                    <td class="action-buttons">
                      <button class="table-btn view-btn">
                        <AdminEyeIcon />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      </div>
    </div>
  </div>

</template>


