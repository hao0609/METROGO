<script setup>
import { ref } from 'vue'
import alert_web_M from '../Alert_web_M.vue';
import { useRouter } from "vue-router";

// 按鈕 所執行的功能

const router = useRouter();
const function_1 = () => {
//   console.log("執行第一個功能");

   router.push('/login');   // Vue Router 內部導航  
}


const userAlertInfo = {
    fristTitle: '尚未登入',
    svg_icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80.5" r="72.5" stroke="#E3002C" stroke-width="15"/>
        <path d="M95.3106 88.4924C100.242 88.4927 104.984 90.4426 108.546 93.9355C112.108 97.4283 114.216 102.194 114.43 107.24L114.449 108.091V112.01C114.45 113.988 113.72 115.893 112.407 117.343C111.094 118.793 109.294 119.681 107.368 119.83L106.794 119.849H53.2053C51.2739 119.85 49.4137 119.103 47.9975 117.758C46.5813 116.413 45.7138 114.57 45.5689 112.598L45.5498 112.01V108.091C45.5501 103.04 47.4543 98.185 50.8652 94.5374C54.2762 90.8897 58.9307 88.7312 63.8579 88.512L64.6886 88.4924H95.3106ZM79.9996 41.457C85.0755 41.457 89.9435 43.5218 93.5327 47.1972C97.1219 50.8725 99.1383 55.8574 99.1383 61.0551C99.1383 66.2529 97.1219 71.2377 93.5327 74.9131C89.9435 78.5884 85.0755 80.6532 79.9996 80.6532C74.9236 80.6532 70.0556 78.5884 66.4664 74.9131C62.8772 71.2377 60.8608 66.2529 60.8608 61.0551C60.8608 55.8574 62.8772 50.8725 66.4664 47.1972C70.0556 43.5218 74.9236 41.457 79.9996 41.457Z" fill="#E3002C"/>
        </svg>   
        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
    SecondTittle: '您尚未登入',
    ThirdTittle: '若要遊玩積分遊戲，請先登入會員',
    ButtonText: '前往登入',
    allowOutsideClick: false,   //強迫用戶無法點選空白處關閉視窗，只能進行登入
    function: function_1,
}

const alert_web_M_content = ref(null);
const UserLoginShowAlert = () => {
    alert_web_M_content.value.showAlert();
}


defineExpose({                                                // 暴露 UserLoginShowAlert 方法給父組件使用
    UserLoginShowAlert,
});

</script>


<template>
    <alert_web_M ref="alert_web_M_content" :alertInfo="userAlertInfo"/>
</template>



