import { ref } from "vue";

let alertInstance_locationinaccurat = null;

// export setAlertInstance_location_inaccurate 給 MissionGeralView.vue 來傳遞組件實例
export const setAlertInstance_location_inaccurate = (instance) => {
    alertInstance_locationinaccurat = instance;
};

let alertInstance_userlocation = null;

// export setAlertInstance_userlocation 給 MissionGeralView.vue 來傳遞組件實例
export const setAlertInstance_userlocation = (instance) => {
    alertInstance_userlocation = instance;
  };




export function gelocation() {
    

        const lat = ref(0)              // lat 緯度
        const lng = ref(0)              // lng 經度
        const accuracy = ref(0)         // accuracy 精準度

        // geolocation API 的細部設定參數
        const options = {                   
            enableHighAccuracy: true,    // 進行高精度定位
            timeout: 60000,              // 超過 60 秒後停止定位
            maximumAge: 60000            // 定位資料的有效期限，超過此期限後重新定位
        }

        // 判斷瀏覽器是否支援 geolocation API 
        if ("geolocation" in navigator) {

            console.log(`OK! geolocation API is Support!`);

            navigator.geolocation.watchPosition(
                (pos) => success_getlocation(pos),
                () => error_getlocation(),
                options
            )
            
            // 成功取得用戶定位
             const success_getlocation = (pos) =>{
                lat.value = pos.coords.latitude
                lng.value = pos.coords.longitude
                accuracy.value = pos.coords.accuracy

                console.log(lat.value,lng.value,accuracy.value);



                // if (accuracy.value>100) {       // 當精準度 > 100 時，彈出位置不準確視窗 ( 先不加入 )

                //     console.log("位置定位不準確");

                //     if (alertInstance_locationinaccurat) {                       // 確保 alertInstance 有接收到彈窗組件
                //         alertInstance_locationinaccurat.UserLocationInaccurate(); // 使用 Vue 组件方法
                //       } else {
                //         console.error("彈窗組件未成功傳遞");
                //       }
                // }
            }


            // 定位失敗
            const error_getlocation = () => {
                console.log("用戶位置定位失敗");
                if (alertInstance_userlocation) {                       // 確保 alertInstance 有接收到彈窗組件
                    alertInstance_userlocation.UserLocationShowAlert(); // 使用 Vue 组件方法
                  } else {
                    console.error("彈窗組件未成功傳遞");
                  }
            }
        }

}

