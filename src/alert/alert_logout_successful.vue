<script setup>
import { ref } from 'vue'
import alert_web_M from '../components/alert_web_M.vue';


// 按鈕 所執行的功能

const function_1 = ref(() => {

});

const AlertInfo = {
    fristTitle: '登出成功',
    svg_icon: `
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M79.9997 13.3335C43.333 13.3335 13.333 43.3335 13.333 80.0002C13.333 116.667 43.333 146.667 79.9997 146.667C116.666 146.667 146.666 116.667 146.666 80.0002C146.666 43.3335 116.666 13.3335 79.9997 13.3335ZM79.9997 133.334C50.5997 133.334 26.6663 109.4 26.6663 80.0002C26.6663 50.6002 50.5997 26.6668 79.9997 26.6668C109.4 26.6668 133.333 50.6002 133.333 80.0002C133.333 109.4 109.4 133.334 79.9997 133.334ZM110.6 50.5335L66.6663 94.4668L49.3997 77.2668L39.9997 86.6668L66.6663 113.334L120 60.0002L110.6 50.5335Z" fill="#00C9A7"/>
            </svg>

        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
    SecondTittle: `您已成功登出!`,
    ThirdTittle: '',
    ButtonText: 'OK !',
    allowOutsideClick: true,  
    function:function_1.value ,
}


const alert_web_M_content = ref(null);
const UserLogOutSuccessful = () => {
    alert_web_M_content.value.showAlert();
}

defineExpose({                                                // 暴露 UserLocationSuccessful 方法給父組件使用
    UserLogOutSuccessful,
    function_1,
});
</script>


<template>
    <alert_web_M ref="alert_web_M_content" :alertInfo="AlertInfo"/>
</template>

