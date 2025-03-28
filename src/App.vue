<script setup>
import { RouterView } from "vue-router";

/*  目前用戶登入狀態 */
import { provide } from "vue";
import { userLoginStatus } from "./js/view/userLoginStatus";
const { user } = userLoginStatus();
provide("user", user); //  讓所有子組件都可以使用 user 目前用戶登入資料
</script>

<template>
  <!-- 保留 <router-view /> 来渲染路由组件 -->
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<!--原本首頁瀏覽樣式頁面-->

<!--<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/style-view">StyleView</RouterLink>
        <RouterLink to="/alert-view">AlertView</RouterLink>
        <RouterLink to="/entrance-view">EntranceView</RouterLink>
      </nav>
    </div>
  </header> 

  <RouterView />

</template>-->

<!-- <Footer /> -->
<!--</template> -->

<!--
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} 


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
-->
