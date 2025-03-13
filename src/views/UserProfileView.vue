<template>
    <div class="container">
        <div class="side-bar">
            <div class="side-bar-top">
                <div class="profile-pic">👤</div>
                <div class="point-group">
                    <p class="caption txt-neutral-400">目前積分</p>
                    <div class="title1 bold">250</div>
                </div>
                <div class="btn-group">
                    <button class="btn-mission">獎勵領取</button>
                    <button class="btn-mission">集章冊</button>
                </div>
            </div>
            <div class="side-bar-bottom">
                <div class="menu">
                    <div 
                        v-for="(item, index) in menuItems" 
                        :key="index"
                        class="menu-item"
                        :class="{ active: activeMenuItem === item.id }"
                        @click="handleMenuClick(item.id)"
                    >
                        {{ item.text }}<SubwayRightIcon/>
                    </div>
                    <button class="btn_white small">登出</button>
                </div>
                <div class="menu_mobile">
                    <div class="select-group">
                        <div class="select-wrapper">
                            <select class="select-field" @change="handleMobileMenuChange($event)">
                                <option value="" disabled selected>下拉選項</option>
                                <option v-for="(item, index) in menuItems" 
                                        :key="index" 
                                        :value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                            <span class="select-arrow"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 會員資料 -->
        <div class="container-right" id="userInfo" :style="{ display: activeMenuItem === 'userInfo' ? 'block' : 'none' }">
            <div class="title1 bold">會員資料</div>
            <div class="content">
                <div class="profile-pic">👤</div>
                <div class="form-group">
                    <label class="input-label">會員名稱</label>
                    <div class="input-wrapper">
                        <input type="text" class="input-field" v-model="userName" placeholder="">
                    </div>
                </div>
                <div class="form-group disabled">
                    <label class="input-label">會員信箱</label>
                    <div class="input-wrapper">
                        <input type="text" class="input-field" v-model="userEmail" disabled>
                    </div>
                </div>
                <button class="btn_filled" @click="showUpdateAlert">更新資料</button>
            </div>
        </div>
        
        <!-- 修改密碼 -->
        <div class="container-right" id="changePassward" :style="{ display: activeMenuItem === 'changePassward' ? 'block' : 'none' }">
            <div class="title1 bold">修改密碼</div>
            <div class="content">   
                <div class="form-group">
                    <label class="input-label required">設定新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input type="text" class="input-field" placeholder="Placeholder">
                        <EyeoffIcon class="input-icon"/>
                        <EyeIcon class="input-icon" style="display: none"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="input-label required">再次輸入新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input type="text" class="input-field" placeholder="Placeholder">
                        <EyeoffIcon class="input-icon" style="display: none"/>
                        <EyeIcon class="input-icon" />
                    </div>
                </div>
                <button class="btn_filled">更新密碼</button>
            </div>
        </div>
        <!-- 商品收藏 -->
        <div class="container-right" id="productCollection" :style="{ display: activeMenuItem === 'productCollection' ? 'block' : 'none' }">
            <div class="title1 bold">商品收藏</div>
            <div class="content">   
                <div class="product-list">  
                    <div class="product">
                        <div class="img-product-photo"></div>
                        <div class="icon-heart"><HearFillIcon/></div>
                        <div class="btn-group">
                            <button class="btn_outline small">查看詳情</button>
                            <div class="cart-btn"><CartIcon/></div>
                        </div>
                    </div>
                    <div class="product">
                        <div class="img-product-photo"></div>
                        <div class="icon-heart"><HearFillIcon/></div>
                        <div class="btn-group">
                            <button class="btn_outline small">查看詳情</button>
                            <div class="cart-btn"><CartIcon/></div>
                        </div>
                    </div>
                    <div class="product">
                        <div class="img-product-photo"></div>
                        <div class="icon-heart"><HearFillIcon/></div>
                        <div class="btn-group">
                            <button class="btn_outline small">查看詳情</button>
                            <div class="cart-btn"><CartIcon/></div>
                        </div>
                    </div>
                    <div class="product">
                        <div class="img-product-photo"></div>
                        <div class="icon-heart"><HearFillIcon/></div>
                        <div class="btn-group">
                            <button class="btn_outline small">查看詳情</button>
                            <div class="cart-btn"><CartIcon/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 訂單管理 -->
        <div class="container-right" id="orderList" :style="{ display: activeMenuItem === 'orderList' ? 'block' : 'none' }">
            <div class="title1 bold">訂單管理</div>
            <div class="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>訂購日期</th>
                            <th>訂單狀態</th>
                            <th>物流狀態</th>
                            <th>總金額</th>
                            <th>功能</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(order, index) in orders" 
                            :key="order.id" 
                            :class="{ 'highlight-row': index % 2 === 1 }"
                        >
                            <td>{{ order.id }}</td>
                            <td>{{ order.date }}</td>
                            <td>{{ order.status }}</td>
                            <td>{{ order.logistics }}</td>
                            <td>NT$ {{ order.amount }}</td>
                            <td>
                                <button class="btn_outline small" @click="handleOrderDetails(order.id)">查看詳情</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> 

        <!-- 彈窗，預設隱藏 -->
        <div id="orderDetailDialog" style="display: none;">
            <div class="order-detail-content">
                <div class="detail-section">
                    <p class="title2 bold dialog-title">訂單詳情</p>
                    <p class="title2 bold list-title">商品明細</p>
                    <div class="items-list">
                        <div v-for="(item, index) in selectedOrder?.items" :key="index" class="item-row">
                            <span>{{ item.name }}</span>
                            <span>x{{ item.quantity }}</span>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="amount-row">
                        <span>訂單金額</span>
                        <span class="bold">${{ selectedOrder?.amount }}</span>
                    </div>
                </div>
                
                <div class="receiver-section">
                    <div class="form-group">
                        <label class="input-label">收件人名稱</label>
                        <div class="input-wrapper disabled">
                            <input type="text" class="value input-field" :value="selectedOrder?.receiver.name" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="input-label">收件人電話</label>
                        <div class="input-wrapper disabled">
                            <input type="text" class="value input-field" :value="selectedOrder?.receiver.phone" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="input-label">收件地址</label>
                        <div class="input-wrapper disabled">
                            <input type="text" class="value input-field" :value="selectedOrder?.receiver.address" disabled>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    <Alert_web_M ref="alertM" :alertInfo="alertInfo" />
