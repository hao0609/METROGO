
<script setup>
import icon_purple from './icons/icon_purple.vue' 
import icon_white from './icons/icon_white.vue';
import shopping_cart from './icons/shopping_cart.vue' 
import user from './icons/user.vue' 
import shopping_cart_alert from './shopping_cart_alert.vue'

import { ref , computed} from 'vue';

const checked = ref(false);
const rwd_menu = ref(null);
const rwd_menu_bg = ref(null);
// const header = ref(null);

// 控制積分遊戲 dropdown 是否隱藏
const dropdown = ref(false);

// 模擬登入狀態
const user_login_status = ref(false);

const user_login_statusText = computed(() => {

    if (user_login_status.value === true ) {

        return '登出';
    }else if (user_login_status.value === false ) {

        return '登入';
    }

});

const checked_change = () => {

    
    if (checked.value === true ) {

        rwd_menu.value.style.visibility = 'visible';
        rwd_menu_bg.value.style.transform = 'scale(1)';
        rwd_menu.value.style.transform = 'scale(1)';
        // header.value.style.backgroundColor = '#e0c4ee';

        

    } else if (checked.value === false ) {
        
        rwd_menu.value.style.visibility = 'hidden';
        rwd_menu_bg.value.style.transform = 'scale(0)';
        rwd_menu.value.style.transform = 'scale(0)';
        // header.value.style.backgroundColor = 'black';
    }
};


const cartVisible = ref(false);
const cartItems = ref([
  { prod_name: "商品1", prod_price: 500, prod_quantity: 1 },
  { prod_name: "商品2", prod_price: 200, prod_quantity: 1 }
]);



</script>


