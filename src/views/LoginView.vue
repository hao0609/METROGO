<script>
import { RouterLink } from "vue-router";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import BackIcon from "@/components/icons/IconBack.vue";
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';

// 引入 firebase authentication 登入註冊驗證方法
import { auth, database , provider, signInWithPopup, signOut} from '../firebase/firebaseConfig.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { ref, get } from 'firebase/database';
import { addGoogleUser_ToDB } from "../js/view/addGoogleUser_ToDB.js";
import Swal from 'sweetalert2';


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

export default {
  name: "LoginView",
  components: {
    Navbar_V1,
    BackIcon,
    EyeoffIcon,
    EyeIcon,
  },
  data() {
    return {
      // LINE Login
      channelID: '2007134479',
      redirectUri: 'https://tibamef2e.com/tid201/g2/login', // 上版時要改成專案網址 https://tibamef2e.com/tid201/g2/
      currentForm: 'login', // 預設顯示登入頁
      clientSecret: '2eeeb7070c625f83716857367b24044f',
      passwordVisible: initPasswordVisibility(), 
      login: initLoginData(),
      signup: initSignupData(),
      forgotPassword: initForgotPasswordData(),
      isLoading: false,
      message: {
        show: false,
        type: 'success', // 'success' 或 'error'
        text: ''
      },
      // 添加前一頁記錄
      previousRoute: null
    }
  },
  computed: {
    showBackButton() {
      // 在忘記密碼的兩個步驟都顯示返回按鈕
      return this.currentForm === 'forgotpw1' || this.currentForm === 'forgotpw2';
    }
  },
  // 添加 mounted 鉤子以監聽路由變化
  mounted() {
    // 從 sessionStorage 恢復前一頁資訊（如果有）
    const savedRoute = sessionStorage.getItem('previousRoute');
    if (savedRoute) {
      try {
        this.previousRoute = JSON.parse(savedRoute);
      } catch (e) {
        console.error('Error parsing saved route:', e);
      }
    }
    
    // 監聽路由變化
    this.$router.beforeEach((to, from, next) => {
      // 只記錄非登入頁面的路由
      if (from.name && from.name !== 'LoginView') {
        this.previousRoute = {
          name: from.name,
          params: from.params,
          query: from.query
        };
        
        // 保存到 sessionStorage 以防頁面刷新
        sessionStorage.setItem('previousRoute', JSON.stringify(this.previousRoute));
      }
      next();
    });
  },
  async created() {
    // check sessionStorage
    const lineLoginState = sessionStorage.getItem('lineLoginState');
    if (lineLoginState) {
      // line callback queryString https://example.com/callback?code=abcd1234&state=0987poi&friendship_status_changed=true
      // check code and state
      if (this.$route.query.code && this.$route.query.state === lineLoginState) {
        console.log('lineLoginState:', lineLoginState);
        // remove lineLoginState
        sessionStorage.removeItem('lineLoginState');
        // call api to get user info POST
        const url = 'https://api.line.me/oauth2/v2.1/token';
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', this.$route.query.code);
        params.append('redirect_uri', this.redirectUri);
        params.append('client_id', this.channelID);
        params.append('client_secret', this.clientSecret);
        console.log(params)
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        }).then(async response => {
          /**
           * access_token
           * :
           * "eyJhbGciOiJIUzI1NiJ9.yCps5R1Mo9tNo5rWRJvFnF1tkXjV1gSpuo91ArMJ1vCA6-8SUCWqVvzZVw_pHW4G2rzQm6V97E09iSwDgVPG-f1MKfZ8HZQ9EBsxNBfB-I62urkI-EZ65E6fzAdu8QHUEj7t4M__cH53Ti2gtYDSzMeXWYt_RLHPvAsb9TUFDhg.nc2kjn5rsyd_Mi_hIoEbT4y3tgJSQhz_bkEUNajGDok"
           * expires_in
           * :
           * 2592000
           * id_token
           * :
           * "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTFmMTZlMDYzMGU0MGI2ZTY5MzA1OTgzNzc4OWFkOWUxIiwiYXVkIjoiMjAwNzExNjU4NCIsImV4cCI6MTc0Mjk4NzA2NSwiaWF0IjoxNzQyOTgzNDY1LCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoiSmVycnkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9wcm9maWxlLmxpbmUtc2Nkbi5uZXQvMGhzWFJmUnBzcExIZHZId0dybG5KVElGTmFJaG9ZTVNvX0YzRm5HVTBjSUVRUksyb3BBU3RxRlVwTmNrSVNmRHR5VkNzMEVFMUtJVTlGIiwiZW1haWwiOiJzYXJhNzc2NTZAZ21haWwuY29tIn0.6Wuq9L33plBrFyMVxmnJ8ixJkss7XFVBQphbzFcoCmI"
           * refresh_token
           * :
           * "P1EAIRjNiI54ClAnetE6"
           * scope
           * :
           * "openid profile"
           * token_type
           * :
           * "Bearer"
           */
          const verifyParams = new URLSearchParams();
          const res = await response.json();
          console.log(res)
          console.log(res.id_token)
          verifyParams.append('id_token', res.id_token);
          verifyParams.append('client_id', this.channelID);
          // verify token( use id_token )
          if (res.access_token) {
            await fetch('https://api.line.me/oauth2/v2.1/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + res.access_token
              },
              body: verifyParams
            }).then(async verifyResponse => {
              /**
               * aud : "2007116584"
               * email:"sara77656@gmail.com"
               * exp :1742997887
               * iat:1742994287
               * iss:"https://access.line.me"
               * name:"Devoloper Name"
               * picture:"https://profile.line-scdn.net/0h
               * sub:"U1f16e0630e40b6e693059837789ad9e1"
               */
              const verifyRes = await verifyResponse.json();
              console.log(verifyRes)
              // check email exist
              const checkEmailInDatabase = await this.checkEmailInDatabase(verifyRes.email);
              if (!checkEmailInDatabase) {
                console.log('empty email');
                // redirect to signup page
                this.signup.email = verifyRes.email;
                this.signup.nickname = verifyRes.name;
                this.signup.password = 'line_' + verifyRes.sub;
                // sign up
                const userCredential = await createUserWithEmailAndPassword(auth,this.signup.email, this.signup.password)
                const userUID = userCredential.user.uid
                const result = await handleSignupAndSaveToFirebase(this.signup, userUID);
                if (result.success) {
                  await signInWithEmailAndPassword(auth,verifyRes.email, `line_${verifyRes.sub}`).then(() => {
                    this.showToast('success', `登入成功!`);
                    // 使用統一導航方法
                    this.navigateAfterAuth();
                  }).catch(error => {
                    console.log('error:', error);
                    if (error.code === 'auth/user-not-found') {
                      this.showToast('error', `登入失敗： ${error.message}`);
                    }
                  });
                } else {
                  this.showToast('error', `註冊失敗：${result.error}`);
                }
              } else {
                console.log('login',verifyRes.email,`line_${verifyRes.sub}`)
                // login
                await signInWithEmailAndPassword(auth,verifyRes.email, `line_${verifyRes.sub}`).then(() => {
                  this.showToast('success', `登入成功!`);
                  // 使用統一導航方法
                  this.navigateAfterAuth();
                }).catch(error => {
                  console.log('error:', error);
                  if (error.code === 'auth/user-not-found') {
                    this.showToast('error', `登入失敗： ${error.message}`);
                  }
                });
              }
              console.log('verifyResponse:', verifyRes);
            })
          }
        })
      }
      console.log('lineLoginState:', lineLoginState);
      sessionStorage.removeItem('lineLoginState');
    }
  },
  methods: {
    // 添加統一的導航函數
    navigateAfterAuth() {
      setTimeout(() => {
    // 檢查是否來自 LINE 登入
    // 1. 檢查 URL 中是否有 LINE 授權碼
          const isFromLine = this.$route.query.code && (
            sessionStorage.getItem('fromLineLogin') === 'true' ||
            document.referrer.includes('line.me')
          );
          
          // 如果不是 LINE 登入且有前一頁記錄，返回前一頁
          if (!isFromLine && this.previousRoute && this.previousRoute.name) {
            this.$router.push({
              name: this.previousRoute.name,
              params: this.previousRoute.params,
              query: this.previousRoute.query
            });
          } else {
            // 如果是 LINE 登入或沒有前一頁記錄，導向首頁
            this.$router.push({ name: 'HomeView' });
          }
          
          // 清除 LINE 登入標記
          sessionStorage.removeItem('fromLineLogin');
        }, 1500);
      },
    
    async checkEmailInDatabase(email) {
      const emailRef = ref(database, `會員資料`);
      // ${email.replace('.', '_')}
      const snapshot = await get(emailRef);
      let isEmailExist;
      if(snapshot.exists()){
        const dataObject = snapshot.val()
      const dataList = Object.keys(snapshot.val())
      console.log(dataList)
        isEmailExist = dataList.filter( el => {
          if(dataObject[el]['電子郵件'] === email){
              return true
          }
        })

      console.log(isEmailExist)
      return isEmailExist.length>0;
      }
      console.log(snapshot.exists())
      return snapshot.exists(); // 若存在，返回 true
    }
    ,
    lineLogin() {
      const response_type = 'code';
      // random string (5-10 characters)
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // save state to session storage
      sessionStorage.setItem('lineLoginState', state);
      sessionStorage.setItem('fromLineLogin', 'true');
      const scope = 'openid%20email';
      // fetch
      window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=${response_type}&client_id=${this.channelID}&redirect_uri=${this.redirectUri}&state=${state}&scope=${scope}`;
    },

     async googleLogin() {
      try {
        const result = await signInWithPopup(auth, provider);
        // user.value = result.user;
        console.log("登入成功:", result.user);
        await addGoogleUser_ToDB (result.user)

        this.showToast('success', '登入成功!')

        this.navigateAfterAuth();

      } catch (error) {
        console.error("登入失敗:", error);
        this.showToast('error', `登入失敗: ${error.message}`);
      }
    },
    switchForm(formName) {
      this.currentForm = formName;
      
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

    // 登入相關方法
    async handleLogin() {
      const isValid = validateLoginForm(this.login);
      if (isValid) {
        console.log('登入表單驗證通過', this.login);


        // 這邊是 Firebase Authentication 的登入驗證

        try{
          await signInWithEmailAndPassword(auth,this.login.email, this.login.password)
          // 使用 Toast 顯示成功消息
          this.showToast('success', '登入成功!');

          // 使用統一導航方法
          this.navigateAfterAuth();

        }catch(error){
            
            switch (error.code) {
              case "auth/invalid-credential":
                this.showToast('error', '帳號或密碼錯誤，請再試一次！');
                break;
              default:
                this.showToast('error', `登入失敗： ${error.message}`);
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
            
            // 用戶透過 Firebase Authentication 註冊後的所有資料
            const userCredential = await createUserWithEmailAndPassword(auth,this.signup.email, this.signup.password)
            
            // 從註冊後的所有資料取得用戶的唯一 UID 值 ( 由 Firebase 自動產生 ) 
            const userUID = userCredential.user.uid 


            // 調用保存到Firebase的函數
            const result = await handleSignupAndSaveToFirebase(this.signup, userUID);
              
              if (result.success) {
                this.showToast('success', '註冊成功！您的帳號已創建');
                // 使用統一導航方法
                this.navigateAfterAuth();
              } else {
                this.showToast('error', `註冊失敗：${result.error}`);
              }

          }
          catch (error) {
            console.error('註冊過程中出錯:', error);

              // 這邊是 Firebase Authentication 的註冊驗證錯誤訊息
              switch (error.code) {
                case "auth/invalid-email":
                  this.showToast('error', '請輸入有效的 Email');
                  break;
                case "auth/email-already-in-use":
                  this.showToast('error', '該 Email 已被註冊');
                  break;
                case "auth/weak-password":
                  this.showToast('error', '密碼至少需要 6 個字元');
                  break;
                default:
                  this.showToast('error', "註冊失敗，請稍後再試");
              }
          }

        } catch (error) {
          console.error('註冊過程中出錯:', error);
          this.showToast('error', `註冊過程中出錯：${error.message}`);
        } finally {
          this.isLoading = false;
        }
      }
    },

    // 登入成功/失敗 Toast 通知方法
    showToast(icon, title) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2400,
        timerProgressBar: false, 
        backdrop: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;

          toast.style.marginTop = '100px';
        },
        customClass: {
          container: 'login-toast-container',
          popup: 'login-toast-popup',
          title: 'login-toast-title'
        }
      });
      
      Toast.fire({
        icon: icon, // 'success', 'error', 'warning', 'info', 'question'
        title: title
      });
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
  <Navbar_V1 />
  <div class="container">    
    <!-- 載入中遮罩 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- 登入 -->
    <section class="forms login" v-show="currentForm === 'login'">
        <h2 class="form-title">登入</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent>
                <div class="media-group">
                    <div class="media-options" @click="googleLogin">
                    <img src="../assets/images/login/img_google.png" alt="" class="google-img">
                    <a href="#" class="field google">
                        <span>以 Google 帳號繼續</span>
                    </a>
                    </div>
                    <div class="media-options" @click="lineLogin">
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
                    <button class="btn_filled" type="button" @click="handleLogin">登入</button>
                </div>
                <div class="form-link">
                <span>還不是會員？</span><a @click.prevent="switchForm('signup')">點此註冊</a>
                </div>
            </form>
            <!-- <div class="form-link">
                <a href="#" class="forgot-pass" @click.prevent="switchForm('forgotpw1')">忘記密碼</a>
            </div> -->
            </div>
        </div>
    </section>
    <!-- 註冊 -->
    <section class="forms signup" v-show="currentForm === 'signup'">
        <h2 class="form-title">註冊</h2>
        <div class="form">
            <div class="form-content">
            <form @submit.prevent>
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
                        <label class="input-label required">密碼 ( 密碼最少 6 字符 )</label>
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
                    <button class="btn_filled" type="button" @click="handleSignup" :disabled="isLoading">
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
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/login.scss";
</style>

<style lang="scss">
  .login-toast-title {
    font-family: "NotoSansTC", "Microsoft JhengHei" !important;
    font-size: 16px;
    font-weight: 400 !important;
    color: #232529;
  }
</style>