<script setup>
    import { ref,onMounted , onUnmounted ,watch,provide} from 'vue'
    import ground from '../../assets/images/MessionGeneral/ground.png';
    import building_tree from '../../assets/images/MessionGeneral/building_tree.png'
    import road from '../../assets/images/MessionGeneral/road.png';
    import bridge from '../../assets/images/MessionGeneral/bridge.png';
    import station_yellow from '../../assets/images/MessionGeneral/station_yellow.vue';
    import logo from '../../assets/images/MessionGeneral/logo.vue';
    import train1 from '../../assets/images/MessionGeneral/train1.vue';
    import train2 from '../../assets/images/MessionGeneral/train2.vue';
    import car1 from '../../assets/images/MessionGeneral/car1.vue'
    import car2 from '../../assets/images/MessionGeneral/car2.vue'
    import yellow_done from '../../assets/images/MessionGeneral/yellow_done.vue'



    import { gelocation } from "../../js/view/MissionGeralView/geolocation";

    import pin from '../../assets/images/MessionGeneral/pin.vue';
    import { pinjs,locationInfo } from '../../js/view/MissionGeralView/pin.js'             // 引入 pin.js

    import alert_user_location_stay from '@/alert/alert_user_location_stay.vue';  // 引入 alert_user_location 打開定位彈窗
    const alert_userlocation_stay_ref = ref(null);

    import alert_user_location_open from '@/alert/alert_user_location_open.vue';  // 引入 alert_user_location 打開定位彈窗
    const alert_userlocation_open_ref = ref(null);

    import alert_user_login from '../../alert/alert_user_login.vue';    // 引入 alert_user_login 登入提醒彈窗
    const alert_user_login_ref = ref(null);


    
    const pinStyle_yellow = ref(null);
    provide("pinStyle_yellow", pinStyle_yellow);      // 透過 `provide` 提供 `pinStyle_yellow`
    const locationInfobox_style = ref(null);

    let geoWatcher = null; // 用於存儲 geolocation 的 watchPosition 監聽器 ID

    let station_result = '';

    const latitude = ref(0);
    const longitude = ref(0);
    const closestStation = ref('');
    const dis = ref(0);

    const watchID = ref(0);


    // 用戶登入狀態取得
    import { inject } from "vue";       // 使用 inject 來接 app.vue provide 的 user 狀態
    const user_status = inject("user"); // 取得用戶狀態


    import checkUserDB_AllDoneStations from '../../js/view/MissionGeralView/checkUserDB_AllDoneStations.js'


    // 用戶定位座標物件位置判斷
    const updateLocation = async () =>{

        try {
            
            const result  = await gelocation(); // 等待 `gelocation()` 完成
            console.log(result);
            
            console.log("最近的捷運站:", result.station, "距離:", result.distance);

            if (result.No_Station == false) {

                // 拿取目前用戶已打卡的所有站點
                const userDB_AllDoneStations =  await checkUserDB_AllDoneStations(user_status.value.uid);
                
                // 判斷目前用戶在附近的捷運站有沒有在已打卡的所有站點中
                if (userDB_AllDoneStations.some(station => station.捷運站名稱 == result.station)) {

                    // 如果有，隱藏 pin 
                    pinStyle_yellow.value = pinjs("").pinStyle_yellow.value;

                }else{
                    // 如果沒有，顯示 pin 該在的位置 
                    pinStyle_yellow.value = pinjs(result.station).pinStyle_yellow.value;
                }

            }else{
                pinStyle_yellow.value = pinjs("").pinStyle_yellow.value;
               
            }

            station_result = result.station; // ✅ 更新最近的捷運站名稱
            closestStation.value = result.station; // ✅ 更新 Vue 變數
            dis.value = result.distance; // ✅ 更新距離
             
            
        } catch (error) {
            console.error("獲取位置失敗:", error);
        }
    };




    const GetUserPoint = async (uid) =>{ // 取得用戶點數

        try {

            const ref = db_ref(database,`會員資料/${uid}`);

            get(ref).then(snapshot => {
                if (snapshot.exists()) {
                    console.log(snapshot.val().點數積分);
                    
                }else{
                    console.log('No data available');
                    
                }
            }) .catch(why => console.log(`Error: ${why}` ))

        } catch (error) {
            console.log(error.message);
            
        }
    }


    locationInfobox_style.value = locationInfo().locationInfobox_style.value;  // 使用 pin.js 的 locationInfobox_style()
    

    import alert_positioning_successful from '@/alert/alert_positioning_successful.vue';        // 引入用戶定位成功彈窗

    const alert_web_M_userlocation = ref(null);                               
        const UserLocationSuccessful = () => {
        alert_web_M_userlocation.value.UserLocationSuccessful();  

    }

    // 引入 GSAP 
    import gsap from "gsap";
    import { MotionPathPlugin } from "gsap/MotionPathPlugin";

    // 註冊 MotionPathPlugin
    gsap.registerPlugin(MotionPathPlugin);

    const train_1_Ref = ref(null); // train_1 的 ref
    const train_2_Ref = ref(null); // train_2 的 ref

    const car_1_Ref = ref(null); // car_1 的 ref
    const car_2_Ref = ref(null); // car_2 的 ref


    // t1 左上捷運用時間線
    // t2 右下捷運用時間線
    // t3 右上車子用時間線
    // t4 左下車子用時間線


    let t1 = gsap.timeline({ repeat: -1 })
    let t2 = gsap.timeline({ repeat: -1,delay:5})
    let t3 = gsap.timeline({ repeat: -1,delay:3})
    let t4 = gsap.timeline({ repeat: -1,delay:2})




    onMounted(() => {       
        // updateLocation();


        // 捷運物件 ref ( 左上 & 右下)
        const  train_list =  [train_1_Ref.value.train,train_2_Ref.value.train]

        // 車子物件 ref ( 右上 & 左下)
        const  car_list = [car_1_Ref.value.car1,car_2_Ref.value.car2]

        // 第一次移動位置到停下來 ( 左上 & 右下)
        const motionPath_list_step1 = [

            {
                path: "#train1_road_path",
                align: "#train1_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -10,
                offsetY: -10,
                start: 1,
                end: 0.55, // 移動 80% 路徑後停止
            },
            {
                path: "#train2_road_path",
                align: "#train2_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -10,
                offsetY: -10,
                start: 1,
                end: 0.55, // 移動 80% 路徑後停止
            },
            {
                path: "#car1_road_path",
                align: "#car1_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -20,
                offsetY: -20,
                start: 1,
                end: 0.4, // 移動 80% 路徑後停止
            },
            {
                path: "#car2_road_path",
                align: "#car2_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -20,
                offsetY: -20,
                start: 1,
                end: 0.5, // 移動 80% 路徑後停止
            },
        ]

        // 第二次移動位置 ( 左上 & 右下)
        const motionPath_list_step2 = [

            {
                path: "#train1_road_path",
                align: "#train1_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -10,
                offsetY: -10,
                start: 0.55, // 從之前停下來的位置繼續
                end: 0, 
            },
            {
                path: "#train2_road_path",
                align: "#train2_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -10,
                offsetY: -10,
                start: 0.55, // 從之前停下來的位置繼續
                end: 0, 
            },
            {
                path: "#car1_road_path",
                align: "#car1_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -20,
                offsetY: -20,
                start: 0.4, // 從之前停下來的位置繼續
                end: 0, 
            },
            {
                path: "#car2_road_path",
                align: "#car2_road_path",
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                offsetX: -20,
                offsetY: -20,
                start: 0.5, // 從之前停下來的位置繼續
                end: 0, 
            },
        ]
        



            // 讓 右下捷運在開始動畫時，先跑出畫面外

            const getoutlist = [car_list[0],car_list[1],train_list[1]]

            gsap.set(getoutlist, {
            x: 1000,  // 離開畫面 (向左移動 100px)
            y: 1000,  // 離開畫面 (向上移動 100px)
            opacity: 1 // 確保它可見
            });


            // 左上捷運動畫流程

            t1.to(train_list[0], {
                motionPath: motionPath_list_step1[0],
                duration: 5, // 正常速度運行
                ease: "power1.inOut",
            })
            .to(train_list[0],{
                duration: 2, 
                ease: "power3.out", // 讓列車慢慢停止
            })
            .to({}, { duration: 3 }) // 停留 3 秒
            .to(train_list[0], {                                    
                motionPath: motionPath_list_step2[0],   // 讓列車繼續跑完剩下的路
                duration: 5,  // 再次移動
                ease: "power1.inOut",
            });


            // 右下捷運動畫流程

            t2.to(train_list[1], {
                motionPath: motionPath_list_step1[1],
                duration: 5, // 正常速度運行
                ease: "power1.inOut",
            })
            .to(train_list[1],{
                duration: 2, 
                ease: "power3.out", // 讓列車慢慢停止
            })
            .to({}, { duration: 3 }) // 停留 3 秒
            .to(train_list[1], {                                    
                motionPath: motionPath_list_step2[1],   // 讓列車繼續跑完剩下的路
                duration: 5,  // 再次移動
                ease: "power1.inOut",
            })



            // 右上車子動畫流程

            t3.to(car_list[0], {
                motionPath: motionPath_list_step1[2],
                duration: 5, // 正常速度運行
                ease: "power1.inOut",
            })
            .to(car_list[0],{
                duration: 2, 
                ease: "power3.out", // 讓列車慢慢停止
            })
            .to({}, { duration: 7 }) // 停留 7 秒
            .to(car_list[0], {                                    
                motionPath: motionPath_list_step2[2],   // 讓列車繼續跑完剩下的路
                duration: 5,  // 再次移動
                ease: "power1.inOut",
            });



            // 左下車子動畫流程

            t4.to(car_list[1], {
                motionPath: motionPath_list_step1[3],
                duration: 5, // 正常速度運行
                ease: "power1.inOut",
            })
            .to(car_list[1],{
                duration: 2, 
                ease: "power3.out", // 讓列車慢慢停止
            })
            .to({}, { duration: 7 }) // 停留 7 秒
            .to(car_list[1], {                                    
                motionPath: motionPath_list_step2[3],   // 讓列車繼續跑完剩下的路
                duration: 5,  // 再次移動
                ease: "power1.inOut",
            });




            // 檢查用戶有沒有登入的狀態
            const CheckUserStatus = async() => {
                console.log(user_status.value);
                
                if (user_status.value == null) {
            
                // 沒登入就跳登入提醒彈窗
                console.log("用戶沒登入");
                
                        alert_user_login_ref.value.UserLoginShowAlert();
                }else{
                        // 有登入再來判斷用戶定位是否在捷運站附近
                        // NO_location_alert()

                        // 取得目前用戶點數
                        GetUserPoint(user_status.value.uid)

                        // 取得目前用戶所有已打卡的站點
                        const userAllDoneStations = await checkUserDB_AllDoneStations(user_status.value.uid)

                        // 取得目前用戶所有已打卡的站點的編號，並根據該編號ID 連結對應旗標Element ID 並顯示出來
                        
                        userAllDoneStations.forEach(station => {

                            let stationID = station.捷運站編號

                            const done_flagElement = document.querySelector(`#${stationID}`);

                            if (done_flagElement) {
                                document.querySelector(`#${stationID}`).style.display = "inline-block";
                            }                    

                            
                        });

                        // 讓 yellow_done 的 SVG 各個捷運站編號 ID 的旗標通通顯示
                }
            }


            setTimeout(() => {
                CheckUserStatus();     //等 3 秒再執行判斷用戶是否登入
            },3000)     



            // 監聽用戶登入狀態
            watch(user_status, (newValue, oldValue) => {
            console.log("用戶登入狀態:", newValue);

                if (newValue == null) {
                    setTimeout(() => {
                        CheckUserStatus();
                    },3000)                    // 等 3 秒再執行登入判斷，避免執行其他彈窗時間重疊到
                    
                }
            });



        if (navigator.geolocation) {

            let lastLatitude = null;
            let lastLongitude = null;


            geoWatcher = navigator.geolocation.watchPosition(
                async (position) => {
                const newLatitude = parseFloat(position.coords.latitude.toFixed(4));
                const newLongitude = parseFloat(position.coords.longitude.toFixed(4));

                // **只有當經緯度變更時才執行更新**
                if (newLatitude !== lastLatitude || newLongitude !== lastLongitude) {
                    console.log(`位置變更: ${newLatitude}, ${newLongitude}`);

                    setTimeout(() => {
                             updateLocation(); // 當位置改變時更新 `station_result`
                    },1000)

                    latitude.value = newLatitude;
                    longitude.value = newLongitude;

                    // 更新上一次的位置
                    lastLatitude = newLatitude;
                    lastLongitude = newLongitude;
                };
                },
                (error) => {
                    console.error("監聽位置變更失敗:", error);
                    alert_userlocation_open_ref.value.UserLocationShowAlert();
                },
                { enableHighAccuracy: false, timeout: Infinity,maximumAge: Infinity }
            )
            watchID.value = geoWatcher;

        } else {
            console.warn("瀏覽器不支援 Geolocation API");
        }
    });

    onUnmounted(() => {
        navigator.geolocation.clearWatch(watchID.value); // 停止監聽Position(watchID.value);
        console.log("clearWatch:", watchID.value);

        // 確保頁面離開時所有動畫都被移除
        if (t1) t1.kill();
        if (t2) t2.kill();
        if (t3) t3.kill();
        if (t4) t4.kill();
        
    })
    