<template>
    <header>
        <RouterLink to="/" ><icon_white></icon_white></RouterLink>
        <nav>
            <ul class="menu bold txt-neutral-0">
                <li><RouterLink to="/sights" >景點介紹</RouterLink></li>
                <li  class="dropdown" @click="dropdown = !dropdown">積分任務

                    <div class="dropdown_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M0 0L5 5L10 0H0Z" fill="white"/>
                        </svg>
                    </div>
                
                    <div class="dropdown_menu" v-show="dropdown"> 
                        <RouterLink to="/general-mission" class="router_link">
                            <button class="btn_white">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38" fill="none">
                                <path d="M14 18.05C12.6739 18.05 11.4021 17.5496 10.4645 16.6588C9.52678 15.768 9 14.5598 9 13.3C9 12.0402 9.52678 10.832 10.4645 9.94124C11.4021 9.05044 12.6739 8.55 14 8.55C15.3261 8.55 16.5979 9.05044 17.5355 9.94124C18.4732 10.832 19 12.0402 19 13.3C19 13.9238 18.8707 14.5415 18.6194 15.1177C18.3681 15.694 17.9998 16.2177 17.5355 16.6588C17.0712 17.0998 16.52 17.4497 15.9134 17.6884C15.3068 17.9271 14.6566 18.05 14 18.05ZM14 0C10.287 0 6.72601 1.40125 4.1005 3.89548C1.475 6.38971 0 9.77262 0 13.3C0 23.275 14 38 14 38C14 38 28 23.275 28 13.3C28 9.77262 26.525 6.38971 23.8995 3.89548C21.274 1.40125 17.713 0 14 0Z" fill="#FF0000"/>
                                </svg>
                            </div>
                            
                            一般任務
                            
                            </button>
                        </RouterLink>
                        <RouterLink to="/special-mission" class="router_link">
                        <button class="btn_white">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <path d="M20.5 1.68625L24.8495 15.6954L24.9587 16.0471H25.3271H39.464L28.0077 24.7577L27.729 24.9697L27.8328 25.304L32.1968 39.3596L20.8026 30.6962L20.5 30.4661L20.1974 30.6962L8.80323 39.3596L13.1672 25.304L13.271 24.9697L12.9923 24.7577L1.53599 16.0471H15.6729H16.0413L16.1505 15.6954L20.5 1.68625Z" fill="#FFF200" stroke="black"/>
                                </svg>
                            </div>
                        特殊任務－半日
                        </button>
                        </RouterLink>
                        <RouterLink to="/special-mission" class="router_link">
                        <button class="btn_white">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                <path d="M20.5 1.68625L24.8495 15.6954L24.9587 16.0471H25.3271H39.464L28.0077 24.7577L27.729 24.9697L27.8328 25.304L32.1968 39.3596L20.8026 30.6962L20.5 30.4661L20.1974 30.6962L8.80323 39.3596L13.1672 25.304L13.271 24.9697L12.9923 24.7577L1.53599 16.0471H15.6729H16.0413L16.1505 15.6954L20.5 1.68625Z" fill="#FFF200" stroke="black"/>
                                </svg>
                            </div>
                        特殊任務－一日
                        </button>
                        </RouterLink>
                    </div>
                
                </li>
                <li><RouterLink to="/store" >商城</RouterLink></li>
                <li><RouterLink to="/news" >最新消息</RouterLink></li>

            </ul>
            <div class="line"></div>

            <div class="shopping_cart"><shopping_cart @click="cartVisible = !cartVisible"/></div> 


            <div class="user"><RouterLink to="/user-profile" ><user v-show="user_login_status"></user></RouterLink></div> 

            <RouterLink to="/login">
                <button class="btn_white small">{{user_login_statusText}}</button>
            </RouterLink>

            
        </nav>


        <div class="hamburger_box" >
            <input type="checkbox" class="hamburger_check"  @change="checked_change" v-model="checked">
            <div class="hamburger">
                <div>
                    
                </div>
            </div>
        </div>

        <div class="shooping_cart_alert_box">
            <shopping_cart_alert
                v-model:show="cartVisible"
                :itemList="cartItems"
                @update:itemList="cartItems = $event"
                @remove-item="cartItems.splice($event, 1)"
            />
        </div>

    </header>



    <div class="rwd_menu_V1" ref="rwd_menu">
            <div class="rwd_menu_bg_V1" ref="rwd_menu_bg"></div>
            <div class="rwd_menu_content">
                <div class="tittle_box ">
                    <RouterLink to="/sights"><h2>景點介紹</h2></RouterLink>
                    <h2>積分任務</h2>
                    <div class="missions">
                        <RouterLink to="/general-mission" class="router_link"><div class="mission_text">一般任務</div></RouterLink>
                        <RouterLink to="/special-mission" class="router_link"><div class="mission_text">特殊任務 - 半日</div></RouterLink>
                        <RouterLink to="/special-mission" class="router_link"><div class="mission_text">特殊任務 - 一日</div></RouterLink>
                    </div>
                    <RouterLink to="/store"><h2>商城</h2></RouterLink>
                    <RouterLink to="/news"><h2>最新消息</h2></RouterLink>

                    <button class="btn_outline small">{{user_login_statusText}}</button>
                </div>
                <div class="icon_box">

                    <div class="icon">
                    <shopping_cart/>
                    
                    <user v-show="user_login_status"><RouterLink to="/user-profile" ></RouterLink></user>
                    </div>

                
                </div>

            </div>
            <div class="bg_image">
                <div class="blue_man"><img src="../assets/images/blue_man.png" alt=""></div>
                <div class="yellow_man"><img src="../assets/images/yellow_man.png" alt=""></div>
            </div>
    </div>

</template>


<style lang="scss" scoped>

@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/mixin/_mixin.scss";


///////////* Header *//////////////
 header{
    display: flex;
    width: 100%;
    background-color: $neutral-700;
    height: 72px;
    position: relative;
    padding: 12px 40px;
    justify-content:space-between;
    align-items: center;
    z-index:1062;    
 }


///////////* iCON *//////////////

.icon{

   @include flex-center;
   gap: 15px;
   cursor: pointer;
}


///////////* nav *//////////////

nav{
   @include flex-center;
}
.menu{
   gap: 32px;
   display: flex;
}


ul > li.dropdown{
   position: relative;
   display: flex;
   gap: 5px;
   align-items: center;
   cursor: pointer;
}

ul > .dropdown > .dropdown_menu{

    position: absolute;
    top: 52px;
    background-color: $neutral-150;
    padding: 10px 20px;
    border-radius: 12px;
}

ul > .dropdown > .dropdown_menu > .router_link >button{
    margin: 10px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 240px;


}


ul > .dropdown > .dropdown_menu > .router_link > button > .icon{
    margin-right: 10px;
    width: 41px;
    height: 41px;
    justify-content: center
} 

// nav 與 右方 ICON 間隔線
.line{
   width: 1px;
   height: 21px;
   background: white;
   margin: 0 32px;
}

.user{
    margin: 0 32px;
}



// 漢堡選單動畫間隔時間
$all_animation_time: .4s;


////////* hamburger *///////////

 // 漢堡選單外部容器
