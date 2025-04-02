<style lang="scss" scoped>
  @use "@/assets/sass/page/backend/admin-common.scss";
  @import "@/assets/sass/base/color.scss";
  @import "@/assets/sass/base/font.scss";
</style>
  
<script setup> 
  import BackIcon from '@/components/icons/IconBack.vue';
  import AdminEyeIcon from '@/components/icons/IconAdminEye.vue';
  import IconAdminDelete from '@/components/icons/IconAdminDelete.vue';
  import { onMounted, ref,computed ,inject,nextTick} from 'vue';

  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  import GetAllUserData from '../../js/view/Backend/getAllUserDB_Data.js';

  import emitter  from '../../eventbus/eventbus.js';

  import Alert_backend_DeleteUser from '../../components/Alert_backend_DeleteUser.vue';
  const Alert_backend_DeleteUser_ref = ref(null);
  

  const userID = ref({
    ThirdTittle: ''
  });

  const deleteUserAlert = (userIDNum) =>{

    userID.value.ThirdTittle = userIDNum
    console.log(userID.value.ThirdTittle);
    

    Alert_backend_DeleteUser_ref.value.showAlert();
  }
  

  // const test = () =>{
  //   alert('test');
  // }


  // 宣告會員資料陣列
  const userItems = ref([]);

  // 目前頁數
  const currentPage = ref(1);

  // 每頁顯示筆數
  const itemsPerPage = 10; // 每頁顯示 10 筆資料

  // 搜尋文字
  const searchQuery = ref('');

  // 搜尋結果
  const searchResults = ref([]);

  // 取得所有會員的資料並處理成陣列資料
  const getUserData = async() =>{

    try {
    const userDataObj = await GetAllUserData();
    // console.log(userDataObj);

    userItems.value = Object.values(userDataObj);
    // console.log(userItems.value);

    // 排序：註冊日期由最新到最舊
    userItems.value.sort((a, b) => {
      return new Date(b.會員註冊日期) - new Date(a.會員註冊日期);
    });
    
    searchResults.value = [...userItems.value]; // 預設顯示排序後的資料

    
  } catch (error) {
    console.error('Failed to GetAllUserdata:', error.message);
  }

  }


  // 計算總頁數
  const totalPages = computed(() => 
    Math.ceil(searchResults.value.length / itemsPerPage)
  );

  // 取得當前頁面的資料
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return searchResults.value.slice(start, start + itemsPerPage);
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


  // 搜尋功能 (按鈕觸發)
  const performSearch = () => {
  const query = searchQuery.value.trim().toLowerCase();
  console.log(query);
  
  
  if (!query) {
    searchResults.value = userItems.value; // 如果沒有輸入，顯示全部資料
    return;
  }

  searchResults.value = userItems.value.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(query)
    )
  );
    currentPage.value = 1; // 重置到第1頁
  };

  // 重置表格搜尋 
  const resetSearch = () => {
    searchQuery.value = '';
    searchResults.value = userItems.value;
    currentPage.value = 1;
  };

  onMounted(() => {
    getUserData()
    }
  )

  // const emitter = inject('emitter'); // Inject `emitter`

 /**
 * 把目前選取的該會員資料的會員ID 透過 eventBus 丟給 AdminUserDataView
 * @param {string} userID - 目前點選會員資料的會員ID
 **/
  const viewUser = async(userID) => {
    // viewUser: 自定義事件名稱 / userID: 會員ID
    console.log(userID);

    // 不使用 eventbus，會有組件掛載時間差問題
    // emitter.emit('viewUser', userID);

    // 改用 sessionStorage
    sessionStorage.setItem('selectedUserID', userID);

    router.push('/admin/user-data');
   
  }


  // 會員註冊日期 日期格式改為 YYYY/MM/DD
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
    



</script>






<template>
    <div>
        <h1 class="admin-title">會員管理</h1>  
        <div class="filter-group">
            <div class="auto-left" style="display: flex; gap: 4px;">
              <div class="input-wrapper small">
                <input type="text" class="input-field" placeholder="搜尋" v-model="searchQuery">
              </div>
              <button class="btn_filled small" @click="performSearch">查詢</button>
              <button class="btn_filled small" @click="resetSearch">重置</button>
            </div>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>會員ID</th>
                <th>暱稱</th>
                <th>電子郵件</th>
                <th>註冊時間</th>
                <th>點數</th>
                <th>查看</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in paginatedUsers"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ user.會員編號 }}</td>
                <td>{{ user.會員暱稱 }}</td>
                <td>{{ user.電子郵件 }}</td>
                <td>{{ formatDate(user.會員註冊日期) }}</td>
                <td>{{ user.點數積分 }}</td>
                <td class="action-buttons">
                  <button class="table-btn edit-btn" @click="viewUser(user.會員編號)">
                    <AdminEyeIcon/>
                  </button>
                </td>
                <td class="action-buttons">
                  <button class="table-btn delete-btn" @click="deleteUserAlert(user.會員編號)">
                    <IconAdminDelete/>
                  </button>
                </td>
              </tr>
              <tr v-if="paginatedUsers.length === 0">
                <td colspan="7">找不到符合條件的資料</td>
              </tr>
            </tbody>
          </table>


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

      <Alert_backend_DeleteUser ref="Alert_backend_DeleteUser_ref" :userID="userID" @refresh-data="getUserData"/>
  </template>



  
  
  