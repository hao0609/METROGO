<template>
  <div class="container">
    <!-- 登入 -->
    <section class="forms login" v-show="currentForm === 'login'">
        <h2 class="form-title">登入</h2>
        <div class="form">
            <div class="form-content">
            <form>
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
                <div class="form-group">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input type="text" class="input-field" placeholder="請輸入你的信箱" />
                    </div>
                </div>
                <div class="form-group">
                        <label class="input-label required">密碼</label>
                        <div class="input-wrapper with-icon">
                            <input type="text" class="input-field" placeholder="請輸入你的密碼">
                            <EyeoffIcon class="input-icon"/>
                            <EyeIcon class="input-icon" style="display: none"/>
                        </div>
                </div>
                <div class="button-field">
                    <RouterLink to="/home">
                    <button class="btn_filled">登入</button>
                    </RouterLink>
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
            <form>
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
                <div class="form-group">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input type="text" class="input-field" placeholder="請輸入你的信箱" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="input-label required">暱稱</label>
                    <div class="input-wrapper">
                    <input type="text" class="input-field" placeholder="請輸入你的名稱" />
                    </div>
                </div>
                <div class="form-group">
                        <label class="input-label required">密碼</label>
                        <div class="input-wrapper with-icon">
                            <input type="text" class="input-field" placeholder="請輸入你的密碼">
                            <EyeoffIcon class="input-icon"/>
                            <EyeIcon class="input-icon" style="display: none"/>
                        </div>
                </div>
                <div class="form-group">
                        <label class="input-label required">密碼確認</label>
                        <div class="input-wrapper with-icon">
                            <input type="text" class="input-field" placeholder="請再次輸入密碼">
                            <EyeoffIcon class="input-icon"/>
                            <EyeIcon class="input-icon" style="display: none"/>
                        </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled">註冊</button>
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
            <form>
                <p class="pw-desc">我們將發送驗證碼到你所輸入的電子信箱，請於限時內填入正確的驗證碼</p>
                
                <div class="form-group">
                    <label class="input-label required">信箱</label>
                    <div class="input-wrapper">
                    <input type="text" class="input-field" placeholder="請輸入你的信箱" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="input-label required">驗證碼</label>
                    <div class="input-wrapper with-button">
                    <input type="text" class="input-field" placeholder="請輸入驗證碼" />
                    <button class="text-button">重送驗證碼</button>
                    </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled" @click.prevent="switchForm('forgotpw2')">下一步</button>
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
            <form>
                <p class="pw-desc">請設定你的新密碼</p>
                
                <div class="form-group">
                        <label class="input-label required">設定新密碼</label>
                        <div class="input-wrapper with-icon">
                            <input type="text" class="input-field" placeholder="請輸入你的新密碼">
                            <EyeoffIcon class="input-icon"/>
                            <EyeIcon class="input-icon" style="display: none"/>
                        </div>
                </div>
                <div class="form-group">
                        <label class="input-label required">再次確認新密碼</label>
                        <div class="input-wrapper with-icon">
                            <input type="text" class="input-field" placeholder="請再次輸入密碼">
                            <EyeoffIcon class="input-icon"/>
                            <EyeIcon class="input-icon" style="display: none"/>
                        </div>
                </div>
                <div class="button-field">
                    <button class="btn_filled">更新密碼</button>
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

<script>
import { RouterLink } from "vue-router";
import BackIcon from "@/components/icons/IconBack.vue";
import EyeoffIcon from '@/components/icons/IconEyeoff.vue';
import EyeIcon from '@/components/icons/IconEye.vue';
export default {
  name: "NewsDetailView",
  components: {
    BackIcon,
    EyeoffIcon,
    EyeIcon,
  },
  data() {
    return {
      currentForm: 'login', // 預設顯示登入頁
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
    }
  }
};
</script>
