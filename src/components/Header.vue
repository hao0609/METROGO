<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


const menuItems = ref([
  {
    title: '景點介紹',
    link: ''
  },
  {
    title: '積分任務',
    children: [
      { title: '一般任務', link: '' },
      { title: '特殊任務-半日遊', link: '' },
      { title: '特殊任務-一日遊', link: '' }
    ]
  },
  {
    title: '線上商城',
    link: ''
  },
  {
    title: '最新消息',
    link: ''
  }
]);


const isLoggedIn = ref(false);
const isSubMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);

const userInfo = ref({
  name: '測試用戶',
  avatar: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23FFFFFF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
});

const toggleSubMenu = () => {
  isSubMenuOpen.value = !isSubMenuOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleLogin = () => {
  isLoggedIn.value = true;
};

const handleLogout = () => {
  isLoggedIn.value = false;
};


const handleClickOutside = (event) => {
  if (!event.target.closest('.nav-item')) {
    isSubMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <div class="logo">
        <a href="">
          <img src="../assets/images/Logo_white.svg" alt="logo" />
        </a>
      </div>

      <!-- 手機版選單按鈕 -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span :class="{ 'active': isMobileMenuOpen }"></span>
      </button>

      <div class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <ul class="nav-item">
          <li v-for="(item, index) in menuItems" :key="index">
            <template v-if="item.children">
              <a href="#" @click.prevent="toggleSubMenu">
                {{ item.title }} <span :class="{ 'rotate': isSubMenuOpen }">▼</span>
              </a>
              <ul class="sub-item" v-if="isSubMenuOpen">
                <li v-for="(child, childIndex) in item.children" :key="childIndex">
                  <a :href="child.link">{{ child.title }}</a>
                </li>
              </ul>
            </template>
            <a v-else :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>

      <div class="header-icon">
        <button class="cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
        </button>

        <!-- 登入狀態顯示 -->
        <template v-if="isLoggedIn">
          <div class="user-profile">
            <img :src="userInfo.avatar" :alt="userInfo.name" class="user-avatar">
            <div class="user-dropdown">
              <div class="user-info">
                <span>{{ userInfo.name }}</span>
              </div>
              <ul>
                <li><a href="/profile">個人資料</a></li>
                <li><a href="/orders">訂單記錄</a></li>
                <li><button @click="handleLogout">登出</button></li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <button class="Login" @click="handleLogin">登入</button>
        </template>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import'@/assets/sass/base/color.scss';
@import'@/assets/sass/base/reset.scss';

.header {
  height: var(--header-height, 70px);
  display: grid;
  grid-template-columns: 1fr;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: $neutral-700;
}

.header-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  max-width: 1440px;
  gap: 20px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  padding: 0 16px;
}

.logo {
  a {
    display: flex;
    height: 100%;
    align-items: center;
    transition: opacity 0.3s ease;
    justify-content: flex-start;
    
    &:hover {
      opacity: 0.8;
    }
  }

  img {
    width: 70%;
    height: auto;
    display: block;
    object-fit: contain;
  }
}

.nav-menu {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  margin: 0 8px;
  padding: 0;
  color: $neutral-0;

  .nav-item {
    list-style: none;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 24px;

    li {
      position: relative;
      margin: 0;
      height: 100%;
      
      align-items: center;

      a {
        color: $neutral-0;
        padding: 0 24px;
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 16px;

        span {
          margin-left: 4px;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        &:hover {
          background-color: $neutral-0;
          color: $neutral-400;
        }
      }

      .sub-item {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: $neutral-700;
        min-width: 160px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: none;
        z-index: 1001;
        flex-direction: column;

        li {
          display: block;
          height: auto;
          width: 100%;

          a {
            padding: 12px 16px;
            display: block;
            height: auto;
            width: 100%;

            &:hover {
              background-color: $neutral-0;
              color: $neutral-400;
            }
          }
        }
      }

      &:hover .sub-item {
        display: block;
      }
    }
  }
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  border-left: 2px solid $neutral-0;

  .cart {
    color: $neutral-0;
    width: 36px;
    height: 36px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .Login {
    color: $primary-400;
    font-size: 16px;
    padding: 8px 24px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $neutral-0;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;

    &:hover {
      background-color: $neutral-0;
      color: $neutral-700;
    }
  }
}

.mobile-menu-toggle {
  display: none;
}

.user-profile {
  position: relative;
  cursor: pointer;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid $neutral-0;
    background-color: $primary-400;
    padding: 4px;
  }

  &:hover .user-dropdown {
    display: block;
  }
}

.user-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 8px;
  z-index: 1002;

  .user-info {
    padding: 15px;
    border-bottom: 1px solid #eee;
    
    span {
      color: $neutral-700;
      font-weight: 500;
    }
  }

  ul {
    list-style: none;
    padding: 8px 0;

    li {
      a, button {
        display: block;
        padding: 8px 15px;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: $neutral-700;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-decoration: none;

        &:hover {
          background: #F5F5F5;
        }
      }
    }
  }
}

.rotate {
  display: inline-block;
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .header-wrapper {
    grid-template-columns: auto 1fr auto;
    padding: 0 16px;
  }

  .mobile-menu-toggle {
  display: block;
  width: 30px;
  height: 30px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;

  span {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px; 
    background-color: $neutral-0;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 5px; 
      background-color: $neutral-0;
      transition: all 0.3s ease;
      top: -10px; // 調整間距，因為線條變粗了
    }

    &.active {
      opacity: 0; 
     
      &::before {
        transform: rotate(45deg);
        top: 0;
        box-shadow: 0px -6px 0px #000; 
      }
    }
  }
}

  .nav-menu {
    position: fixed;
    top: var(--header-height, 70px);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--header-height, 70px));
    background-color: $neutral-700;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &.active {
      transform: translateX(0);
    }

    .nav-item {
      flex-direction: column;
      padding: 20px;
      gap: 0;
      width: 100%;
      box-sizing: border-box;

      li {
        width: 100%;
        margin: 10px 0;
        height: auto;
        box-sizing: border-box;

        a {
          padding: 10px 15px;
          height: auto;
          width: 100%;
          box-sizing: border-box;
          justify-content: space-between;
        }

        .sub-item {
          position: static;
          width: 100%;
          left: 0;
          display: flex; // 改為 flex
          flex-direction: column; // 強制垂直排列
          padding: 0; // 移除所有 padding
          margin: 0;
          box-sizing: border-box;

          li {
            margin: 5px 0;
            display: block;
            width: 100%; 
            padding-left: 0;
        }
            
            a {
              padding-left: 30px;
              display: block;
              width: 100%;
              text-align: left;
            }
          }
        }
      }
    }
  }

  .header-icon {
    border-left: none;
    gap: 8px;
  }

  .user-dropdown {
    right: -16px;
  }

</style>