<!-- Pagination.vue -->
<template>
    <div class="pagination">
      <button 
        class="pagination-btn btn-last"
        :class="themeClass"
        :disabled="currentPage === 1"
        @click="handlePageChange(currentPage - 1)"
      >
        &lt;
      </button>
  
      <button 
        v-for="page in totalPages" 
        :key="page"
        class="pagination-btn"
        :class="[themeClass, { active: currentPage === page }]"
        @click="handlePageChange(page)" 
      > 
        {{ page }}
      </button>
  
      <button 
        class="pagination-btn btn-next"
        :class="themeClass"
        :disabled="currentPage === totalPages"
        @click="handlePageChange(currentPage + 1)"
      > 
        &gt;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      theme: {
        type: String,
        default: 'default',
        validator: function(value) {
          return ['default', 'primary'].includes(value)
        }
      }
    },
    computed: {
      themeClass() {
        return `theme-${this.theme}`
      }
    },
    methods: {
      handlePageChange(page) {
        this.$emit('page-change', page);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/sass/base/color' as *;
  
  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
    margin-bottom: 40px;
  
        .pagination-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $neutral-150;
        border-radius: 4px;
        background: $neutral-0;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
    
        &:hover:not(:disabled) {
            background-color: $neutral-50;
        }
    
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    
        // 主題樣式
        &.theme-default {
            &.active {
            background-color: $neutral-700;
            color: $neutral-0;
            border-color: $neutral-200;
            }
        }
    
        &.theme-primary {
            &.active {
            background-color: $primary-400;
            color: $neutral-0;
            border-color: $primary-200;
            }
        }
        }

        // .pagination-btn.btn-last, .pagination-btn.btn-next {
        //     width: 100px;
        // }
    }
  </style>