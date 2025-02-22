<template>
 
 <a-table class="custom-table" :columns="columns" :data-source="data" :row-key="record => record.id" :scroll="{ x: 1000 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags ?? []"
            :key="tag"
            :color="tag === 'VIP' ? 'gold' : tag === 'new' ? 'green' : 'blue'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a href="javascript:void(0);"><EyeOutlined :style="{fontSize: '16px', color: '#232529'}"  /></a>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>

</template>


<script setup>

import { ref } from 'vue';
import { Table, Tag, Divider } from 'ant-design-vue';
import { EyeOutlined } from '@ant-design/icons-vue';


const count = ref(0);

const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80, 
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    width:100,
  },
  {
    title: 'User Email',
    dataIndex: 'userEmail',
    key: 'userEmail',
    width:250,
  },
  {
    title: 'Register Date',
    dataIndex: 'registerDate',
    key: 'registerDate',
    width:250,
  },
  {
    title: 'User Points',
    dataIndex: 'userPoint',
    key: 'userPoint',
    width:200,
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    width:200,
  },
  {
    title: 'Action',
    key: 'action',
    width:200,
  },
]);

const data = ref([
  {
    id: 1,
    userId: 101,
    userEmail: 'john@example.com',
    registerDate: '2024-02-10',
    userPoint: 120,
    tags: ['VIP', 'active'],
  },
  {
    id: 2,
    userId: 102,
    userEmail: 'jane@example.com',
    registerDate: '2024-01-22',
    userPoint: 80,
    tags: ['new', 'inactive'],
  },
  {
    id: 3,
    userId: 103,
    userEmail: 'jack@example.com',
    registerDate: '2023-12-05',
    userPoint: 150,
    tags: ['VIP', 'loyal'],
  },
]);









</script>


<style lang="scss" scoped>

.custom-table {
  width: 100%;
  margin: 0 auto; // 讓表格置中

 


  :deep(.ant-table-thead .ant-table-cell),
  :deep(.ant-table-thead th) {
    font-weight: bold !important;
    color: #ffffff !important; 
    background-color: #232529 !important;
    opacity: 1 !important; 
  }

  :deep(.ant-pagination-item) {
    background-color: #8C25C0 !important; 
    color: #fff !important;
    border: none !important; 
  }

  :deep(.ant-pagination-item:hover),
  :deep(.ant-pagination-item-active:hover) {
    background-color: #fff !important;
    border-color: #8C25C0 !important;
    color: #232529 !important;
  }

  /* 修改當前分頁的顏色 */
  :deep(.ant-pagination-item-active) {
    background-color: #8C25C0 !important; 
    border-color: #8C25C0 !important;
    color: #fff !important; 
  }

  /* 修改當前分頁的文字顏色 */
  :deep(.ant-pagination-item a),
  :deep(.ant-pagination-item-active a),
  :deep(.ant-pagination-item a:focus),
  :deep(.ant-pagination-item a:visited) {
    color: #fff !important; 
    text-decoration: none !important; /* 防止带有下划线 */
  }

  :deep(.ant-pagination-item a:hover),
  :deep(.ant-pagination-item-active a:hover) {
    color: #232529 !important;
  }

  :deep(.ant-table-cell) {
    text-align: center;
    font-size: 14px;
  }

  :deep(.ant-table-thead .ant-table-cell) {
    font-weight: bold;
    color: #333;
  }

  ::v-deep(.ant-table-thead) {
    background-color: #232529 !important;
  }
}









</style>

