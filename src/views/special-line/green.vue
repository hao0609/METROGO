<template>
  <div class="mission-body" ref="container">
    <div class="vertical-line lightgreen" ref="verticalLine"></div>
    <div class="fixed-ball green" ref="ball"></div>
    <!-- <router-view /> -->
    <header class="mission-header" ref="header">
      <div
        class="metro_line_id green"
        v-for="mission in missions"
        :key="mission.id"
      >
        <h1 class="mission-title">
          {{ mission.title }}
        </h1>
        <h1 class="mission_type">
          {{ mission.type }}
        </h1>
      </div>
      <img src="../../assets/images/MissionSpecial/station_start.png" alt="" />
    </header>
    <div class="mission-content">
      <section ref="section">
        <button class="section-button" @click="toggleSection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="62"
            viewBox="0 0 35 62"
            fill="none"
          >
            <path
              d="M22.623 31L0.966795 7.4875L7.15742 0.771L34.9999 31L7.15742 61.229L0.971173 54.5125L22.623 31Z"
              fill="white"
            />
          </svg>
        </button>
        <ol :class="{ section_active: sectionActive }">
          <li
            class="station title1 green"
            v-for="station in stations"
            :key="station.id"
            :class="[
              { green_active: station.id === activeStationId },
              {
                'green-line': lines.find((line) => line.id === station.id)?.img,
              },
            ]"
          >
            <!-- <a :href="`#item${station.id}`">{{ station.title }}</a> -->
            <router-link :to="`#item${station.id}`">{{
              station.title
            }}</router-link>
          </li>
          <li
            class="question title1 green"
            v-for="question in questions"
            :key="question.id"
            :class="[
              { green_active: question.id === activeQuestionId },
              { answered: question.answered },
            ]"
          >
            <!-- <a :href="`#question-item${question.id}`">{{ question.title }}</a> -->
            <router-link :to="`#question-item${question.id}`">{{
              question.title
            }}</router-link>
          </li>
        </ol>
      </section>
      <div class="mission-main">
        <div
          class="line"
          v-for="line in lines"
          :key="line.id"
          :id="`item${line.id}`"
        >
          <div class="title">
            <h2>{{ line.title }}</h2>
            <p class="subtitle">
              {{ line.subtitle }}
            </p>
          </div>

          <div class="metro_station_id_n">
            <div class="message"></div>
            <p><span class="list green">審核條件</span> {{ line.message }}</p>
            <img
              v-if="line.img"
              :src="line.img"
              alt="Station Image"
              class="station-img green_shadow"
            />
            <div
              v-else
              class="no-photo green green_shadow"
              @click="openPhotoAlert(line)"
            >
              <img :src="defaultImg" alt="Lock Icon" class="lock-icon" />
              <span class="lock-text">請上傳照片</span>
              <alert_L_Photo
                ref="alertPhoto"
                v-if="isVisible"
                :message="selectedLine?.message"
                :message2="selectedLine?.message2"
                @cancel="handleModalCancel"
                @confirm="handleModalConfirm"
              />
            </div>
          </div>
        </div>
        <div ref="questionSection">
          <div
            class="question-section"
            v-for="(question, index) in questions"
            :key="question.id"
            :id="`question-item${question.id}`"
          >
            <div class="title article">
              <h2>{{ question.title }}</h2>
              <p class="message">{{ question.message }}</p>

              <div
                class="question green green_shadow"
                @click="showRandomQuestion"
              >
                <div
                  v-if="question.icon"
                  class="question-icon"
                  v-html="question.icon"
                ></div>
                <span class="question-text">點擊回答問題</span>
                <alert_L_question
                  ref="alertQuestion"
                  v-if="isQuestionVisible"
                  :question="selectedQuestion"
                  @cancel="handleQuestionCancel"
                  @confirm="handleQuestionConfirm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div ref="questionSection">
            <div
              class="question-section"
              v-for="(question, index) in questions"
              :key="question.id"
              :id="`question-item${question.id}`"
            >
              <div class="title article">
                <h1>{{ question.title }}</h1>
                <p class="message">{{ question.message }}</p>
                <div class="station-img question-img">
                  <div
                    v-if="question.icon"
                    class="question-icon"
                    v-html="question.icon"
                  ></div>
                  <span class="question-text">點擊回答問題</span>
                </div>
              </div>
            </div>
          </div> -->
    </div>
  </div>
  <div class="to-top" @click="toTop" v-show="showToTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
    >
      <g clip-path="url(#clip0_2008_5454)">
        <path
          d="M6.83203 27.6891L6.83203 44.3109L28.9805 22.1484L28.9805 72L40.0617 72L40.0617 22.1484L62.2101 44.3109L62.2101 27.6891L34.5211 6.41907e-06L6.83203 27.6891Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2008_5454">
          <rect
            width="72"
            height="72"
            fill="white"
            transform="translate(0 72) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
  <div class="mission-footer" ref="footer">
    <img src="../../assets/images/MissionSpecial/station_end.png" alt="" />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import questionData from "@/json/question.json";
