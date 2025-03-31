<script setup>
import { ref as vueRef, onMounted } from "vue";
import Banner from "../components/Store/SearchBar.vue";
import ProductList from "../components/Store/ProductList.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import HomeFooter from "@/components/Footer.vue";
import { database, ref, get } from "@/firebase/firebaseConfig";

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

// 儲存過濾後的商品
const filteredProducts = vueRef([]);

// 搜尋邏輯：由 search 組件直接傳入過濾結果
const handleSearch = (searchQuery) => {
  console.log("Search query from SearchBar:", searchQuery);
  if (searchQuery.trim() === "") {
    // 如果搜尋框為空，顯示所有商品
    filteredProducts.value = [...products.value];
  } else {
    // 否則進行過濾
    filteredProducts.value = products.value.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
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
        <ProductList
          :products="products"
          :filteredProducts="filteredProducts"
        />
      </div>
    </main>
    <HomeFooter />
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.main {
  padding: 30px 0;
}
</style>
