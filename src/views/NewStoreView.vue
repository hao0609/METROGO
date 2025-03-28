<script setup>
import Banner from "../components/Store/SearchBar.vue";
import ProductList from "../components/Store/ProductList.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import HomeFooter from "@/components/Footer.vue";

const handleSearch = (query) => {
  console.log("Search query from App:", query);
};
</script>
<template>
  <div>
    <Navbar_V1 />

    <Banner @search="handleSearch" />
    <main class="main">
      <div class="container">
        <ProductList />
      </div>
    </main>
    <HomeFooter />
  </div>
</template>
<style lang="scss" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   font-family: Arial, sans-serif;
//   line-height: 1.5;
//   color: #333;
//   background-color: #f8f8f8;
// }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.main {
  padding: 30px 0;
}
</style>
