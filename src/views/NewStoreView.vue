<script setup>
import { ref as vueRef, onMounted } from "vue";
import Banner from "../components/Store/SearchBar.vue";
import ProductList from "../components/Store/ProductList.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import HomeFooter from "@/components/Footer.vue";
import { database, ref, get } from "@/firebase/firebaseConfig";

const handleSearch = (query) => {
  console.log("Search query from App:", query);
};

// 用來儲存從 Firebase 讀取的資料
const products = vueRef([]);

// 從 Firebase 讀取資料
const fetchProducts = () => {
  const productRef = ref(database, "商品管理/products"); // 使用 ref 路徑指向 'products'
  get(productRef) // 使用 get() 獲取資料
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        products.value = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(data);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

onMounted(() => {
  fetchProducts(); // 頁面加載時調用
});
</script>

<template>
  <div>
    <Navbar_V1 />
    <Banner @search="handleSearch" />
    <main class="main">
      <div class="container">
        <ProductList :products="products" />
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
