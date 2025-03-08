<template>
    <div>
      <h1 class="admin-title">最新消息管理</h1>  
      <div class="filter-group">
          <div class="select-wrapper small">
              <select class="select-field">
                  <option value="all" selected>分類</option>
                  <option value="news">最新消息</option>
                  <option value="shop">商城</option>
                  <option value="system">系統公告</option>
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
              <th>類別</th>
              <th>標題</th>
              <th>起訖時間</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(news, index) in newsItems"
              :key="news.id"
              :class="{ 'highlight-row': index % 2 === 1 }"
            >
              <td>{{ news.id }}</td>
              <td>{{ news.category }}</td>
              <td>{{ news.title }}</td>
              <td>{{ news.period }}</td>
              <td class="action-buttons">
                <button class="table-btn edit-btn">
                  <EditIcon/>
                </button>
                <button class="table-btn delete-btn">
                  <DeleteIcon/>
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
import EditIcon from '@/components/icons/IconAdminEdit.vue';
import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
import AddIcon from '@/components/icons/IconAdd.vue';

export default {
  name: "AdminNewsView",
  components: {
    EditIcon,
    DeleteIcon,
    AddIcon,
  },
  data() {
    return {
      newsItems: [
        { 
          id: 1,
          category: '未分類',
          title: '最新消息標題',
          period: '2024-11-01~2024-11-31'
        },
        { 
          id: 2,
          category: '最新消息',
          title: '最新消息標題',
          period: '2024-11-01~2024-11-31'
        },
        { 
          id: 3,
          category: '商城',
          title: '最新消息標題',
          period: '2024-11-01~2024-11-31'
        },
        { 
          id: 4,
          category: '系統公告',
          title: '最新消息標題',
          period: '2024-11-01~2024-11-31'
        }
      ]
    }
  },
  methods: {
    handleEdit(id) {
      // 處理編輯邏輯
    },
    handleDelete(id) {
      // 處理刪除邏輯
    }
  }
};
</script>
