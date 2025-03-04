<script setup>
    import { ref,onMounted } from 'vue'
    import ground from '../../assets/images/MessionGeneral/ground.png';
    import building_tree from '../../assets/images/MessionGeneral/building_tree.png'
    import road from '../../assets/images/MessionGeneral/road.png';
    import bridge from '../../assets/images/MessionGeneral/bridge.png';
    import station_red from '../../assets/images/MessionGeneral/station_red.vue';
    import logo from '../../assets/images/MessionGeneral/logo.vue';

    import { gelocation } from "../../js/view/MissionGeralView/geolocation";

    import pin from '../../assets/images/MessionGeneral/pin.vue';
    import { pinjs,locationInfo } from '../../js/view/MissionGeralView/pin.js'             // 引入 pin.js


    const pinStyle_red = ref(null);
    const locationInfobox_style = ref(null);

    let geoWatcher = null; // 用於存儲 geolocation 的 watchPosition 監聽器 ID

    let station_result = '';

    
    const updateLocation = async () =>{


        try {
            
            const nearbyStation = await gelocation(); // 等待 `gelocation()` 完成
            console.log("最近的捷運站:", nearbyStation);

             pinStyle_red.value = pinjs(nearbyStation).pinStyle_red.value
            
             station_result = nearbyStation
             
            
        } catch (error) {
            console.error("獲取位置失敗:", error);
        }
    };

    
    locationInfobox_style.value = locationInfo().locationInfobox_style.value;  // 使用 pin.js 的 locationInfobox_style()
    

    import alert_positioning_successful from '@/alert/alert_positioning_successful.vue';        // 引入用戶定位成功彈窗

    const alert_web_M_userlocation = ref(null);                               
        const UserLocationSuccessful = () => {
        alert_web_M_userlocation.value.UserLocationSuccessful();  

    }

    onMounted(() => {
        updateLocation();

        if (navigator.geolocation) {
            geoWatcher = navigator.geolocation.watchPosition(
                async (position) => {
                    console.log("位置變更");
                    await updateLocation(); // 當位置改變時更新 `station_result`
                },
                (error) => {
                    console.error("監聽位置變更失敗:", error);
                },
                { enableHighAccuracy: true, maximumAge: 0 }
            );
        } else {
            console.warn("瀏覽器不支援 Geolocation API");
        }
    });

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
                            <div class="lat"><span class="tittle">緯度</span> <span class="value">23.8777</span></div>
                            <div class="lng"><span class="tittle">經度</span> <span class="value">123.8777</span></div>
                        </div>
                    </div>
                    <div class="nearStation">距離最近的捷運站是: <span class="value">南港軟體園區</span></div>
                    <div class="neardiff">距離約 <span class="value">8000</span> 公尺</div>

                </div>
            </div>
        </div>
        <div class="item">
            <station_red class="station"/>
        </div>
        <div class="item">
            <img :src=building_tree class="bg_image" >
        </div>
        <div class="item">
            <logo class="logo"/>
        </div>
    </div>
    <div class="hitarea">
        <button ref="pin_obj" class="pin" :style="pinStyle_red" @click="UserLocationSuccessful" @touchstart="UserLocationSuccessful" ><pin/></button>
        <!-- <pin/> -->
    </div>
      <alert_positioning_successful ref="alert_web_M_userlocation" :nearby_station="station_result"/>  
</template>

<style lang="scss" scoped>
    @import "@/assets/sass/base/_color.scss";
    @import "@/assets/sass/base/_font.scss";

    @import "@/assets/sass/page/_mission-general-wrapper.scss";

</style>