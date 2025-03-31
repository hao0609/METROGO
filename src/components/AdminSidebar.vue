<script>
import { useRouter, useRoute } from "vue-router";
import { computed } from 'vue';
import AdminLogoutIcon from "@/components/icons/IconAdminLogout.vue";
import AdminHomeIcon from "@/components/icons/IconAdminHome.vue";
import AdminOrderIcon from "@/components/icons/IconAdminOrder.vue";
import AdminPhotoIcon from "@/components/icons/IconAdminPhoto.vue";
import AdminProductIcon from "@/components/icons/IconAdminProduct.vue";
import AdminNewsIcon from "@/components/icons/IconAdminNews.vue";
import AdminRightIcon from "@/components/icons/IconAdminRight.vue";
import AdminScheduleIcon from "@/components/icons/IconAdminSchedule.vue";
import AdminUserIcon from "@/components/icons/IconAdminUser.vue";
import DownIcon from "@/components/icons/IconDown.vue";

export default {
  name: "BackendSidebar",
  components: {
    AdminLogoutIcon,
    AdminHomeIcon,
    AdminOrderIcon,
    AdminPhotoIcon,
    AdminProductIcon,
    AdminNewsIcon,
    AdminRightIcon,
    AdminScheduleIcon,
    AdminUserIcon,
    DownIcon,
  },
  data() {
    return {
      userManagementExpanded: false,
      productManagementExpanded: false,
      newsManagementExpanded: false,
    };
  },
  methods: {
    toggleUserManagement() {
      this.userManagementExpanded = !this.userManagementExpanded;
    },
    toggleProductManagement() {
      this.productManagementExpanded = !this.productManagementExpanded;
    },
    toggleNewsManagement() {
      this.newsManagementExpanded = !this.newsManagementExpanded;
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 檢查當前路徑是否為指定路徑或其子路徑
    const isUserActive = computed(() => {
      return route.path.startsWith('/admin/user');
    });

    const isStoreActive = computed(() => {
      return route.path.startsWith('/admin/store');
    });

    const isNewsActive = computed(() => {
      return route.path.startsWith('/admin/news');
    });

    const logout = () => {
      localStorage.removeItem("admin"); // 清除登入資訊
      router.push("/backend-login"); // 跳轉到後台登入頁
    };

    return { 
      logout,
      isUserActive,
      isStoreActive,
      isNewsActive
    };
  },
};
</script>

<template>
  <div class="sidebar">
    <!-- Logo 和管理者資訊 -->
    <div class="logo-section">
      <router-link to="/">
        <img class="logo" src="../assets/images/backend_enter.svg" alt="logo" />
      </router-link>
      <div class="admin-info">
        <span class="admin-title bold">管理者名稱</span>
        <button class="logout-btn" @click="logout">
          登出
          <span class="logout-icon">
            <AdminLogoutIcon />
          </span>
        </button>
      </div>
    </div>

    <!-- 側邊選單導航 -->
    <nav class="nav-menu">
      <!-- 會員管理 -->
      <router-link 
        to="/admin/user" 
        class="menu-item bold" 
        :class="{ 'active': isUserActive }"
      >
        <span class="menu-icon">
          <AdminUserIcon />
        </span>
        會員管理
      </router-link>

      <!-- 商品管理 -->
      <router-link 
        to="/admin/store" 
        class="menu-item bold" 
        :class="{ 'active': isStoreActive }"
      >
        <span class="menu-icon">
          <AdminProductIcon />
        </span>
        商品管理
      </router-link>

      <!-- 最新消息管理 -->
      <router-link 
        to="/admin/news" 
        class="menu-item bold" 
        :class="{ 'active': isNewsActive }"
      >
        <span class="menu-icon">
          <AdminNewsIcon />
        </span>
        最新消息管理
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/base/color" as *;
@use "@/assets/sass/base/font" as *;

.sidebar {
  width: 240px;
  min-height: 100vh;
  background-color: $neutral-700;
  padding: 24px 16px 40px 16px;
  color: $neutral-0;
}

.logo-section {
  margin-bottom: 24px;
  outline: none;

  .logo {
    width: 176px;
    margin-bottom: 32px;
  }

  .admin-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .admin-title {
      font-size: 14px;
      color: $neutral-0;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: $neutral-0;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: $primary-200;
      }

      .logout-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .menu-group {
    display: flex;
    flex-direction: column;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    background-color: $neutral-0;
    border: none;
    border-radius: 48px;
    color: $neutral-700;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    text-align: left;
    position: relative;

    &:hover {
      background-color: $primary-200;
    }

    &.active {
      background-color: $primary-400;
      color: $neutral-0;
    }

    .menu-icon {
      width: 28px;
      height: 28px;
      margin-right: 12px;

      svg {
        width: 28px;
        height: 28px;
      }
    }
  }

  // 子選單相關樣式
  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    padding-left: 16px;

    &.show {
      // 修改這裡
      max-height: 500px;
    }

    .menu-item {
      margin-top: 8px;
    }
  }

  // 展開狀態
  .has-submenu {
    .icon-down {
      margin-left: auto;
      transition: transform 0.3s ease;
    }

    &.expanded {
      & + .submenu {
        max-height: 500px;
      }

      .icon-down {
        transform: rotate(180deg);
      }
    }
  }

  // 字體加粗
  .bold {
    font-weight: bold;
  }
}
</style>