<template>
    <div class="sidebar">
        <!-- Logo 和管理者資訊 -->
        <div class="logo-section">
            <img class="logo "src="../assets/images/backend_enter.svg" alt="logo" />
            <div class="admin-info">
                <span class="admin-title">管理者名稱</span>
                <button class="logout-btn">
                    登出 
                    <span class="logout-icon">
                        <AdminLogoutIcon/>
                    </span>
                </button>
            </div>
        </div>

        <!-- 側邊選單導航 -->
        <nav class="nav-menu">
    <!-- 後台總覽 -->
    <router-link 
        to="/admin/dashboard" 
        class="menu-item"
        active-class="active"
    >
        <span class="menu-icon">
            <AdminHomeIcon/>
        </span>
        後台總覽
    </router-link>

    <!-- 會員管理 -->
    <div class="menu-group">
        <router-link 
            to="/admin/user" 
            class="menu-item has-submenu"
            :class="{ 'expanded': userManagementExpanded }"
            @click="toggleUserManagement"
        >
            <span class="menu-icon">
                <AdminUserIcon/>
            </span>
            會員管理
            <DownIcon class="icon-down"/>
        </router-link>
        
        <div class="submenu">
            <router-link 
                to="/admin/user-data" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                會員資料
            </router-link>
            <router-link 
                to="/admin/user-record" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                活動紀錄查詢
            </router-link>
        </div>
    </div>
    
    <!-- 商城管理 -->

    <div class="menu-group">
        <router-link 
            to="/admin/store" 
            class="menu-item has-submenu"
            :class="{ 'expanded': productManagementExpanded }"
            @click="toggleProductManagement"
        >
            <span class="menu-icon">
                <AdminProductIcon/>
            </span>
            商城管理
            <DownIcon class="icon-down"/>
        </router-link>
        
        <div class="submenu">
            <router-link 
                to="/admin/store-product" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                商品管理
            </router-link>
            <router-link 
                to="/admin/store-category" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                分類管理
            </router-link>
            <router-link 
                to="/admin/store-label" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                標籤管理
            </router-link>
        </div>
    </div>

    <!-- 訂單管理 -->
    <router-link 
        to="/admin/order" 
        class="menu-item"
        active-class="active"
    >
        <span class="menu-icon">
            <AdminOrderIcon/>
        </span>
        訂單管理
    </router-link>
    
    <!-- 最新消息管理 -->
    <div class="menu-group">
        <router-link 
            to="/admin/news" 
            class="menu-item has-submenu"
            :class="{ 'expanded': newsManagementExpanded }"
            @click="toggleNewsManagement"
        >
            <span class="menu-icon">
                <AdminProductIcon/>
            </span>
            最新消息管理
            <DownIcon class="icon-down"/>
        </router-link>
        
        <div class="submenu">
            <router-link 
                to="/admin/news-add" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                文章管理
            </router-link>
            <router-link 
                to="/admin/news-category" 
                class="menu-item sub-item"
                active-class="active"
            >
                <span class="menu-icon">
                    <AdminRightIcon/>
                </span>
                分類管理
            </router-link>
        </div>
    </div>

    <!-- 行程管理 -->
    <router-link 
        to="/admin/schedule" 
        class="menu-item"
        active-class="active"
    >
        <span class="menu-icon">
            <AdminScheduleIcon/>
        </span>
        行程管理
    </router-link>

    <!-- 照片管理 -->
    <router-link 
        to="/admin/photo" 
        class="menu-item"
        active-class="active"
    >
        <span class="menu-icon">
            <AdminPhotoIcon/>
        </span>
        照片管理
    </router-link>
</nav>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/sass/base/color' as *;

.sidebar {
    width: 240px;
    min-height: 100vh;
    background-color: $neutral-700;
    padding: 24px 16px 40px 16px;
    color: $neutral-0;
}

.logo-section {
    margin-bottom: 24px;

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

        &.show {  // 修改這裡
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
}
</style>

<script>


import AdminLogoutIcon from '@/components/icons/IconAdminLogout.vue';
import AdminHomeIcon from '@/components/icons/IconAdminHome.vue';
import AdminOrderIcon from '@/components/icons/IconAdminOrder.vue';
import AdminPhotoIcon from '@/components/icons/IconAdminPhoto.vue';
import AdminProductIcon from '@/components/icons/IconAdminProduct.vue';
import AdminNewsIcon from '@/components/icons/IconAdminNews.vue';
import AdminRightIcon from '@/components/icons/IconAdminRight.vue';
import AdminScheduleIcon from '@/components/icons/IconAdminSchedule.vue';
import AdminUserIcon from '@/components/icons/IconAdminUser.vue';
import DownIcon from '@/components/icons/IconDown.vue';

export default {
    name: 'BackendSidebar',
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
        }
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
        }
    }
    
};
</script>