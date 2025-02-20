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
                <button class="btn_filled">更新資料</button>
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
</template>

<style lang="scss" scoped>
@use '../assets/sass/page/userprofile.scss';
</style>

<script>
// Icons
import SubwayRightIcon from '@/components/icons/IconSubwayRight.vue';
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';
import HearFillIcon from '@/components/icons/IconHeartfill.vue';
import CartIcon from '@/components/icons/IconCart.vue';
// 彈窗
// import Alert_web_M from '@/components/Alert_web_M.vue';
import Swal from 'sweetalert2';


export default {
    name: "UseProfile",
    components: {
        SubwayRightIcon,
        EyeoffIcon,
        EyeIcon,
        HearFillIcon,
        CartIcon,
        //Alert_web_M,
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
            //// Alert_M
            // alertInfo: {
            // fristTitle: '訂單詳情',
            // svg_icon: `...`,
            // SecondTittle: '',
            // ThirdTittle: '',
            // ButtonText: '確認',
            // allowOutsideClick: true,
            // function: () => {
            //     console.log('Alert 確認按鈕被點擊');
            // }
            
        }
    },
    methods: {
        handleMenuClick(menuId) {
            this.activeMenuItem = menuId;
        },
        handleMobileMenuChange(event) {
            this.activeMenuItem = event.target.value;
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