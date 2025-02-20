<template>
  <div class="mission-body" ref="container">
    <div class="mission-menu">
      <button @click="isPopupOpen = true" class="menu-button">
        <span class="menu-icon">&#9776;</span>
        <span>選單</span>
      </button>

      <PopupMenu
        v-if="isPopupOpen"
        @close="isPopupOpen = false"
        @openModal="openModal"
      />

      <ModalMenu
        v-if="isModalOpen"
        :type="selectedModal"
        @close="isModalOpen = false"
      />
    </div>
    <div class="vertical-line" ref="verticalLine"></div>
    <div class="fixed-ball" ref="ball"></div>

    <header class="mission-header" ref="header">
      <div class="metro_line_id" v-for="mission in missions" :key="mission.id">
        <h2 class="mission-title">
          {{ mission.title }}
          <!-- {{ metro_line_id }} -->
        </h2>
        <h1 class="mission_type">
          {{ mission.type }}
          <!-- {{ mission_type }} -->
        </h1>
      </div>
      <img src="../assets/images/MissionSpecial/station_start.png" alt="" />
    </header>
    <div class="mission-content">
      <section class="section" ref="section">
        <ol>
          <li
            class="station title1"
            v-for="station in stations"
            :key="station.id"
            :class="[
              { active: station.id === activeStationId },
              { 'red-line': lines.find((line) => line.id === station.id)?.img },
            ]"
          >
            <a :href="`#item${station.id}`">{{ station.title }}</a>
          </li>
          <li
            class="question title1"
            v-for="question in questions"
            :key="question.id"
            :class="[
              { active: question.id === activeQuestionId },
              { answered: question.answered },
            ]"
          >
            <a :href="`#question-item${question.id}`">{{ question.title }}</a>
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
            <h1>{{ line.title }}</h1>
            <p class="subtitle">
              {{ line.subtitle }}
            </p>
          </div>

          <div class="metro_station_id_n">
            <div class="message"></div>
            <p><span class="list">審核條件</span> {{ line.message }}</p>
            <img
              v-if="line.img"
              :src="line.img"
              alt="Station Image"
              class="station-img"
            />
            <div v-else class="no-photo">
              <img :src="defaultImg" alt="Lock Icon" class="lock-icon" />
              <span class="lock-text">請上傳照片</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div ref="questionSection">
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
              <img
                v-if="question.img"
                :src="question.img"
                alt="question Image"
                class="question-icon"
              />
              <span class="question-text">點擊回答問題</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mission-footer" ref="footer">
      <img src="../assets/images/MissionSpecial/station_end.png" alt="" />
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import ModalMenu from "../components/Mission/ModalMenu.vue";
import PopupMenu from "../components/Mission/PopupMenu.vue";
export default {
  components: {
    ModalMenu,
    PopupMenu,
  },

  setup() {
    const ball = ref(null);
    const container = ref(null);
    const section = ref(null);
    const header = ref(null);
    const footer = ref(null);
    const questionSection = ref(null);
    const verticalLine = ref(null);

    const isPopupOpen = ref(false);
    const isModalOpen = ref(false);
    const selectedModal = ref("");
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
    const stations = ref([
      {
        id: 1,
        title: "淡水站",
      },
      {
        id: 2,
        title: "關渡站",
      },
      { id: 3, title: "北投站" },
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
        title: "淡水信義線",
        type: "半日遊",
      },
    ]);
    const lines = ref([
      {
        id: 1,
        title: "淡水站 ",
        subtitle:
          " 淡水擁有豐富的自然與人文景觀，如紅樹林保護區、漁人碼頭的浪漫夕陽，以及歷史悠久的淡水老街。這裡有著名的小吃，如阿給、鐵蛋、魚酥等，還能搭渡輪前往八里或欣賞河岸風光，是台北近郊熱門旅遊地點。",
        message: "請拍攝「金色水岸」，包含金色水岸字樣.",
        img: "/public/img/red_01.png",
      },
      {
        id: 2,
        title: "關渡站 ",
        subtitle:
          " 關渡擁有悠久歷史的關渡宮，是北台灣重要的媽祖廟。關渡自然公園則是賞鳥與生態觀察的好地方，擁有豐富的濕地生態。沿著河岸的自行車道，可一路騎往淡水或市區，適合喜愛戶外活動的旅客。",
        message: "請拍攝「關渡宮」，包含關渡宮字樣.",
        img: null,
      },
      {
        id: 3,
        title: "北投站 ",
        subtitle:
          " 北投以溫泉聞名，擁有北投溫泉博物館、地熱谷等知名景點。北投圖書館是台灣首座綠建築圖書館，結合自然環境與閱讀空間。此外，北投公園及周邊步道充滿綠意，是放鬆散步的好去處，讓旅客能同時享受自然與文化之美。",
        message: "請拍攝北投溫泉博物館.",
        img: null,
      },
    ]);
    const questions = ref([
      {
        id: 1,
        title: "問答",
        message: "紅線知識大挑戰，你能答對嗎？",
        img: "/public/img/question.png",
      },
    ]);
    const activeStationId = ref(null);
    const activeQuestionId = ref(null);
    // 自訂平滑捲動函式（使用 easeInOut 緩動效果）
    function smoothScrollTo(targetY, duration = 1500) {
      const startY = window.scrollY;
      const diff = targetY - startY;
      let start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        const easeInOut =
          percent < 0.5
            ? 2 * percent * percent
            : -1 + (4 - 2 * percent) * percent;
        window.scrollTo(0, startY + diff * easeInOut);
        if (time < duration) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
        }
      }
      window.requestAnimationFrame(step);
    }
    // 攔截 a 點擊事件，並以自訂函式平滑捲動
    const handleAnchorClick = (event) => {
      const a = event.target.closest("a");
      if (
        a &&
        a.getAttribute("href") &&
        a.getAttribute("href").startsWith("#")
      ) {
        event.preventDefault();
        const targetId = a.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetY, 1500);
        }
      }
    };
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
      const questionRect = questionSection.value.getBoundingClientRect();

      const startScroll = headerRect.bottom + scrollTop; // ball 開始滾動的點
      const stopScroll = footerRect.top + scrollTop - 150; // ball 停止滾動的點
      const questionStop = questionRect.top + scrollTop; // section 停止的位置

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

      // **控制 section：當 section 底部碰到 question-section 時停止移動**
      const sectionRect = section.value.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      // 當滾動時 section 的底部位置 = (section 的 top + translateY + sectionHeight)
      // 我們希望當這個值大於等於 question-section 的頂部（questionStop）時，停止移動
      if (scrollTop < startScroll) {
        section.value.style.position = "fixed";
        section.value.style.top = `${headerRect.bottom}px`;
        section.value.style.transform = "translateY(0px)";
      } else if (scrollTop < questionStop - sectionHeight) {
        // 正常隨滾動移動
        section.value.style.position = "absolute";
        section.value.style.top = `${startScroll + gap}px`;
        section.value.style.transform = `translateY(${
          scrollTop - startScroll
        }px)`;
      } else {
        // 當 section 底部碰到 question-section，固定 section 位置
        section.value.style.position = "absolute";
        section.value.style.top = `${questionStop - sectionHeight}px`;
        section.value.style.transform = "translateY(0px)";
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
    onMounted(() => {
      questionSection.value = document.querySelector(".question-section");
      document.addEventListener("click", handleAnchorClick);
      window.addEventListener("scroll", onScroll);

      onScroll();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
      document.addEventListener("click", handleAnchorClick);
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
      handleAnchorClick,
      verticalLine,
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
