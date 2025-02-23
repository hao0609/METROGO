<script setup>
    import { ref,watch } from 'vue'
    import ground from '../../assets/images/MessionGeneral/ground.png';
    import building_tree from '../../assets/images/MessionGeneral/building_tree.png'
    import road from '../../assets/images/MessionGeneral/road.png';
    import bridge from '../../assets/images/MessionGeneral/bridge.png';
    import station_red from '../../assets/images/MessionGeneral/station_red.vue';
    import logo from '../../assets/images/MessionGeneral/logo.vue';
    import pin from '../../assets/images/MessionGeneral/pin.vue';
    import { pinjs } from '../../js/view/MissionGeralView/pin.js'             // 引入 pin.js
    const { pinStyle_red } = pinjs();                             // 使用 pin.js 的 pin()




    import alert_positioning_successful from '@/alert/alert_positioning_successful.vue';        // 引入用戶定位成功彈窗

    const alert_web_M_userlocation = ref(null);                               
    const UserLocationSuccessful = () => {
    alert_web_M_userlocation.value.UserLocationSuccessful();  
    
    }

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
    <alert_positioning_successful ref="alert_web_M_userlocation"/> 
</template>

<style lang="scss" scoped>
    @import "@/assets/sass/base/_color.scss";
    @import "@/assets/sass/base/_font.scss";

    @import "@/assets/sass/page/_mission-general-wrapper.scss";
</style>