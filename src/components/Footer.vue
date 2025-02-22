<script setup>



</script>

<template>
   <footer class="footer">
    <div class="footer-container">
      <!-- 上半部分：Logo和導航選單的橫式排列 -->
      <div class="footer-top">
        <div class="footer-logo">
          <a href="/">
            <img src="../assets/images/Logo_white.svg" alt="METROGO" />
          </a>
        </div>
        
        <nav class="footer-menu">
          <ul>
            <li><a href="/attractions">景點介紹</a></li>
            <li><a href="/points">積分任務</a></li>
            <li><a href="/shop">線上商城</a></li>
            <li><a href="/news">最新消息</a></li>
          </ul>
        </nav>
      </div>

      <!-- 下半部分：文字說明和法律連結的水平排列 -->
      <div class="footer-bottom">
        <div class="footer-text">
          <p>本網站為緯育 TibaMe 前端設計工程師班專題成果作品，本平台僅供學習、展示之用。參考資源: snaq.me。若有侵權疑慮，您可以私訊[TibaMe-前端設計工程師養成班]，後續會由專人協助處理</p>
        </div>
        
        
         <nav class="footer-link">
          <ul>
            <li><a href="/privacy">隱私權政策</a></li>
            <li><a href="/terms">使用者條款</a></li>
          </ul>
         </nav>
        
      </div>
    </div>
  </footer>
  </template>
  
  <style lang="scss" scoped>
  @import '../assets/sass/component/footer.scss';
  </style>
