<script setup>
import Banner from '../components/Store/SearchBar.vue';
import ProductList from '../components/Store/ProductList.vue';

const handleSearch = (query) => {
  console.log('Search query from App:', query);
 
}



</script>
<template>
    
<div>
    <Banner @search="handleSearch" />
    <main class="main">
      <div class="container">
        <ProductList />
      </div>
    </main>
</div>

</template>
<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #333;
  background-color: #f8f8f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.main {
  padding: 30px 0;
}

</style>