.hamburger_box{
   @include flex-center;
   display: none;
   position: relative;
}

 // 漢堡選單
 .hamburger{
   width: 30px;
   height: 16px;
   @include flex-center;
   justify-content: center;
}

// hamburger 中間線
.hamburger > div{
   height: 3px;
   background-color: white;
   @include flex-center;
   justify-content: center;
   width: 100%;
   border-radius: 10px;
   position: relative
}

// hamburger 上下線
.hamburger > div:before, .hamburger > div:after {
   content: '';
   position: absolute;
   z-index: 1;
   top: -10px;
   left: 0;
   width: 100%;
   height: 3px;
   background: white;
   transition: all 0.4s ease;
}

// hamburger 下線 往下10px
.hamburger > div:after {
   top: 10px
}

// 隱藏 inputbox (用於點選切換用)
.hamburger_check{
   position: absolute;
   top: 0;
   left: 0;
   z-index: 2;
   cursor: pointer;
   width: 100%;
   height: 100%;
   opacity: 0;
}
 
// 當 checkbox 被點選時改變樣式

// 讓 hamburger 切換回復時也有動畫
 .hamburger > div {
   transition: all $all_animation_time ease;
 }
 
 // checkbox 被點選時中間線的變化
 .hamburger_check:checked + .hamburger > div {
   transform: rotate(135deg);
   transition: all $all_animation_time ease;
 }
 
  // checkbox 被點選時上線的變化
 .hamburger_check:checked + .hamburger > div:before {
   top: 0;
   transform: rotate(90deg);
   transition: all $all_animation_time ease;
 }

  // checkbox 被點選時下線的變化
 .hamburger_check:checked + .hamburger > div:after {
   top: 0;
   transform: rotate(90deg);
   transition: all $all_animation_time ease;
 }

// 購物車彈窗_外容器
.shooping_cart_alert_box{
    position: absolute;
    top: 92px;
    right: 0px;

    @include mobile(){
      width: 100%;
      padding: 0 5px;
    }


}


////////* rwd_menu_V1 *///////////

.rwd_menu_V1{
   position: absolute;
   top: 0;
   width: 100%;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   visibility: hidden;
   transition: all $all_animation_time ease;
   transform-origin: right top;
   transform: scale(0);
   z-index:1061;
}
.rwd_menu_bg_V1{
//    margin-top: 72px;
   background-color: $primary-200;
   position: absolute;
   width: 100%;
   height: 100vh;
   transform-origin: right top;
   transform: scale(0);
   transition: all $all_animation_time ease;
}


.rwd_menu_content{
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: flex-start;
   margin-top: 112px;
   padding: 0 40px;
   z-index: 2;
}

.tittle_box{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   color: $primary-950;
   text-align: left;
   font-feature-settings: 'liga' off, 'clig' off;
   gap: 25px;
}


.tittle_box > .missions{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
}

.tittle_box > .missions > .router_link > .mission_text{

    color: $primary-400;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: $font-dela;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 25px */
}

.rwd_menu_content > .icon_box {

    display: flex;
    flex-direction: column;
    gap: 15px;
}

.rwd_menu_content > .icon_box > .icon{
   display: flex;
   padding: 4px;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   gap: 12px;
   border-radius: 20px;
   background: $primary-400;
}

.bg_image{
   position: relative;
   width: 100%;
   height: 100%;
}

.blue_man{
   display: inline-block;
   position: absolute;
   right: 0;
   bottom: 0;
   z-index: 2;
   text-align: right;
}

.yellow_man{
   display: inline-block;
   position: absolute;
   right: 150px;
   bottom: 5px;
   z-index: 1;
   text-align: right;
}

.blue_man>img{
   display: inline-block;
   width: 100%;
}

.yellow_man>img{
   display: inline-block;
   width: 100%;
}

.rwd_header{
   background-color: transparent;
}

.rwd_hamburger >div{
   background-color: $primary-400
}

.rwd_hamburger >div::after{
   background-color: $primary-400
}



header > nav > .shopping_cart{
   cursor: pointer;
}


// 斷點 945

@media screen and (max-width: 945px) {
   
   nav{
      display: none;
   }
   .hamburger_box{
      display: flex;
   }

 }

 // 

 @media screen and (max-height: 800px) {
    .tittle_box{gap: 10px;}
    .rwd_menu_content{
        margin-top: 100px;
    }
    .blue_man>img{width: 80%;}
    .yellow_man>img{width: 80%;}
 }

 // 取消 router-link 的預設樣式
a:-webkit-any-link {
    text-decoration: none;
color: inherit;
}



</style>









