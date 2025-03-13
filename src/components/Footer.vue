<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 上半部分：Logo和導航選單的橫式排列 -->
      <div class="footer-top">
        <div class="footer-logo">
          <RouterLink to="/"><icon_white></icon_white></RouterLink>
        </div>

        <nav class="footer-menu">
          <ul>
            <li><RouterLink to="/sights">景點介紹</RouterLink></li>
            <li><RouterLink to="/points">積分任務</RouterLink></li>
            <li><RouterLink to="/shop">線上商城</RouterLink></li>
            <li><RouterLink to="/news">最新消息</RouterLink></li>
          </ul>
        </nav>
      </div>

      <!-- 下半部分：文字說明和法律連結的水平排列 -->
      <div class="footer-bottom">
        <div class="footer-text">
          <p>
            本網站為緯育 TibaMe
            前端設計工程師班專題成果作品，本平台僅供學習、展示之用。參考資源:
            snaq.me。若有侵權疑慮，您可以私訊[TibaMe-前端設計工程師養成班]，後續會由專人協助處理
          </p>
        </div>

        <nav class="footer-link">
          <ul>
            <li>
              <RouterLink to="/privacy">隱私權政策</RouterLink>
            </li>
            <li>
              <RouterLink to="/terms">使用者條款</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
import icon_white from "../components/icons/icon_white.vue";

export default {
  components: {
    icon_white,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/sass/component/footer.scss";
</style>