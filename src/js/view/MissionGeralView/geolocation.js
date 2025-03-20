import { ref,defineExpose} from "vue";
import metro_station_locationData from '@/json/metro_station.json';
// import pin from '../../assets/images/MessionGeneral/pin.vue';
import { pinjs } from './pin.js'             // 引入 pin.js
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




const watchId = ref(null);         // watchID 是 watch定位監聽器編號

const No_Station = ref(null);      // 用戶沒有在捷運站點附近

export function gelocation() {
    
            console.log("執行 gelocation");
            
            const lat = ref(0)              // lat 緯度
            const lng = ref(0)              // lng 經度
            const accuracy = ref(0)         // accuracy 精準度
            const nearby_station = ref(""); // ✅ 提升作用域，確保函式能返回正確值

            

            // 判斷用戶在附近的捷運站結果

            // geolocation API 的細部設定參數
            const options = {                   
                enableHighAccuracy: false,    // 進行高精度定位
                timeout: Infinity,              // 超過 10 秒後停止定位
                maximumAge: Infinity            // 定位資料的有效期限，超過此期限後重新定位
            }


            return new Promise((resolve, reject) => {
                // 判斷瀏覽器是否支援 geolocation API 
                if ("geolocation" in navigator) {
                    
                    
                    console.log(`OK! geolocation API is Support!`);

                
                    if (watchId.value !== null) {
                        console.log(watchId.value);
                        
                        navigator.geolocation.clearWatch(watchId);
                        console.log("📍 舊的 watchPosition 監聽器已清除");
                    }
                    
                    // setTimeout(() => {

                        watchId.value = navigator.geolocation.watchPosition(
                            (pos) => success_getlocation(pos,resolve),
                            (error) => error_getlocation(error,reject),
                            options
                        )
                        console.log(watchId.value);
                        
                        
                    // }, 5000);
                }
            });
            
            
            // 成功取得用戶定位
            function success_getlocation(pos, resolve){
                lat.value = pos.coords.latitude
                lng.value = pos.coords.longitude
                accuracy.value = pos.coords.accuracy


                const printAllStation = () => {
                    // console.log("執行 printAllStation");
                    
                    let closest_station = ""
                    let min_distance = Infinity; // 初始設為無限大，確保後續計算時能找到最小值
                    
                    metro_station_locationData.metro_lines.forEach(line => {
                        line.stations.forEach(station => {
                            // console.log(station.station_name);
                            let dist = getDistanceFromLatLon(lat.value, lng.value, station.latitude, station.longitude)
                            // console.log("距離 : "+dist+"公尺");

                            if (dist<500 && dist<min_distance) {
                                min_distance = dist;
                                closest_station = station.station_name;
                                No_Station.value = false
                                nearby_station.value = closest_station;
                            }else if (dist<min_distance) {
                                min_distance = dist;
                                closest_station = station.station_name;
                                No_Station.value = true
                                nearby_station.value = closest_station;
                            }
                        })
                    });

                    resolve({station: nearby_station.value, distance: min_distance, No_Station: No_Station.value }); // ✅ 確保 `printAllStation` 執行完後回傳值
        
                }
                printAllStation();

                // let dist = getDistanceFromLatLon(lat.value, lng.value, lat2, lon2)

                


                // if (accuracy.value>100) {       // 當精準度 > 100 時，彈出位置不準確視窗 ( 先不加入 )

                //     console.log("位置定位不準確");

                //     if (alertInstance_locationinaccurat) {                       // 確保 alertInstance 有接收到彈窗組件
                //         alertInstance_locationinaccurat.UserLocationInaccurate(); // 使用 Vue 组件方法
                //       } else {
                //         console.error("彈窗組件未成功傳遞");
                //       }
                // }
            
            }

            // 計算用戶與捷運站的距離
            function getDistanceFromLatLon (lat1, lon1, lat2, lon2){


                const R = 6371000; // 地球半徑 (公尺)
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLon = (lon2 - lon1) * Math.PI / 180;
                const a = 
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                
                return  parseInt(R * c); // 距離（公尺）
            }

            // const clearWatch = () => {
            //     console.log("清除監聽器");
                
            //     navigator.geolocation.clearWatch(watchId.value);
            // }


            // 定位失敗
            function error_getlocation(error) {
                console.log(error.message);
                
                console.log("用戶位置定位失敗");
                if (alertInstance_userlocation) {                       // 確保 alertInstance 有接收到彈窗組件
                    alertInstance_userlocation.UserLocationShowAlert(); // 使用 Vue 组件方法
                } else {
                    console.error("彈窗組件未成功傳遞");
                }
            }

        }




