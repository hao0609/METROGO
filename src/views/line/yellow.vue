<script setup>
    import { ref } from 'vue'
    import ground from '../../assets/images/MessionGeneral/ground.png';
    import building_tree from '../../assets/images/MessionGeneral/building_tree.png'
    import road from '../../assets/images/MessionGeneral/road.png';
    import bridge from '../../assets/images/MessionGeneral/bridge.png';
    import station_yellow from '../../assets/images/MessionGeneral/station_yellow.vue';
    import logo from '../../assets/images/MessionGeneral/logo.vue';
    import pin from '../../assets/images/MessionGeneral/pin.vue';
    import { pinjs } from '../../js/view/MissionGeralView/pin.js'             // 引入 pin.js
    const { pinStyle } = pinjs();                             // 使用 pin.js 的 pin()
    import alert_user_location from '@/alert/alert_user_location.vue';

    const alert_web_M_userlocation = ref(null);
    const UserLocationShowAlert = () => {
    alert_web_M_userlocation.value.UserLocationShowAlert();  
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
            <station_yellow class="station"/>
        </div>
        <div class="item">
            <img :src=building_tree class="bg_image" >
        </div>
        <div class="item">
            <logo class="logo"/>
        </div>
    </div>
    <div class="hitarea">
        <!-- <button ref="pin_obj" class="pin" :style="pinStyle" @click="UserLocationShowAlert" @touchstart="UserLocationShowAlert" ><pin/></button> -->
        <!-- <pin/> -->
    </div>
    <alert_user_location ref="alert_web_M_userlocation"/> 
</template>
