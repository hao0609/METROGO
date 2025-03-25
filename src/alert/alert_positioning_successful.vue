<script setup>
import { ref ,watch,onMounted} from 'vue'
import alert_web_M from '../components/alert_web_M.vue';


// 用戶登入狀態取得
import { inject } from "vue";       // 使用 inject 來接 app.vue provide 的 user 狀態
const user_status = inject("user"); // 取得用戶狀態
const pinStyle_red = inject("pinStyle_red");                // 取得紅線的 Pin 樣式
const pinStyle_green = inject("pinStyle_green");            // 取得綠線的 Pin 樣式
const pinStyle_blue = inject("pinStyle_blue");              // 取得藍線的 Pin 樣式
const pinStyle_yellow = inject("pinStyle_yellow");          // 取得黃線的 Pin 樣式
const pinStyle_brown = inject("pinStyle_brown");            // 取得棕線的 Pin 樣式

const userTotalPoint = inject("userTotalPoint");            // 取得用戶總積分

import updateUserDB_StationStatus from '../js/view/MissionGeralView/updateUserDB_StationStatus.js'

import getStationScore from '../js/view/MissionGeralView/getStationPoint.js'

import updateUserDB_addUserPoint from '../js/view/MissionGeralView/updateUserDB_addUserPoint.js'



import { pinjs} from '../js/view/MissionGeralView/pin.js'             // 引入 pin.js

// 接收來自父組件的 `nearby_station`
const props = defineProps({
    nearby_station: String
});

// 按鈕 所執行的功能

const function_1 = () => {
    const currentUser = user_status.value.uid
    // console.log("打卡彈窗按鈕的 UserID :" + currentUser);
    // console.log("打卡彈窗按鈕的 nearby_station :" + props.nearby_station);
    
    // 更新用戶會員資料表的一般任務遊戲進度打卡狀態
    updateUserDB_StationStatus(currentUser,props.nearby_station);

    
    // 取得用戶總積分
    console.log("彈窗取得用戶總積分 :" + userTotalPoint.value);

    // 取得用戶目前打卡的站點獎勵積分
    const stationPoint = getStationScore(props.nearby_station).獎勵積分;
    console.log(stationPoint);

    // 取得用戶目前打卡的站點捷運站編號

    const stationID = getStationScore(props.nearby_station).捷運站編號;
    console.log(stationID);
    

    // 在頁面上顯示的目前積分加上 站點積分    

    
    // 實際更新會員資料的總積分
    updateUserDB_addUserPoint(currentUser,userTotalPoint.value += stationPoint)
    
    // 打卡完把 Pin 座標給隱藏   

    if (pinStyle_red) pinStyle_red.value = pinjs("")?.pinStyle_red?.value;
    if (pinStyle_green) pinStyle_green.value = pinjs("")?.pinStyle_green?.value;
    if (pinStyle_blue) pinStyle_blue.value = pinjs("")?.pinStyle_blue?.value;
    if (pinStyle_yellow) pinStyle_yellow.value = pinjs("")?.pinStyle_yellow?.value;
    if (pinStyle_brown) pinStyle_brown.value = pinjs("")?.pinStyle_brown?.value;


    // 把目前打卡的站點完成旗標秀出來

    const done_flagElement = document.querySelector(`#${stationID}`);

    if (done_flagElement) {
        document.querySelector(`#${stationID}`).style.display = "inline-block";
    }       


    
};

const locationAlertInfo = {
    fristTitle: '定位成功',
    svg_icon: `
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M79.9997 13.3335C43.333 13.3335 13.333 43.3335 13.333 80.0002C13.333 116.667 43.333 146.667 79.9997 146.667C116.666 146.667 146.666 116.667 146.666 80.0002C146.666 43.3335 116.666 13.3335 79.9997 13.3335ZM79.9997 133.334C50.5997 133.334 26.6663 109.4 26.6663 80.0002C26.6663 50.6002 50.5997 26.6668 79.9997 26.6668C109.4 26.6668 133.333 50.6002 133.333 80.0002C133.333 109.4 109.4 133.334 79.9997 133.334ZM110.6 50.5335L66.6663 94.4668L49.3997 77.2668L39.9997 86.6668L66.6663 113.334L120 60.0002L110.6 50.5335Z" fill="#00C9A7"/>
            </svg>

        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
    SecondTittle: `您目前定位於 <br> "${props.nearby_station}" 捷運站`,
    ThirdTittle: '點擊完成定位任務!',
    ButtonText: '完成 !',
    allowOutsideClick: false,  
    function:function_1 ,
}

// 監聽 `nearby_station`，當它變化時，動態更新 `locationAlertInfo`
watch(() => props.nearby_station, (newStation) => {
    locationAlertInfo.SecondTittle = `您目前定位於 <br> "${newStation}" 捷運站`;
});

const alert_web_M_content = ref(null);
const UserLocationSuccessful = () => {
    alert_web_M_content.value.showAlert();
}

defineExpose({                                                // 暴露 UserLocationSuccessful 方法給父組件使用
    UserLocationSuccessful,
    function_1,
});
</script>


<template>
    <alert_web_M ref="alert_web_M_content" :alertInfo="locationAlertInfo"/>
</template>