</script>

<template>
    <div class="wrapper">
        <div class="item">
            <img :src=ground class="bg_image" >
        </div>
        <div class="item">
            <img :src=road class="bg_image" >
        </div>
        <div class="item">
            <car1  ref="car_1_Ref"/>
            <car2  ref="car_2_Ref"/>
        </div>
        <div class="item">
            <img :src=bridge class="bg_image" >
        </div>
        <div class="item">
            <div class="closeStation_Info" :style="locationInfobox_style">
                <div class="closeStation_Info_box">
                    <div class="location_info">
                        <div class="icon">
                            <svg class="vector" width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 13.325C7.69488 13.325 6.92273 12.9694 6.35343 12.3365C5.78412 11.7036 5.46429 10.8451 5.46429 9.95C5.46429 9.05489 5.78412 8.19645 6.35343 7.56351C6.92273 6.93058 7.69488 6.575 8.5 6.575C9.30512 6.575 10.0773 6.93058 10.6466 7.56351C11.2159 8.19645 11.5357 9.05489 11.5357 9.95C11.5357 10.3932 11.4572 10.8321 11.3046 11.2416C11.1521 11.651 10.9285 12.0231 10.6466 12.3365C10.3647 12.6499 10.03 12.8985 9.66172 13.0681C9.29341 13.2377 8.89866 13.325 8.5 13.325ZM8.5 0.5C6.24566 0.5 4.08365 1.49562 2.48959 3.26784C0.895533 5.04006 0 7.4437 0 9.95C0 17.0375 8.5 27.5 8.5 27.5C8.5 27.5 17 17.0375 17 9.95C17 7.4437 16.1045 5.04006 14.5104 3.26784C12.9163 1.49562 10.7543 0.5 8.5 0.5Z" fill="#E3002C" />
                            </svg>
                            
                        </div>

                        <div class="location">
                            <div class="lat"><span class="tittle">緯度</span> <span class="value">{{ latitude }}</span></div>
                            <div class="lng"><span class="tittle">經度</span> <span class="value">{{ longitude }}</span></div>
                        </div>
                    </div>
                    <div class="nearStation">距離最近的捷運站是: <span class="value">{{closestStation}}</span></div>
                    <div class="neardiff">距離約 <span class="value">{{dis}}</span> 公尺</div>

                </div>
            </div>
        </div>
        <div class="item">
            <station_yellow class="station"/>
        </div>
        <div class="item">
            <yellow_done class="yellow_done"/>
        </div>
        <div class="item">
            <train1  ref="train_1_Ref"/>
            <train2  ref="train_2_Ref"/>
        </div>
        <div class="item">
            <img :src=building_tree class="bg_image" >
        </div>
        <div class="item">
            <logo class="logo"/>
        </div>
    </div>
    <div class="hitarea">
        <button ref="pin_obj" class="pin" :style="pinStyle_yellow" @click="UserLocationSuccessful" @touchstart="UserLocationSuccessful" ><pin/></button>
    </div>
    <alert_positioning_successful ref="alert_web_M_userlocation" :nearby_station="station_result"/> 

    <!-- 提醒用戶打開定位彈窗-->
    <alert_user_location_open ref="alert_userlocation_open_ref"/>

    <!-- 用戶登入提醒彈窗 -->
    <alert_user_login ref="alert_user_login_ref"/>

</template>

<style lang="scss" scoped>
    @import "@/assets/sass/base/_color.scss";
    @import "@/assets/sass/base/_font.scss";

    @import "@/assets/sass/page/_mission-general-wrapper.scss";
</style>