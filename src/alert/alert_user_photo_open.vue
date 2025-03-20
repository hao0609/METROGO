<script setup>
import { ref } from "vue";
import alert_web_M from "../components/alert_web_M.vue";

// 按鈕 所執行的功能

const function_1 = () => {
  console.log("執行功能");
};

const PhotoOpenAlertInfo = {
  fristTitle: "允許取用照片",
  svg_icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="196" height="196" viewBox="0 0 196 196" fill="none">
  <path d="M47.5032 152.997H149.497C161.813 152.997 168 146.841 168 134.646V62.3519C168 50.156 161.813 44 149.497 44H47.5032C35.2473 44.0025 29 50.1005 29 62.3519V134.648C29 146.902 35.2473 152.997 47.5032 152.997ZM73.1914 99.9525C65.1792 99.9525 58.6377 93.3822 58.6377 85.3291C58.6377 77.3366 65.1792 70.7056 73.1939 70.7056C81.1483 70.7056 87.6872 77.3366 87.6872 85.3316C87.6872 93.3822 81.1483 99.9525 73.1914 99.9525ZM47.6213 143.467C41.9648 143.467 38.4879 140.031 38.4879 134.229V130.616L56.5763 114.753C59.1682 112.444 61.9965 111.259 64.6488 111.259C67.477 111.259 70.4813 112.444 73.0757 114.871L84.3888 125.052L112.496 99.95C115.439 97.3456 118.68 96.1609 121.981 96.1609C125.221 96.1609 128.58 97.4037 131.408 100.011L158.51 125.231V134.35C158.51 140.034 154.977 143.467 149.379 143.467H47.6213Z" fill="#7D8A93"/>
</svg>
        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
  SecondTittle: "您的裝置需允許照片取用",
  ThirdTittle: "需開啟照片取用權限，才能從相簿中上傳照片",
  ButtonText: "OK !",
  allowOutsideClick: true,
  function: function_1,
};

const alert_web_M_content = ref(null);
const PhotoOpenShowAlert = () => {
  alert_web_M_content.value.showAlert();
};

defineExpose({
  // 暴露 PhotoOpenShowAlert 方法給父組件使用
  PhotoOpenShowAlert,
});
</script>

<template>
  <alert_web_M ref="alert_web_M_content" :alertInfo="PhotoOpenAlertInfo" />
</template>
