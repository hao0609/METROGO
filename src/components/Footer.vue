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
            <li><RouterLink to="/general-mission">一般任務</RouterLink></li>
            <li><RouterLink to="/special-mission">特殊任務</RouterLink></li>
            <li><RouterLink to="/store">線上商城</RouterLink></li>
            <li><RouterLink to="/news">最新消息</RouterLink></li>
          </ul>
        </nav>
      </div>

      <!-- 下半部分：文字說明和法律連結的水平排列 -->
      <div class="footer-bottom">
        <p class="footer-text">
          本網站為緯育TibaMe【TID201】前端開發技術在職培訓班學員作品，僅供學習、展示之用途。若有侵權疑慮，您可以私訊
          [ TibaMe - 前端開發技術在職培訓班]，後續會由專人協助處理
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
