<script setup>
 import { RouterView, RouterLink } from 'vue-router'
</script>

<!--原本首頁瀏覽樣式頁面-->

<template>
    <header>
  
      <div class="wrapper">
        <nav>
          <RouterLink to="/StylePreview/style-view">StyleView</RouterLink>
          <RouterLink to="/StylePreview/alert-view">AlertView</RouterLink>
          <RouterLink to="/StylePreview/table-view">TableView</RouterLink>
        </nav>
      </div>
    </header> 
  
  
    <RouterView />
  </template>
  
  
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
      justify-content: center;
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
  