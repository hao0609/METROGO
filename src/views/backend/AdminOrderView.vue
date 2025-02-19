<template>
    <div>
        <h1 class="admin-title">訂單管理</h1>  
        <div class="filter-group">
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>日期</option>
                    <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
            </div>
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>訂單狀態</option>
                    <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
            </div>
            <button class="btn_filled small">篩選</button>
  
            <button class="btn_filled small auto-left">查詢</button>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>訂單編號</th>
                <th>建立時間</th>
                <th>訂單狀態</th>
                <th>庫存</th>
                <th>訂購人</th>
                <th>合計</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in orderItems"
                :key="order.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ order.id }}</td>
                <td>{{ order.nunber }}</td>
                <td>{{ order.createTime }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.stock }}</td>
                <td>{{ order.buyer }}</td>
                <td>{{ order.tatal }}</td>
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
      
    
  
        
        
      
  </template>
  
  <style lang="scss" scoped>
  @use "@/assets/sass/page/backend/admin-common.scss";
  </style>
  
  <script>
  import BackIcon from '@/components/icons/IconBack.vue';
  import EditIcon from '@/components/icons/IconAdminEdit.vue';
  import AddIcon from '@/components/icons/IconAdd.vue';
  
  export default {
    name: "AdminOrderView",
    components: {
      BackIcon,
      EditIcon,
      AddIcon,
    },
    data() {
      return {
        orderItems: [
          { 
            id: 1,
            nunber: 'TID201',
            createTime: '2024-11-20 22:56:05',
            status: '處理中',
            stock: '4',
            buyer: '訂購人',
            tatal: '$1,200',
          },
          { 
            id: 2,
            nunber: 'TID201',
            createTime: '2024-11-20 22:56:05',
            status: '處理中',
            stock: '4',
            buyer: '訂購人',
            tatal: '$1,200',
          }
        ]
      }
    },
  };
  </script>
  