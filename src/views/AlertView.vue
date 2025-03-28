<script setup>
import { ref } from "vue";

import alert_user_login from "../components/alert/Alert_User_Login.vue";
import alert_user_location from "../components/alert/Alert_User_Location.vue";
import alert_L_template from "../components/alert/Alert_L_Template.vue";
import alert_mobile_template from "../components/alert/Alert_Mobile_Template.vue";

// 子組件的實例參考
const alert_web_M_userlogin = ref(null);
const alert_web_M_userlocation = ref(null);
const alert_L_template_content = ref(null);
const alert_mobile_template_content = ref(null);

const UserLocationShowAlert = () => {
  alert_web_M_userlocation.value.UserLocationShowAlert();
};

const UserLoginShowAlert = () => {
  alert_web_M_userlogin.value.UserLoginShowAlert();
};

const Web_L_ShowAlert = () => {
  alert_L_template_content.value.Alert_L_template_ShowAlert();
};

const alert_mobile_ShowAlert = () => {
  alert_mobile_template_content.value.Alert_mobile_template_ShowAlert();
};
</script>

<template>
  <div class="box">
    <alert_user_login ref="alert_web_M_userlogin" />
    <alert_user_location ref="alert_web_M_userlocation" />
    <alert_L_template ref="alert_L_template_content" />
    <alert_mobile_template ref="alert_mobile_template_content" />

    <div class="alert">
      <button @click="Web_L_ShowAlert" class="showAlert">alert_web_L</button>

      <button @click="UserLocationShowAlert" class="showAlert">
        alert_web_M
      </button>

      <button @click="alert_mobile_ShowAlert" class="showAlert">
        alert_mobile
      </button>
    </div>
  </div>
</template>

<style>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.box > .navbar {
  font-family: "Dela Gothic One";
  flex-wrap: wrap;
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
}

.box > .alert {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  color: black;
}

.time {
  text-align: center;
}

.showAlert {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 25px;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border-radius: 5%;
  margin: 10px;
  cursor: pointer;
}
</style>
