<template>
  <div class="container">
      <AdminSidebar />
      <div class="content-main">
          <router-view></router-view>
      </div>
  </div>

</template>


<style lang="scss" scoped>
@use '@/assets/sass/page/backend/admin-common.scss'; // 後台共用
</style>

<script>
import AdminSidebar from '@/components/AdminSidebar.vue';

export default {
  name: 'AdminMainpage',
  components: {
      AdminSidebar,
  },
  
  
};
</script>