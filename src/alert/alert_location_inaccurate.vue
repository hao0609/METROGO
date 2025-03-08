<script setup>
import { ref } from 'vue'
import alert_web_M from '../components/alert_web_M.vue';

// 按鈕 所執行的功能

const function_1 = () => {


}

const locationAlertInfo = {
    fristTitle: '定位不準確',
    svg_icon: `
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="75" stroke="#7D8A93" stroke-width="10"/>
        <path d="M63.2393 73.1818C63.2393 76.88 64.7084 80.4268 67.3234 83.0418C69.9385 85.6569 73.4852 87.126 77.1835 87.126C80.8817 87.126 84.4285 85.6569 87.0435 83.0418C89.6586 80.4268 91.1277 76.88 91.1277 73.1818C91.1277 69.4835 89.6586 65.9368 87.0435 63.3217C84.4285 60.7067 80.8817 59.2375 77.1835 59.2375C73.4852 59.2375 69.9385 60.7067 67.3234 63.3217C64.7084 65.9368 63.2393 69.4835 63.2393 73.1818Z" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M91.1134 111.84L83.7555 119.198C82.0124 120.939 79.6493 121.917 77.1854 121.917C74.7215 121.917 72.3585 120.939 70.6154 119.198L50.8889 99.4759C46.5553 95.1416 43.3603 89.8033 41.5882 83.9359C39.8161 78.0685 39.5217 71.8541 40.7315 65.8455C41.9412 59.8369 44.6174 54.2205 48.522 49.4961C52.4266 44.7716 57.4384 41.0856 63.1117 38.7659C68.7849 36.4463 74.9436 35.565 81.0397 36.2004C87.1358 36.8358 92.9803 38.9683 98.0533 42.4081C103.126 45.8479 107.27 50.4883 110.116 55.9164C112.963 61.3446 114.423 67.3922 114.368 73.5211M109.72 124.311V124.357M109.72 110.366C111.803 110.36 113.825 109.654 115.46 108.363C117.095 107.071 118.25 105.269 118.739 103.243C119.229 101.218 119.025 99.0868 118.16 97.1912C117.295 95.2955 115.819 93.7448 113.968 92.7873C112.119 91.8401 110.004 91.5464 107.966 91.954C105.929 92.3616 104.09 93.4466 102.748 95.0324" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
    SecondTittle: '您的裝置目前定位位置不準確',
    ThirdTittle: '請確認您的裝置定位功能是否須重啟，獲取更精準的定位位置!!',
    ButtonText: 'OK !',
    allowOutsideClick: true,  
    function:function_1 ,
}

const alert_web_M_content = ref(null);
const UserLocationInaccurate = () => {
    alert_web_M_content.value.showAlert();
}

defineExpose({                                                // 暴露 UserLocationShowAlert 方法給父組件使用
  UserLocationInaccurate
});
</script>


<template>
    <alert_web_M ref="alert_web_M_content" :alertInfo="locationAlertInfo"/>
</template>