</template>

<script>
// Icons
import SubwayRightIcon from '@/components/icons/IconSubwayRight.vue';
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';
import HearFillIcon from '@/components/icons/IconHeartfill.vue';
import CartIcon from '@/components/icons/IconCart.vue';
// 彈窗
import Alert_web_M from '@/components/Alert_web_M.vue';
import Swal from 'sweetalert2';


export default {
    name: "UseProfile",
    components: {
        SubwayRightIcon,
        EyeoffIcon,
        EyeIcon,
        HearFillIcon,
        CartIcon,
        Alert_web_M,
    },
    data() {
        return {
            activeMenuItem: 'userInfo', // 預設顯示會員資料 tab
            menuItems: [
                { id: 'userInfo', text: '會員資料' },
                { id: 'changePassward', text: '修改密碼' },
                { id: 'productCollection', text: '商品收藏' },
                { id: 'orderList', text: '訂單管理' }
            ],
            // 會員資料預設顯示
            userName: "王小明",
            userEmail: "Test1234@gmail.com",
            // 訂單資料
            selectedOrder: null,
            orders: [
                    { 
                        id: 'TID201111', 
                        date: '2024-11-20 22:56:05', 
                        status: '處理中', 
                        logistics: '尚未出貨', 
                        amount: 500,
                        items: [
                            { name: '商品名稱 AAA', quantity: 1 },
                            { name: '商品名稱 AAA', quantity: 1 }
                        ],
                        receiver: {
                            name: '王小明',
                            phone: '0912345789',
                            address: '地址'
                        }
                    },
                    ],
            // Alert_M
            alertInfo: {
            fristTitle: '資料更新',
            svg_icon: `<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="75" stroke="#7D8A93" stroke-width="10"/>
            <path d="M63.2393 73.1818C63.2393 76.88 64.7084 80.4268 67.3234 83.0418C69.9385 85.6569 73.4852 87.126 77.1835 87.126C80.8817 87.126 84.4285 85.6569 87.0435 83.0418C89.6586 80.4268 91.1277 76.88 91.1277 73.1818C91.1277 69.4835 89.6586 65.9368 87.0435 63.3217C84.4285 60.7067 80.8817 59.2375 77.1835 59.2375C73.4852 59.2375 69.9385 60.7067 67.3234 63.3217C64.7084 65.9368 63.2393 69.4835 63.2393 73.1818Z" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M91.1134 111.84L83.7555 119.198C82.0124 120.939 79.6493 121.917 77.1854 121.917C74.7215 121.917 72.3585 120.939 70.6154 119.198L50.8889 99.4759C46.5553 95.1416 43.3603 89.8033 41.5882 83.9359C39.8161 78.0685 39.5217 71.8541 40.7315 65.8455C41.9412 59.8369 44.6174 54.2205 48.522 49.4961C52.4266 44.7716 57.4384 41.0856 63.1117 38.7659C68.7849 36.4463 74.9436 35.565 81.0397 36.2004C87.1358 36.8358 92.9803 38.9683 98.0533 42.4081C103.126 45.8479 107.27 50.4883 110.116 55.9164C112.963 61.3446 114.423 67.3922 114.368 73.5211M109.72 124.311V124.357M109.72 110.366C111.803 110.36 113.825 109.654 115.46 108.363C117.095 107.071 118.25 105.269 118.739 103.243C119.229 101.218 119.025 99.0868 118.16 97.1912C117.295 95.2955 115.819 93.7448 113.968 92.7873C112.119 91.8401 110.004 91.5464 107.966 91.954C105.929 92.3616 104.09 93.4466 102.748 95.0324" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式`,
            SecondTittle: '副標文字',
            ThirdTittle: '副副標文字',
            ButtonText: '確認',
            allowOutsideClick: true,
            function: () => {
                console.log('Alert 確認按鈕被點擊');
            }
        }  
    };  
        
    },
    methods: {
        handleMenuClick(menuId) {
            this.activeMenuItem = menuId;
        },
        handleMobileMenuChange(event) {
            this.activeMenuItem = event.target.value;
        },
        // 新增顯示資料更新提示的方法
        showUpdateAlert() {
            this.$refs.alertM.showAlert();
        },
        // 訂單詳情談窗
        handleOrderDetails(orderId) {
            this.selectedOrder = this.orders.find(o => o.id === orderId);
            if (this.selectedOrder) {
                const template = document.getElementById('orderDetailDialog');
                Swal.fire({
                    html: template.innerHTML,
                    confirmButtonText: '關閉',
                    customClass: {
                        popup: 'dialog-order-detail',
                        confirmButton: 'btn_filled'
                    },
                    showCloseButton: false,
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    }
                });
            }
        }
    },
    
};
</script>
<style lang="scss" scoped>
@use '../assets/sass/page/userprofile.scss';
</style>