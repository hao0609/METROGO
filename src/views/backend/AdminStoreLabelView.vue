<template>
    <div>
        <h1 class="admin-title">標籤管理</h1>  
        <div class="filter-group">
            <button class="btn_filled small with-icon auto-left"><AddIcon/>新增</button>
        </div>
        
        <div class="admin-table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>標籤</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in productLabels"
                :key="product.id"
                :class="{ 'highlight-row': index % 2 === 1 }"
              >
                <td>{{ product.id }}</td>
                <td>{{ product.item }}</td>
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
    name: "AdminProductLabelView",
    components: {
      BackIcon,
      EditIcon,
      AddIcon,
    },
    data() {
      return {
        productLabels: [
          { 
            id: 1,
            item: '今日優惠區',
          },
          { 
            id: 2,
            item: '特製商品區',
          },
  
        ]
      }
    },
  };
  </script>
  