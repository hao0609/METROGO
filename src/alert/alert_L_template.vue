<script setup>
import { ref } from 'vue'
import alert_web_L from '../components/alert_web_L.vue';

import sampleImg from '@/assets/images/sample.jpg';  // 引用圖片範例

import { useRouter } from "vue-router";



// 自定義 Title1 / 列的內容 /  按鈕文字 / 按鈕功能


// 按鈕_右 所執行的功能

    //   const router = useRouter();
    const function_1 = () => {
      console.log("執行第一個功能");

    //   router.push('/login');   // Vue Router 內部導航  
  }


// 按鈕_左 所執行的功能

  const function_2 = () => {
      console.log("執行第二個功能");

  }

const AlertInfo = {

    Title1: "Title1",
    rowData1: {
        Title2: "Title2 (Optional)",
        Text: "This is a dynamic message passed from the parent component.",
        ImgSrc: sampleImg,
    },
    rowData2 :{
    Title2: "Title2 (Optional)",
    Text: "This is a dynamic message passed from the parent component.This is a dynamic message passed from the parent component.This is a dynamic message passed from the parent component.This is a dynamic message passed from the parent component.",
    ImgSrc: sampleImg
    },
    ButtonText: "按鈕文字",
    function_2: function_2,
    function_1: function_1,
}

const alert_web_L_content = ref(null);
const Alert_L_template_ShowAlert = () => {
    alert_web_L_content.value.showAlert();
}

defineExpose({                                                // 暴露 Alert_L_template_ShowAlert 方法給父組件使用
    Alert_L_template_ShowAlert,
});
</script>


<template>
    <alert_web_L ref="alert_web_L_content" :alertInfo="AlertInfo"/>
</template>

