<template>
    <div>
        <h1 class="admin-title">照片管理</h1>  
        <div class="filter-group">
            <div class="input-wrapper small">
              <input type="text" class="input-field" placeholder="會員ID">
            </div>
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>路線</option>
                    <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
            </div>
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>狀態</option>
                    <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
            </div>
            <button class="btn_filled small">篩選</button>
  
            <div class="auto-left" style="display: flex; gap: 4px;">
              <!-- <button class="btn_filled small" disabled>審核不通過</button> -->
              <button class="btn_filled small" disabled>審核通過</button>
            </div>
        </div>
      
      
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" @change="toggleAllSelection"></th>
                <th>No.</th>
                <th>會員ID</th>
                <th>上傳時間</th>
                <th>圖片</th>
                <th>路線</th>
                <th>審核條件</th>
                <th>狀態</th>
                <th>查看</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(photo, index) in photoItems"
                :key="photo.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td><input type="checkbox" v-model="photo.selected"></td>
                <td>{{ photo.id }}</td>
                <td>{{ photo.userId }}</td>
                <td>{{ photo.uploadTime }}</td>
                <td>
                  <div class="photo-preview">
                    <img :src="photo.imageUrl" alt="預覽圖">
                  </div>
                </td>
                <td>{{ photo.route }}</td>
                <td>{{ photo.reviewCriteria }}</td>
                <td>
                  <span :class="['status-badge', photo.status]">
                    {{ photo.statusText }}
                  </span>
                </td>
                <td class="action-buttons">
                  <button class="table-btn view-btn">
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
    name: "AdminPhotoView",
    components: {
      BackIcon,
      AdminEyeIcon,
    },
    data() {
      return {
        photoItems: [
          { 
            id: 1,
            userId: 'TID201111',
            uploadTime: '2024-11-11 22:22:22',
            imageUrl: 'https://fakeimg.pl/60x60/',
            route: '淡水信義線',
            reviewCriteria: '請拍攝「關渡宮」整體',
            status: 'pending',
            statusText: '待審核',
            selected: false
          },
          { 
            id: 2,
            userId: 'TID201111',
            uploadTime: '2024-11-11 22:22:22',
            imageUrl: 'https://fakeimg.pl/60x60/',
            route: '淡水信義線',
            reviewCriteria: '請拍攝「XXX」',
            status: 'approved',
            statusText: '已通過',
            selected: false
          },
          { 
            id: 3,
            userId: 'TID201111',
            uploadTime: '2024-11-11 22:22:22',
            imageUrl: 'https://fakeimg.pl/60x60/',
            route: '淡水信義線',
            reviewCriteria: '請拍攝「XXX」',
            status: 'rejected',
            statusText: '不通過',
            selected: false
          }
        ]
      }
    },
  };
  </script>
  