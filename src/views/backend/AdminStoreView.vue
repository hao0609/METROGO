<template>
    <div>
        <h1 class="admin-title">商城管理</h1>  
        <div class="filter-group">
            <div class="select-wrapper small">
                <select class="select-field">
                    <option value="all" selected>分類</option>
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
            
            <div class="input-wrapper small">
            <input type="text" class="input-field" placeholder="搜尋">
            </div>
            <button class="btn_filled small">查詢</button>
  
            <button class="btn_filled small with-icon auto-left"><AddIcon/>新增商品</button>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>商品名稱</th>
                <th>分類</th>
                <th>價格</th>
                <th>庫存</th>
                <th>狀態</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in productItems"
                :key="product.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.status }}</td>
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
    name: "AdminProductView",
    components: {
      BackIcon,
      EditIcon,
      AddIcon,
    },
    data() {
      return {
        productItems: [
          { 
            id: 1,
            name: '商品名稱',
            category: '分類',
            price: '價格',
            stock: '庫存',
            status: '上架',
          },
          { 
            id: 2,
            name: '商品名稱',
            category: '分類',
            price: '價格',
            stock: '庫存',
            status: '上架',
          }
        ]
      }
    },
  };
  </script>
  
  