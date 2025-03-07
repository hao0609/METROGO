<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const placeholder = '想找什麼?'

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchQuery.value)
  console.log('Searching for:', searchQuery.value)
}



</script>
<template>
    
    <div class="banner">
    <div class="container">
      <div class="banner__search">
        <div class="search">
          <div class="search__container">
            <i class="search__icon"></i>
            <input 
              type="text" 
              class="search__input" 
              :placeholder="placeholder"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>


.banner {
  background-image: url('/src/assets/images/store/store-banner.png');
  padding: 50px 0;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  height: 450px;


 
  &__search {
    position: absolute;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    left:10%;
    top:50%;
  }
}

.search {
  width: 100%;

  &__container {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 25px;
    padding: 10px 40px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__icon {
    width: 20px;
    height: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  &__input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    
    &::placeholder {
      color: #999;
    }
  }
}








</style>