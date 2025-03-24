<template>
  <Navbar_V1 />
  <div class="privacy-all">
    <div class="privacy-head">
      <h1 class="privacy-title">隱私權政策</h1>
    </div>

    <div class="privacy-wrapper">
      <div class="privacy-content">
        <p>
          感謝您使用
          MetroGo（以下簡稱「本服務」）。本隱私權政策說明我們如何收集、使用、儲存及保護您的個人資料，並確保您的隱私權益。
        </p>
        <p class="content-title">我們收集的資訊</p>
        <p>當您使用本服務時，我們可能會收集以下類型的資訊：</p>
        <p>
          (1) 帳號資訊
          <li>
            當您註冊 MetroGo會員時，我們會收集您的姓名、電子郵件地址、手機號碼等必要資訊。
          </li>
        </p>
        <p>
          (2) 定位資訊
          <li>
            在您使用一般任務或其他基於地點的功能時，我們可能會請求存取您的定位資訊，以確保您能完成指定的任務。
          </li>
        </p>
        <p>
          (3) 使用者提供內容
          <li>
            在參與特殊任務時，我們會收集您上傳的照片及相關資訊，以驗證任務完成情況。
          </li>
        </p>
        <p>
          (4) 交易與兌換資訊
          <li>
            當您在商城購買商品或兌換積分時，我們會收集您的交易資訊，包括訂單記錄、兌換歷史等。
          </li>
        </p>
        <p>
          (5) 設備與使用數據
          <li>我們可能會收集您的設備類型、瀏覽行為、IP 地址等數據，以優化使用體驗。</li>
        </p>

        <p class="content-title">我們如何使用您的資訊</p>
        <p>我們收集的資訊將用於以下目的：</p>
        <li>驗證會員身份，提供個人化服務</li>
        <li>確保定位與任務挑戰的準確性</li>
        <li>優化景點推薦與使用體驗</li>
        <li>提供客製化優惠與通知</li>
        <li>進行市場研究與服務改善</li>
        <li>確保交易安全及管理積分兌換</li>

        <p class="content-title">資料儲存與安全保護</p>
        <p>我們不會任意出售或交換您的個人資訊，僅在以下情況下可能共享您的資料：</p>
        <li>合作夥伴：當您兌換合作店家的商品時，必要資訊可能會提供給相關業者。</li>
        <li>法律要求：當政府機關依合法程序要求提供資訊時，我們將依法配合。</li>
        <li>數據分析：我們可能會使用匿名化數據進行市場分析，以改善服務。</li>

        <p class="content-title">您的權利</p>
        <p>
          您有權查詢、更正、刪除您的個人資料，或選擇退出行銷通知。如需行使權利，請聯繫我們的客服團隊。
        </p>

        <p class="content-title">隱私政策的變更</p>
        <li>
          本隱私權政策可能因應服務調整而修改，若有重大變更，我們將透過網站公告或電子郵件通知您。
        </li>
        <li>如有任何問題，請聯繫我們：[聯絡方式]</li>

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
