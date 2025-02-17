<template>
  <div class="backend-container">
    <div class="backend-login">
      <div class="backend-login-logo">
        <img src="../assets/images/backend_enter.svg" alt="" />
      </div>
      <div class="backend-login-content">
        <div class="backend-login-info">
          <div class="backend-login-input">
            <div class="form-group">
              <label class="input-label">帳號</label>
              <div class="input-wrapper">
                <input type="text" class="input-field" placeholder="username" />
              </div>
            </div>
            <div class="form-group">
              <label class="input-label">密碼</label>
              <div class="input-wrapper">
                <input type="password" class="input-field" placeholder="password" />
              </div>
            </div>
          </div>
          <button class="btn_white">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/backend-login";
</style>