import alert_L_Photo from "@/alert/alert_L_Photo.vue";
import alert_L_question from "@/alert/alert_L_question.vue";
// import AlertWebM from "@/components/Alert_web_M.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import ModalMenu from "@/components/Mission/ModalMenu.vue";
import PopupMenu from "@/components/Mission/PopupMenu.vue";
export default {
  components: {
    ModalMenu,
    PopupMenu,
    Navbar_V1,
    Footer,
    alert_L_Photo,
    // AlertWebM,
    alert_L_question,
  },

  setup() {
    const ball = ref(null);
    const container = ref(null);
    const section = ref(null);
    const header = ref(null);
    const footer = ref(null);
    const showToTop = ref(false);
    const questionSection = ref(null);
    const verticalLine = ref(null);
    const isPopupOpen = ref(false);
    const isModalOpen = ref(false);
    const selectedModal = ref("");
    const sectionActive = ref(false);
    // const PhotoAlert = ref(null); // 新增 PhotoAlert ref
    const alertPhoto = ref(null);

    const openModal = (type) => {
      selectedModal.value = type;
      isModalOpen.value = true;
    };
    const closePopupMenu = () => {
      isPopupOpen.value = false;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
    const toggleSection = () => {
      sectionActive.value = !sectionActive.value;
    };

    const isVisible = ref(false); // 在父組件中定義 isVisible
    const isQuestionVisible = ref(false);

    const selectedLine = ref(null);
    const selectedQuestion = ref(null);
    const openPhotoAlert = (line) => {
      selectedLine.value = line;
      isVisible.value = true;
    };
    // const openQuestion = () => {
    //   // selectedQuestion.value = questions;
    //   isQuestionVisible.value = true;
    // };
    // 取得棕線的問題列表
    const brownLineQuestions = ref(
      questionData.metroLines.find((line) => line.line === "松山新店線")
        .questions
    );

    // 隨機選擇一題
    const showRandomQuestion = () => {
      const randomIndex = Math.floor(
        Math.random() * brownLineQuestions.value.length
      );
      selectedQuestion.value = brownLineQuestions.value[randomIndex];
      isQuestionVisible.value = true;
    };

    const handleModalCancel = () => {
      isVisible.value = false;
    };
    const handleQuestionCancel = () => {
      isQuestionVisible.value = false;
    };

    const handleModalConfirm = () => {
      isVisible.value = false;
    };
    const handleQuestionConfirm = () => {
      isQuestionVisible.value = false;
    };
    const stations = ref([
      {
        id: 1,
        title: "中正紀念堂站",
      },
      {
        id: 2,
        title: "小南門站",
      },
      { id: 3, title: "公館站" },
    ]);
    const defaultImg = ref(
      "data:image/svg+xml;base64," +
        btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" viewBox="0 0 80 72" fill="none">
      <path d="M16.666 38.5197C16.666 36.948 17.3684 35.4407 18.6186 34.3294C19.8689 33.2181 21.5646 32.5937 23.3327 32.5938H56.666C58.4341 32.5938 60.1298 33.2181 61.3801 34.3294C62.6303 35.4407 63.3327 36.948 63.3327 38.5197V56.2974C63.3327 57.8691 62.6303 59.3764 61.3801 60.4877C60.1298 61.599 58.4341 62.2234 56.666 62.2234H23.3327C21.5646 62.2234 19.8689 61.599 18.6186 60.4877C17.3684 59.3764 16.666 57.8691 16.666 56.2974V38.5197Z" stroke="white" stroke-width="6.21225" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26.666 32.5929V20.741C26.666 17.5977 28.0708 14.5831 30.5713 12.3605C33.0717 10.1378 36.4631 8.88916 39.9994 8.88916C43.5356 8.88916 46.927 10.1378 49.4275 12.3605C51.9279 14.5831 53.3327 17.5977 53.3327 20.741V32.5929M36.666 47.4077C36.666 48.1935 37.0172 48.9472 37.6423 49.5028C38.2675 50.0585 39.1153 50.3706 39.9994 50.3706C40.8834 50.3706 41.7313 50.0585 42.3564 49.5028C42.9815 48.9472 43.3327 48.1935 43.3327 47.4077C43.3327 46.6219 42.9815 45.8682 42.3564 45.3125C41.7313 44.7569 40.8834 44.4447 39.9994 44.4447C39.1153 44.4447 38.2675 44.7569 37.6423 45.3125C37.0172 45.8682 36.666 46.6219 36.666 47.4077Z" stroke="white" stroke-width="6.21225" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)
    );
    const missions = ref([
      {
        id: 1,
        title: "松山新店線",
        // type: "半日遊",
      },
    ]);
    const lines = ref([
      {
        id: 1,
        title: "中正紀念堂站 ",
        subtitle:
          "國家級紀念館，紀念孫中山先生，廣場壯麗，是拍照打卡與參觀藝文展覽的好去處，每日還有莊嚴的衛兵交接儀式。",
        message: "請拍攝「中正紀念堂」，包含字樣.",
        // img: "/src/assets/images/MissionSpecial/red_01.png",
        img: null,
      },
      {
        id: 2,
        title: "小南門站 ",
        subtitle:
          "台北府城牆遺跡與台灣博物館南門園區位於此站，充滿歷史文化氛圍，適合喜愛老建築與歷史的遊客。",
        message: "請拍攝「台北植物園」大門.",
        img: null,
      },
      {
        id: 3,
        title: "公館站 ",
        subtitle:
          "台灣大學所在地，周邊有熱鬧的公館夜市，小吃選擇多，如鴨肉飯、豆花、滷味，文青書店與音樂表演空間也相當豐富。",
        message: "請拍攝「公館夜市」隨一店家.",
        img: null,
      },
    ]);
    const questions = ref([
      {
        id: 1,
        title: "問答",
        message: "綠線知識大挑戰，你能答對嗎？",
        // img: "/public/img/question.png",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="76" viewBox="0 0 48 76" fill="none">
  <path d="M33.2105 66.0008C33.2105 68.4408 32.2413 70.7808 30.5159 72.5062C28.7906 74.2315 26.4505 75.2008 24.0105 75.2008C21.5706 75.2008 19.2305 74.2315 17.5052 72.5062C15.7798 70.7808 14.8105 68.4408 14.8105 66.0008C14.8105 63.5608 15.7798 61.2207 17.5052 59.4954C19.2305 57.7701 21.5706 56.8008 24.0105 56.8008C26.4505 56.8008 28.7906 57.7701 30.5159 59.4954C32.2413 61.2207 33.2105 63.5608 33.2105 66.0008Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8768 13.34C20.7948 13.34 18.1498 14.26 16.2868 15.5756C14.4928 16.8452 13.605 18.3218 13.3474 19.596C12.9668 21.2992 11.9338 22.7854 10.47 23.7357C9.00616 24.686 7.2282 25.0248 5.51751 24.6793C3.80683 24.3338 2.2997 23.3315 1.31947 21.8876C0.339239 20.4436 -0.0360119 18.673 0.274226 16.9556C1.31843 11.776 4.52923 7.5486 8.59562 4.6736C12.8276 1.6836 18.1912 0 23.8768 0C35.639 0 47.8336 7.866 47.8336 20.4976C47.8336 27.8116 43.4866 33.7272 37.8562 37.1772C36.3471 38.1007 34.5329 38.3869 32.8127 37.9729C31.0926 37.5588 29.6074 36.4783 28.6838 34.9692C27.7603 33.4601 27.4741 31.6459 27.8882 29.9257C28.3022 28.2055 29.3827 26.7203 30.8918 25.7968C33.5138 24.1914 34.4936 22.1444 34.4936 20.4976C34.4936 17.8572 31.2046 13.34 23.8768 13.34Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.877 31.1191C27.557 31.1191 30.547 34.0999 30.547 37.7891V44.6983C30.547 46.4673 29.8443 48.1639 28.5934 49.4147C27.3426 50.6656 25.646 51.3683 23.877 51.3683C22.108 51.3683 20.4115 50.6656 19.1606 49.4147C17.9098 48.1639 17.207 46.4673 17.207 44.6983V37.7891C17.207 34.1091 20.1924 31.1191 23.877 31.1191Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M40.1105 28.0647C40.5611 28.8166 40.8591 29.65 40.9873 30.5172C41.1156 31.3843 41.0716 32.2683 40.858 33.1184C40.6444 33.9686 40.2653 34.7683 39.7424 35.4719C39.2195 36.1754 38.563 36.769 37.8105 37.2187L27.3041 43.5069C25.7865 44.4158 23.9699 44.6845 22.2541 44.2541C20.5382 43.8236 19.0636 42.7291 18.1547 41.2115C17.2458 39.6938 16.9771 37.8772 17.4075 36.1614C17.838 34.4455 18.9325 32.971 20.4501 32.0621L30.9611 25.7693C31.7129 25.3194 32.5459 25.0221 33.4126 24.8942C34.2793 24.7663 35.1626 24.8104 36.0123 25.024C36.8619 25.2376 37.6611 25.6165 38.3643 26.139C39.0675 26.6615 39.6609 27.3128 40.1105 28.0647Z" fill="white"/>
</svg>`,
      },
    ]);
    const activeStationId = ref(null);
    const activeQuestionId = ref(null);

    const gap = 50;
    const onScroll = () => {
      if (
        !verticalLine.value ||
        !ball.value ||
        !container.value ||
        !header.value ||
        !footer.value ||
        !questionSection.value ||
        !section.value
      )
        return;
      const scrollTop = window.scrollY;
      const headerHeight = header.value.offsetHeight;
      const headerRect = header.value.getBoundingClientRect();
      const footerRect = footer.value.getBoundingClientRect();
      // const questionRect = questionSection.value.getBoundingClientRect();
      const sectionRect = section.value.getBoundingClientRect();

      const startScroll = headerRect.bottom + scrollTop; // ball 開始滾動的點
      const stopScroll = footerRect.top + scrollTop - 150; // ball 停止滾動的點
      // const questionStop = questionRect.top + scrollTop; // section 停止的位置
      const sectionHeight = sectionRect.height;
      showToTop.value = scrollTop > headerHeight; // 離開 header 才顯示
      // 線
      // 當滾動未達 header 高度的一半時，line 隱藏在 header 底下
      const gapAboveFooter = 20;

      if (scrollY < headerHeight / 2) {
        // 還沒開始畫線，隱藏在 header 底下
        verticalLine.value.style.top = `${headerHeight}px`;
        verticalLine.value.style.height = "0px";
      } else if (scrollY >= headerHeight / 2 && scrollY < headerHeight) {
        // 滾動介於 header 一半到 header 底時，依滾動進度展開 line
        const progress = (scrollY - headerHeight / 2) / (headerHeight / 2);
        let targetHeight = progress * (window.innerHeight - headerHeight);
        // 限制 targetHeight 不會超過 footer 區域：計算 header 底部到 footer 上緣的最大距離
        const maxLineHeight = footerRect.top - gapAboveFooter - headerHeight;
        if (targetHeight > maxLineHeight) {
          targetHeight = maxLineHeight;
        }
        verticalLine.value.style.top = `${headerHeight}px`;
        verticalLine.value.style.height = `${targetHeight}px`;
      } else {
        // 滾動超過 header，線從 viewport 最上方開始
        let newHeight = window.innerHeight;
        // 若 footer 已進入畫面，則限制高度
        if (footerRect.top < window.innerHeight) {
          newHeight = footerRect.top - gapAboveFooter;
        }
        verticalLine.value.style.top = "0px";
        verticalLine.value.style.height = `${newHeight}px`;
      }
      // 球
      if (scrollTop < startScroll) {
        ball.value.style.position = "fixed";
        ball.value.style.top = `${headerRect.bottom}px`;
        ball.value.style.transform = `translateY(0px)`;
      } else if (scrollTop >= startScroll && scrollTop <= stopScroll) {
        ball.value.style.position = "absolute";
        ball.value.style.top = `${startScroll + gap}px`;
        ball.value.style.transform = `translateY(${scrollTop - startScroll}px)`;
      } else {
        ball.value.style.position = "absolute";
        ball.value.style.top = `${stopScroll}px`;
        ball.value.style.transform = `translateY(0px)`;
      }

      // section
      if (scrollTop < startScroll) {
        // 還沒開始移動時，固定在 header 底下
        section.value.style.position = "fixed";
        section.value.style.top = `${headerRect.bottom}px`;
        section.value.style.transform = "translateY(0)";
      } else {
        // footer 的絕對頂部位置
        const footerAbsoluteTop = footerRect.top + scrollTop;
        // section 初始位置（絕對） = startScroll + gap
        const sectionStart = startScroll + gap;
        // 計算最大可移動距離：使 section 底部剛好碰到 footer
        const maxTranslate = footerAbsoluteTop - sectionStart - sectionHeight;
        // 目前應移動的距離
        const currentTranslate = scrollTop - startScroll;
        const translate = Math.min(currentTranslate, maxTranslate);

        section.value.style.position = "absolute";
        section.value.style.top = `${sectionStart}px`;
        section.value.style.transform = `translateY(${translate}px)`;
      }
      // toTop
      const windowHeight = window.innerHeight;
      const footerTop = footer.value.getBoundingClientRect().top + scrollTop;
      const buffer = 10; // 預留一些空間

      // 設定是否進入 footer
      if (scrollTop + windowHeight >= footerTop - buffer) {
        document.querySelector(".to-top").classList.add("at-footer");
      } else {
        document.querySelector(".to-top").classList.remove("at-footer");
      }

      // 淡化
      if (!header.value || !footer.value) return;

      const missionMainEl = document.querySelector(".mission-main");
      if (missionMainEl) {
        const rect = missionMainEl.getBoundingClientRect();
        // 若 mission-main 還沒進入視窗（完全在下方）則透明度設定為 0.5
        if (rect.top >= window.innerHeight) {
          missionMainEl.style.opacity = 0.1;
        }
        // 進入部分視窗時根據上緣進入程度漸變
        else if (rect.top < window.innerHeight && rect.top > 0) {
          const progress = 1 - rect.top / window.innerHeight;
          missionMainEl.style.opacity = 0.1 + progress * 0.9;
        } else {
          missionMainEl.style.opacity = 1;
        }
      }

      const lineElements = document.querySelectorAll(".mission-main .line");
      let activeId = null;
      lineElements.forEach((lineEl) => {
        const rect = lineEl.getBoundingClientRect();
        // 例如判斷畫面中間的區域（此處可依需求調整條件）
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          // 從 id "item{line.id}" 中取出數字
          activeId = parseInt(lineEl.id.replace("item", ""), 10);
        }
      });
      activeStationId.value = activeId;
      const questionElements = document.querySelectorAll(".question-section");
      let activeQuestion = null;
      questionElements.forEach((qEl) => {
        const rect = qEl.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          activeQuestion = parseInt(qEl.id.replace("question-item", ""), 10);
        }
      });
      activeQuestionId.value = activeQuestion;
    };

    const toTop = () => {
      header.value && header.value.scrollIntoView({ behavior: "smooth" });
    };
    onMounted(() => {
      questionSection.value = document.querySelector(".question-section");
      // document.addEventListener("click", handleAnchorClick);
      window.addEventListener("scroll", onScroll);
      window.addEventListener("load", onScroll);

      onScroll();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
      // document.addEventListener("click", handleAnchorClick);
    });

    return {
      defaultImg,
      questions,
      missions,
      stations,
      lines,
      isPopupOpen,
      isModalOpen,
      selectedModal,
      openModal,
      closePopupMenu,
      closeModal,
      ball,
      container,
      header,
      footer,
      questionSection,
      section,
      activeStationId,
      activeQuestionId,
      toggleSection,
      verticalLine,
      sectionActive,
      toTop,
      showToTop,

      isQuestionVisible,
      questionData,
      selectedQuestion,
      handleQuestionConfirm,
      handleQuestionCancel,
      showRandomQuestion,
      openPhotoAlert,

      selectedLine,
      isVisible,
      handleModalCancel,
      handleModalConfirm,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/page/_mission-special.scss";
</style>
