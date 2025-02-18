<script setup>
import { ref } from 'vue'
import alert_mobile from '../components/alert_mobile.vue';

import sampleImg from '@/assets/images/sample.jpg';  // 引用圖片範例
import { useRouter } from "vue-router";


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


  //自定義的內容
  const AlertInfo = {
  showCloseButton: false,
  Title_H2: "H2H2",           //若不要顯示 H2 標題,則設為空字串
  ImgSrc: sampleImg,
  showTextBox:true,           //若不要顯示下方文字區域,則設為 false
  Title1: "Title1 (optional)",
  Title2: "Title2Title2Title2Title2Title2Title2Title2Title2",
  showCancelButton: true,
  Button1_Text: "關閉",
  Button2_Text: "按鈕文字",
  function_2: function_2,
  function_1: function_1,

};


const alert_mobile_content = ref(null);
const Alert_mobile_template_ShowAlert = () => {
    alert_mobile_content.value.showAlert();
}

defineExpose({                                                // 暴露 Alert_mobile_template_ShowAlert 方法給父組件使用
    Alert_mobile_template_ShowAlert,
});
</script>


<template>
    <alert_mobile ref="alert_mobile_content" :alertInfo="AlertInfo"/>
</template>

