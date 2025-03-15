<script>
import { RouterLink } from "vue-router";
import BackIcon from "@/components/icons/IconBack.vue";
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';

// 引入 firebase authentication 登入註冊驗證方法
import { auth } from '../firebase/firebaseConfig.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

// 引入自定義的工具模組
import { 
  initSignupData, 
  validateEmail, 
  validateSignupForm, 
  handleSignupAndSaveToFirebase 
} from "../js/view/signup.js";
import { 
  initPasswordVisibility, 
  initLoginData, 
  initForgotPasswordData,
  validateLoginForm
} from "../js/view/login.js";
import { error } from "jquery";


export default {
  name: "LoginView",
  components: {
    BackIcon,
    EyeoffIcon,
    EyeIcon,
  },
  data() {
    return {
      currentForm: 'login', // 預設顯示登入頁
      passwordVisible: initPasswordVisibility(), 
      login: initLoginData(),
      signup: initSignupData(),
      forgotPassword: initForgotPasswordData(),
      isLoading: false,
      message: {
        show: false,
        type: 'success', // 'success' 或 'error'
        text: ''
      }
    }
  },
  computed: {
    showBackButton() {
      // 在忘記密碼的兩個步驟都顯示返回按鈕
      return this.currentForm === 'forgotpw1' || this.currentForm === 'forgotpw2';
    }
  },
  methods: {
    switchForm(formName) {
      this.currentForm = formName;
      
      // 重置訊息
      this.resetMessage();
      
      // 切換表單時重置相應的表單數據
      if (formName === 'login') {
        // 重置登入表單
        Object.assign(this.login, initLoginData());
        // 重置密碼可見性
        this.passwordVisible.login = false;
      } else if (formName === 'signup') {
        // 重置註冊表單
        Object.assign(this.signup, initSignupData());
        // 重置密碼可見性
        this.passwordVisible.signup = false;
        this.passwordVisible.signupConfirm = false;
      } else if (formName === 'forgotpw1') {
        // 重置忘記密碼表單
        Object.assign(this.forgotPassword, initForgotPasswordData());
      }
    },
    goBack() {
      // 根據當前頁面決定返回的目標
      switch(this.currentForm) {
        case 'forgotpw2':
          this.switchForm('forgotpw1');
          break;
        case 'forgotpw1':
          this.switchForm('login');
          break;
      }
    },
    togglePasswordVisibility(field) {
      // 切換密碼可見性
      this.passwordVisible[field] = !this.passwordVisible[field];
    },
    // 顯示訊息
    showMessage(type, text, duration = 3000) {
      this.message = {
        show: true,
        type,
        text
      };
      
      // 自動隱藏訊息
      setTimeout(() => {
        this.resetMessage();
      }, duration);
    },
    // 重置訊息
    resetMessage() {
      this.message = {
        show: false,
        type: 'success',
        text: ''
      };
    },
    // 登入相關方法
    async handleLogin() {
      const isValid = validateLoginForm(this.login);
      if (isValid) {
        console.log('登入表單驗證通過', this.login);


        // 這邊是 Firebase Authentication 的登入驗證

        try{
          await signInWithEmailAndPassword(auth,this.login.email, this.login.password)
          this.showMessage('success', `登入成功!`);

            // 登入成功後，返回上一個瀏覽的頁面
            this.$router.go(-1)
  

        }catch(error){
            
            switch (error.code) {
                  case "auth/invalid-credential":
                    this.showMessage('error', `帳號或密碼錯誤，請再試一次！`);
                    break;
                  default:
                    this.showMessage('error', `登入失敗： ${error.message}`);
            }
        }
      }
    },
    // 註冊相關方法
    checkEmailFormat() {
      this.signup.isEmailValid = validateEmail(this.signup.email);
    },
    async handleSignup() {
      const isValid = validateSignupForm(this.signup);
      if (isValid) {
        try {

          this.isLoading = true;
          console.log('註冊表單驗證通過', this.signup);
          
          
          // 這邊是 Firebase Authentication 的註冊驗證
          try {
            
            await createUserWithEmailAndPassword(auth,this.signup.email, this.signup.password)

            // 調用保存到Firebase的函數
            const result = await handleSignupAndSaveToFirebase(this.signup);
              
              if (result.success) {
                this.showMessage('success', '註冊成功！您的帳號已創建');
                // 註冊成功後，可以導向登入頁面
                setTimeout(() => {
                  this.switchForm('login');
                }, 1500);
              } else {
                this.showMessage('error', `註冊失敗：${result.error}`);
              }

          }
          catch (error) {
            console.error('註冊過程中出錯:', error);

              // 這邊是 Firebase Authentication 的註冊驗證錯誤訊息
              switch (error.code) {
              case "auth/invalid-email":
                  this.showMessage('error', `註冊過程中出錯：請輸入有效的 Email`);
                  break;
              case "auth/email-already-in-use":
                  this.showMessage('error', `註冊過程中出錯：該 Email 已被註冊`);
                  break;
              case "auth/weak-password":
                  this.showMessage('error', `註冊過程中出錯：密碼至少需要 6 個字元`);
                  break;
              default:
                  alert("註冊失敗，請稍後再試");
             
            }
          }




        } catch (error) {
          console.error('註冊過程中出錯:', error);
          this.showMessage('error', `註冊過程中出錯：${error.message}`);
        } finally {
          this.isLoading = false;
        }
      }
    },
    // 忘記密碼相關方法
    handleForgotPassword() {
      // 依據當前步驟執行相應的操作
      if (this.currentForm === 'forgotpw1') {
        // 驗證信箱並發送驗證碼
        this.forgotPassword.isEmailValid = validateEmail(this.forgotPassword.email);
        if (this.forgotPassword.isEmailValid) {
          this.switchForm('forgotpw2');
        }
      } else if (this.currentForm === 'forgotpw2') {
        // 驗證新密碼
        const isPasswordValid = !!this.forgotPassword.newPassword;
        const isMatched = this.forgotPassword.newPassword === this.forgotPassword.confirmPassword;
        
        this.forgotPassword.isPasswordValid = isPasswordValid;
        this.forgotPassword.isPasswordMatched = isMatched;
        
        if (isPasswordValid && isMatched) {
          console.log('密碼重設表單驗證通過', this.forgotPassword);
          // 這裡加入實際重設密碼邏輯
        }
      }
    },
    // 發送驗證碼
    sendVerificationCode() {
      // 驗證信箱格式
      this.forgotPassword.isEmailValid = validateEmail(this.forgotPassword.email);
      
      if (this.forgotPassword.isEmailValid) {
        console.log('發送驗證碼到', this.forgotPassword.email);
        // 這裡添加實際發送驗證碼的邏輯
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <!-- 訊息提示 -->
    <div class="message-container" v-if="message.show">
      <div class="message" :class="message.type">
        {{ message.text }}
      </div>
    </div>
    
    <!-- 載入中遮罩 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- 登入 -->
    <section class="forms login" v-show="currentForm === 'login'">
        <h2 class="form-title">登入</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent="handleLogin">
                <div class="media-group">
                    <div class="media-options">
                    <img src="../assets/images/login/img_google.png" alt="" class="google-img">
                    <a href="#" class="field google">
                        <span>以 Google 帳號繼續</span>
                    </a>
                    </div>
                    <div class="media-options">
                    <img src="../assets/images/login/img_line.png" alt="" class="line-img">
                    <a href="#" class="field facebook">
                        <span>以 LINE 帳號繼續</span>
                    </a>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group" :class="{ error: !login.isEmailValid }">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="input-field" 
                      placeholder="請輸入你的信箱" 
                      v-model="login.email" 
                      autocomplete="off" 
                    />
                    <span class="error-message" v-if="!login.isEmailValid">{{ login.emailErrorMsg }}</span>
                    </div>
                </div>
                <div class="form-group" :class="{ error: !login.isPasswordValid }">
                        <label class="input-label required">密碼</label>
                        <div class="input-wrapper with-icon">
                            <input 
                              :type="passwordVisible.login ? 'text' : 'password'" 
                              class="input-field" 
                              placeholder="請輸入你的密碼" 
                              v-model="login.password" 
                              autocomplete="off"
                            >
                            <EyeoffIcon class="input-icon" v-if="!passwordVisible.login" @click="togglePasswordVisibility('login')"/>
                            <EyeIcon class="input-icon" v-if="passwordVisible.login" @click="togglePasswordVisibility('login')"/>
                            <span class="error-message" v-if="!login.isPasswordValid">{{ login.passwordErrorMsg }}</span>
                        </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled" type="submit">登入</button>
                </div>
                <div class="form-link">
                <span>還不是會員？</span><a @click.prevent="switchForm('signup')">點此註冊</a>
                </div>
            </form>
            <div class="form-link">
                <a href="#" class="forgot-pass" @click.prevent="switchForm('forgotpw1')">忘記密碼</a>
            </div>
            </div>
        </div>
    </section>
    <!-- 註冊 -->
    <section class="forms signup" v-show="currentForm === 'signup'">
        <h2 class="form-title">註冊</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent="handleSignup">
                <div class="media-group">
                    <div class="media-options">
                    <img src="../assets/images/login/img_google.png" alt="" class="google-img">
                    <a href="#" class="field google">
                        <span>以 Google 帳號繼續</span>
                    </a>
                    </div>
                    <div class="media-options">
                        <img src="../assets/images/login/img_line.png" alt="" class="line-img">
                    <a href="#" class="field facebook">
                        <span>以 LINE 帳號繼續</span>
                    </a>
                    </div>
                </div>
                <div class="line"></div>
                <div class="form-group" :class="{ error: !signup.isEmailValid }">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="input-field" 
                      placeholder="請輸入你的信箱" 
                      v-model="signup.email" 
                      @blur="checkEmailFormat" 
                      autocomplete="off"
                    />
                    <span class="error-message" v-if="!signup.isEmailValid">{{ signup.emailErrorMsg }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="input-label">暱稱</label>
                    <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="input-field" 
                      placeholder="請輸入你的名稱"
                      v-model="signup.nickname"
                      autocomplete="off"
                    />
                    </div>
                </div>
                <div class="form-group" :class="{ error: !signup.isPasswordValid && signup.password === '' }">
                        <label class="input-label required">密碼</label>
                        <div class="input-wrapper with-icon">
                            <input 
                              :type="passwordVisible.signup ? 'text' : 'password'" 
                              class="input-field" 
                              placeholder="請輸入你的密碼"
                              v-model="signup.password"
                              autocomplete="off"
                            >
                            <EyeoffIcon class="input-icon" v-if="!passwordVisible.signup" @click="togglePasswordVisibility('signup')"/>
                            <EyeIcon class="input-icon" v-if="passwordVisible.signup" @click="togglePasswordVisibility('signup')"/>
                            <span class="error-message" v-if="!signup.isPasswordValid && signup.password === ''">{{ signup.passwordErrorMsg }}</span>
                        </div>
                </div>
                <div class="form-group" :class="{ error: !signup.isPasswordMatched }">
                        <label class="input-label required">密碼確認</label>
                        <div class="input-wrapper with-icon">
                            <input 
                              :type="passwordVisible.signupConfirm ? 'text' : 'password'" 
                              class="input-field" 
                              placeholder="請再次輸入密碼"
                              v-model="signup.confirmPassword"
                              autocomplete="off"
                            >
                            <EyeoffIcon class="input-icon" v-if="!passwordVisible.signupConfirm" @click="togglePasswordVisibility('signupConfirm')"/>
                            <EyeIcon class="input-icon" v-if="passwordVisible.signupConfirm" @click="togglePasswordVisibility('signupConfirm')"/>
                            <span class="error-message" v-if="!signup.isPasswordMatched">{{ signup.passwordMatchErrorMsg }}</span>
                        </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled" type="submit" :disabled="isLoading">
                      {{ isLoading ? '處理中...' : '註冊' }}
                    </button>
                </div>
                <div class="form-link">
                <span>已經是會員？</span><a href="#" @click.prevent="switchForm('login')">點此登入</a>
                </div>
            </form>
            </div>
        </div>
    </section>
    <!-- 忘記密碼 step1 -->
    <div class="return-btn title2 bold" @click="goBack" v-show="showBackButton">
        <BackIcon/> 返回
    </div>
    <section class="forms forgotpw-1" v-show="currentForm === 'forgotpw1'">
        <h2 class="form-title">忘記密碼</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent="handleForgotPassword">
                <p class="pw-desc">我們將發送驗證碼到你所輸入的電子信箱，請於限時內填入正確的驗證碼</p>
                
                <div class="form-group" :class="{ error: !forgotPassword.isEmailValid }">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="input-field" 
                      placeholder="請輸入你的信箱" 
                      v-model="forgotPassword.email"
                      autocomplete="off" 
                    />
                    <span class="error-message" v-if="!forgotPassword.isEmailValid">{{ forgotPassword.emailErrorMsg }}</span>
                    </div>
                </div>
                <div class="form-group" :class="{ error: !forgotPassword.isCodeValid }">
                    <label class="input-label required">驗證碼</label>
                    <div class="input-wrapper with-button">
                    <input 
                      type="text" 
                      class="input-field" 
                      placeholder="請輸入驗證碼" 
                      v-model="forgotPassword.verificationCode"
                      autocomplete="off" 
                    />
                    <button type="button" class="text-button" @click="sendVerificationCode">重送驗證碼</button>
                    <span class="error-message" v-if="!forgotPassword.isCodeValid">{{ forgotPassword.codeErrorMsg }}</span>
                    </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled" type="submit">下一步</button>
                </div>   
            </form>
            </div>
        </div>
    </section>
    <!-- 忘記密碼 step2 -->
    <section class="forms forgotpw-2" v-show="currentForm === 'forgotpw2'">
        <h2 class="form-title">忘記密碼</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent="handleForgotPassword">
                <p class="pw-desc">請設定你的新密碼</p>
                
                <div class="form-group" :class="{ error: !forgotPassword.isPasswordValid }">
                    <label class="input-label required">設定新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input 
                          :type="passwordVisible.forgotpw ? 'text' : 'password'" 
                          class="input-field" 
                          placeholder="請輸入你的新密碼" 
                          v-model="forgotPassword.newPassword"
                          autocomplete="off"
                        >
                        <EyeoffIcon class="input-icon" v-if="!passwordVisible.forgotpw" @click="togglePasswordVisibility('forgotpw')"/>
                        <EyeIcon class="input-icon" v-if="passwordVisible.forgotpw" @click="togglePasswordVisibility('forgotpw')"/>
                        <span class="error-message" v-if="!forgotPassword.isPasswordValid">{{ forgotPassword.passwordErrorMsg }}</span>
                    </div>
                </div>
                <div class="form-group" :class="{ error: !forgotPassword.isPasswordMatched }">
                    <label class="input-label required">再次確認新密碼</label>
                    <div class="input-wrapper with-icon">
                        <input 
                          :type="passwordVisible.forgotpwConfirm ? 'text' : 'password'" 
                          class="input-field" 
                          placeholder="請再次輸入密碼" 
                          v-model="forgotPassword.confirmPassword"
                          autocomplete="off"
                        >
                        <EyeoffIcon class="input-icon" v-if="!passwordVisible.forgotpwConfirm" @click="togglePasswordVisibility('forgotpwConfirm')"/>
                        <EyeIcon class="input-icon" v-if="passwordVisible.forgotpwConfirm" @click="togglePasswordVisibility('forgotpwConfirm')"/>
                        <span class="error-message" v-if="!forgotPassword.isPasswordMatched">{{ forgotPassword.passwordMatchErrorMsg }}</span>
                    </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled" type="submit">更新密碼</button>
                </div>   
            </form>
            </div>
        </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/login.scss";
</style>