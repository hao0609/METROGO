<template>
  <Navbar_V1 />
  <div class="privacy-all">
    <div class="privacy-head">
      <h1 class="privacy-title">使用者條款</h1>
    </div>

    <div class="privacy-wrapper">
      <div class="privacy-content">
        <p>
          歡迎使用
          MetroGo（以下簡稱「本服務」）。請您閱讀以下使用者條款，當您註冊或使用本服務時即表示您已閱讀、理解並同意本條款的所有內容。
        </p>
        <p class="content-title">1. 服務簡介</p>
        <p>
          MetroGo
          提供捷運沿線景點推薦、任務挑戰、積分兌換等功能，旨在提升使用者的城市探索體驗。
        </p>
        <p class="content-title">2. 帳號註冊與使用</p>
        <p>
          (1) 帳號註冊：
          <li>使用本服務前，您須註冊帳號並提供真實、完整的個人資訊。</li>
          <li>若發現您的資料有誤或不符事實，本服務有權暫停或終止您的帳號。</li>
        </p>
        <p>
          (2) 帳號安全：
          <li>您應負責妥善保管帳號資訊，並對所有經帳號進行的行為負責。</li>
          <li>若發現未經授權的帳號使用情形，請立即通知本服務。</li>
        </p>

        <p class="content-title">3. 服務內容與使用規範</p>
        <p>
          (1) 景點推薦與資訊：
          <li>本服務提供的景點資訊僅供參考，實際情況以商家或官方公告為準。</li>
        </p>
        <p>
          (2) 任務與積分制度：
          <li>任務完成標準由 MetroGo 依內部規範決定，且 MetroGo 保留審核權。</li>
          <li>積分僅能在本服務內兌換指定商品，無法轉讓或折現。</li>
          <li>如發現不當方式獲取積分，本服務有權扣除積分並取消帳號。</li>
        </p>
        <p>
          (3) 商城購物與兌換：
          <li>商品資訊、價格、庫存等可能隨時變更，最終以交易時資訊為準。</li>
          <li>若發生無法履行訂單的情形（如庫存不足），本服務保留取消訂單的權利。</li>
        </p>

        <p class="content-title">4. 禁止行為</p>
        <p>
          您同意不從事以下行為：
          <li>提供不實資訊或冒用他人身分。</li>
          <li>以自動程式或其他非法手段操作積分、任務或商城交易。</li>
          <li>破壞、攻擊或擾亂本服務的正常運作。</li>
          <li>侵犯其他使用者或第三方的權利。</li>
          如發現違反上述規範的行為，MetroGo
          有權採取適當措施，包括但不限於警告、暫停帳號、扣除積分或終止服務。
        </p>

        <p class="content-title">5. 服務變更與終止</p>
        <p>
          本服務可能因技術或營運需求調整部分功能，或在必要時終止服務。若發生重大變更，我們將透過公告或電子郵件通知您。
        </p>

        <p class="content-title">6. 責任限制</p>
        <li>
          本服務不保證所有資訊的完整性與即時性，亦不對因使用本服務所產生的任何直接或間接損失負責。
        </li>
        <li>
          若因不可抗力（如系統故障、駭客攻擊）導致服務中斷或資料遺失，本服務將盡力修復，但不承擔賠償責任。
        </li>
        <p class="content-title">7. 條款修改</p>
        <p>我們可能不定期修改本條款，若有重大變更，將透過公告或電子郵件通知您。</p>

        <div class="content-end">
          <p>
            <Icon_black class="small-logo" :width="logoWidth" :height="'auto'" /> 團隊敬上
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import Icon_black from "../components/icons/icon_black.vue";

import { ref, onMounted } from "vue";

const logoWidth = ref("300px");

const updateLogoWidth = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    logoWidth.value = "180px"; // 當螢幕小於 600px 時，設定寬度為 80px
  } else {
    logoWidth.value = "300px"; // 預設寬度為 300px
  }
};

onMounted(() => {
  updateLogoWidth();
  window.addEventListener("resize", updateLogoWidth); // 監聽視窗大小變化
});
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/privacy.scss";
</style>
