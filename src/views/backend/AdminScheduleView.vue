<template>
    <div style="display: none;">
        <h1 class="admin-title">行程管理</h1>  
        <div class="filter-group">
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>分類</option>
                    <option value="">半日遊</option>
                    <option value="">一日遊</option>
                    <option value="">小編精選</option>
                    <option value="">小編精選</option>
                </select>
                <span class="select-arrow"></span>
            </div>
            <button class="btn_filled small">篩選</button>
            <button class="btn_filled small with-icon auto-left"><AddIcon/>新增</button>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>類型</th>
                <th>路線</th>
                <th>項目</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(schedule, index) in scheduleItems"
                :key="schedule.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ schedule.id }}</td>
                <td>{{ schedule.type }}</td>
                <td>{{ schedule.route }}</td>
                <td>{{ schedule.item }}</td>
                <td class="action-buttons">
                  <button class="table-btn edit-btn">
                    <EditIcon/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <!-- 返回按鈕 -->
        <div class="return-btn title2 bold" @click="goBack"><BackIcon/> 返回 </div>
        <h1 class="admin-title">行程管理</h1>
      
        <div class="admin-form gap-32 pr-100">
  
          <div class="select-group w-s">
            <label class="select-label">分類</label>
            <div class="select-wrapper">
              <select class="select-field">
                <option value="option1">小編精選</option>
                <option value="option2">半日遊、一日遊</option>
              </select>
              <span class="select-arrow"></span>
              <!-- <span class="error-message">錯誤訊息</span> -->
            </div>
          </div>
  
          <div class="select-group w-s">
            <label class="select-label">路線</label>
            <div class="select-wrapper">
              <select class="select-field">
                <option value="">路線</option>
              </select>
              <span class="select-arrow"></span>
            </div>
          </div>
  
          <hr class="divider">
  
          <div class="select-group w-s">
            <label class="select-label">類型</label>
            <div class="select-wrapper">
              <select class="select-field">
                <option value="">類型(精選店家 & 精選活動)</option>
              </select>
              <span class="select-arrow"></span>
            </div>
          </div>
  
          <!-- 雙日期選擇 -->
          <div class="form-group w-s">
            <label class="select-label" for="dateRange">起訖時間</label>
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
  
        
          <div class="form-group">
            <label class="input-label">項目名稱</label>
            <div class="input-wrapper">
            <input type="text" class="input-field" placeholder="Placeholder">
            </div>
          </div>
  
          <div class="form-group">
          <label class="input-label">項目圖片</label>
          <div class="input-wrapper with-upload-button ">
            <input type="text" class="input-field" placeholder="Placeholder">
            <button class="upload-button">上傳按鈕</button>
          </div>
          <p class="caption upload-note">只允許 JPEG/JPG/WebP，檔案大小需小於 2MB</p>
          </div>
  
          <div class="form-group mt-56">
            <label class="input-label">推薦標題1</label>
            <div class="input-wrapper">
            <input type="text" class="input-field" placeholder="Placeholder">
            </div>
          </div>
  
          <div class="form-group">
            <div class="input-wrapper">
              <label class="input-label">店家資訊1</label>
              <textarea class="input-field textarea" placeholder="Placeholder"></textarea>
            </div>
          </div>
  
          <div class="form-group">
            <div class="input-wrapper">
              <label class="input-label">店家內容1</label>
              <textarea class="input-field textarea" placeholder="Placeholder"></textarea>
            </div>
          </div>
  
          <div class="form-group">
          <label class="input-label">圖片1</label>
          <div class="input-wrapper with-upload-button ">
            <input type="text" class="input-field" placeholder="Placeholder">
            <button class="upload-button">上傳按鈕</button>
          </div>
          <p class="caption upload-note">只允許 JPEG/JPG/WebP，檔案大小需小於 2MB</p>
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
  import BackIcon from '@/components/icons/IconBack.vue';
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  
  export default {
    name: "AdminScheduleView",
    components: {
      BackIcon,
      EditIcon,
      AddIcon,
    },
    data() {
      return {
        scheduleItems: [
          { 
            id: 1,
            type: '半日遊',
            route: '淡水信義線',
            item: 'ex古早味之旅'
          },
          { 
            id: 2,
            type: '一日遊',
            route: '淡水信義線',
            item: 'ex溫泉之旅'
          },
          { 
            id: 3,
            type: '小編精選',
            route: '板南線',
            item: 'ex火鍋季'
          },
          { 
            id: 4,
            type: '小編精選',
            route: '板南線',
            item: 'ex溫泉之旅'
          }
        ]
      }
    },
  };
  </script>
  