<template>
  <Navbar_V1/>
  <div class="container">
    <img src="../assets/images/img_home_v1.jpg" alt="" class="home">
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/sass/page/home.scss';


</style>

<script>
import Navbar_V1 from '@/components/Navbar_V1.vue';

export default {
  name: "HomeView",
  created() {
      
  },
  components: {
    Navbar_V1
  },
  
};
</script>
