<template>
  <div class="backend-container">
    <div class="backend-login">
      <div class="backend-login-logo">
        <!-- <img src="../assets/images/backend_enter.svg" alt="" /> -->
        <Router-Link to="/" class="logo"><icon_white></icon_white></Router-Link>
      </div>
      <div class="backend-login-content">
        <div class="backend-login-info">
          <div class="backend-login-input">
            <div class="form-group">
              <label class="input-label">帳號</label>
              <div class="input-wrapper">
                <input
                  v-model="admin_name"
                  type="text"
                  class="input-field"
                  placeholder="username"
                  @input="clearError"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="input-label">密碼</label>
              <div class="input-wrapper">
                <input
                  v-model="admin_password"
                  type="password"
                  class="input-field"
                  placeholder="password"
                  @input="clearError"
                />
              </div>
            </div>
          </div>
          <button @click="login" class="btn_white">登入</button>
          <!-- <router-link to="/admin/dashboard" class="btn_white">登入</router-link> -->
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <p v-else class="error-placeholder"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon_white from "../components/icons/icon_white.vue";

export default {
  components: {
    icon_white,
  },
  data() {
    return {
      admin_name: "",
      admin_password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // 設定測試帳號 admin / 0000
      const testAdmin = { admin_name: "admin", admin_password: "0000" };

      if (
        this.admin_name === testAdmin.admin_name &&
        this.admin_password === testAdmin.admin_password
      ) {
        alert("登入成功");
        localStorage.setItem("admin", JSON.stringify(testAdmin)); // 儲存登入資訊
        this.$router.push("/admin/user"); // 轉跳到後台
      } else {
        this.errorMessage = "你的帳號密碼輸入錯誤";
      }
    },
    clearError() {
      this.errorMessage = ""; // 清空錯誤訊息
    },
  },
};
</script>
<style lang="scss" scoped>
@use "../assets/sass/page/backend-login";

</style>


