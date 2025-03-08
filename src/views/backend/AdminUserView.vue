<template>
    <div>
        <h1 class="admin-title">會員管理</h1>  
        <div class="filter-group">
            <div class="auto-left" style="display: flex; gap: 4px;">
              <div class="input-wrapper small">
                <input type="text" class="input-field" placeholder="搜尋">
              </div>
              <button class="btn_filled small">查詢</button>
            </div>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>會員ID</th>
                <th>姓名</th>
                <th>電子郵件</th>
                <th>註冊時間</th>
                <th>點數</th>
                <th>查看</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in userItems"
                :key="user.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ user.id }}</td>
                <td>{{ user.userid }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.mail }}</td>
                <td>{{ user.createTime }}</td>
                <td>{{ user.score }}</td>
                <td class="action-buttons">
                  <button class="table-btn edit-btn">
                    <AdminEyeIcon/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    
  
        
        
      
  </template>
  
  <style lang="scss" scoped>
  @use "@/assets/sass/page/backend/admin-common.scss";
  </style>
  
  <script>
  import BackIcon from '@/components/icons/IconBack.vue';
  import AdminEyeIcon from '@/components/icons/IconAdminEye.vue';
  
  export default {
    name: "AdminUserView",
    components: {
      BackIcon,
      AdminEyeIcon,
    },
    data() {
      return {
        userItems: [
          { 
            id: 1,
            userid: 'TID201111',
            name: '測試',
            mail: 'test@gmail.com',
            createTime: '2024-11-20 22:56:05',
            score: '100',
          },
          { 
            id: 2,
            userid: 'TID201111',
            name: '測試',
            mail: 'test@gmail.com',
            createTime: '2024-11-20 22:56:05',
            score: '100',
          }
        ]
      }
    },
  };
  </script>
  
  