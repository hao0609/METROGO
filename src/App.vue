<script setup>
<<<<<<< HEAD
 import Header from '@/components/Header.vue';
 import Footer from '@/components/Footer.vue';
 


</script>

<template>
 
    <!-- 保留 <router-view /> 来渲染路由组件 -->
    <div class="app-container">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
=======
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <!-- <header>
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
  </header> -->


  <RouterView />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
>>>>>>> e4c67585005483ed2d6001f5026e27d2145decdd
}




<<<<<<< HEAD
=======
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
} */

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
>>>>>>> e4c67585005483ed2d6001f5026e27d2145decdd
</style>
