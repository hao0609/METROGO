<template>
  <div class="mission-body" ref="container">
    <div class="vertical-line lightblue" ref="verticalLine"></div>
    <div class="fixed-ball blue" ref="ball"></div>
    <!-- <router-view /> -->
    <!-- 用戶登入提醒彈窗 -->
    <alert_user_login ref="alert_user_login_ref" />
    <header class="mission-header" ref="header">
      <div class="metro_line_id blue">
        <h1 class="mission-title">板南線</h1>
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
            class="station title1 blue"
            v-for="station in stations"
            :key="station.id"
            :class="[
              { blue_active: station.id === activeStationId },
              {
                'blue-line': lines.find((line) => line.id === station.id)?.img,
              },
            ]"
          >
            <!-- <a :href="`#item${station.id}`">{{ station.title }}</a> -->
            <router-link :to="`#item${station.id}`">{{ station.title }}</router-link>
          </li>
          <li
            class="question title1 blue"
            v-for="question in questions"
            :key="question.id"
            :class="[
              { blue_active: question.id === activeQuestionId },
              { 'blue-answered': isanswered },
            ]"
          >
            <!-- <a :href="`#question-item${question.id}`">{{ question.title }}</a> -->
            <router-link :to="`#question-item${question.id}`">{{
              question.title
            }}</router-link>
          </li>
        </ol>
      </section>
      <alert_L_Photo
        ref="alertPhoto"
        v-if="selectedLine"
        :lineTitle="selectedLine?.title"
        :GetUserId="GetUserId"
        :mission="mission"
        :message="selectedLine?.message"
        :message2="selectedLine?.message2"
        :checkText="selectedLine?.checkText"
        @cancel="handleModalCancel"
        @confirm="handleModalConfirm"
        @uploadSuccess="handleUploadSuccess"
      />
      <div class="mission-main">
        <div class="line" v-for="line in lines" :key="line.id" :id="`item${line.id}`">
          <div class="title">
            <h2>{{ line.title }}</h2>
            <p class="subtitle">
              {{ line.subtitle }}
            </p>
          </div>

          <div class="metro_station_id_n">
            <div class="message"></div>
            <span class="list blue">審核條件</span>
            <p class="line-message">{{ line.message }}</p>
            <!-- <p class="line-message2">{{ line.message2 }}</p> -->
            <p>照片審核狀態：{{ line.checkText }}</p>
            <template v-if="line.checkText === '審核未通過'">（請重新上傳）</template>
            <template v-if="line.checkText === '未上傳'">（請上傳圖片）</template>
            <template v-if="line.checkText === '審核中'">（後台審核中）</template>
            <template v-if="line.checkText === '審核通過'">（照片已通過審核）</template>
            <img
              v-if="line.img"
              :src="line.img"
              alt="Uploaded Photo"
              class="station-img blue_shadow"
              @click="openPhotoAlert(line)"
            />
            <div v-else class="no-photo blue blue_shadow" @click="openPhotoAlert(line)">
              <img :src="defaultImg" alt="Lock Icon" class="lock-icon" />
              <span class="lock-text">請上傳照片</span>
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
              <div class="station-img question-icon blue blue_shadow">
                <div class="question blue blue_shadow" @click="showRandomQuestion">
                  <div
                    v-if="question.icon && !isanswered"
                    class="question-icon"
                    v-html="question.icon"
                  ></div>
                  <div v-if="isanswered" class="check-icon" v-html="checkIcon"></div>
                  <span class="question-text">
                    {{ isanswered ? "回答完成" : "點擊回答問題" }}</span
                  >
                  <alert_L_question
                    ref="alertQuestion"
                    v-if="isQuestionVisible"
                    :question="selectedQuestion"
                    @cancel="handleQuestionCancel"
                    @confirm="handleQuestionConfirm"
                    @update-question-status="markQuestionAsAnswered"
                  />
                </div>
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
  </div>
  <!-- <Footer /> -->
</template>
<script>
import { ref, onMounted, onUnmounted, inject, watch, nextTick } from "vue";
import questionData from "@/json/question.json";
import alert_L_Photo from "@/alert/alert_L_Photo.vue";
import alert_L_question from "@/alert/alert_L_question.vue";
// import AlertWebM from "@/components/Alert_web_M.vue";
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import ModalMenu from "@/components/Mission/ModalMenu.vue";
import PopupMenu from "@/components/Mission/PopupMenu.vue";
import alert_user_login from "@/alert/alert_user_login.vue";
import { storage } from "@/firebase/firebaseConfig.js";
import { ref as storageRef, getDownloadURL, listAll } from "firebase/storage";
import GetUserQuestionData from "../../js/view/MissionSpecail/getUser_QuestionData";
import { getUserAllPhotoData } from "../../js/view/getUserAll_StoragePhotoData";
import GetUserMissionSpecialData from "../../js/view/MissionSpecail/getUser_MissionSpecialData";
// import Alert_L_Photo from "../../alert/alert_L_Photo.vue";

export default {
  components: {
    ModalMenu,
    PopupMenu,
    Navbar_V1,
    Footer,
    alert_L_Photo,
    // AlertWebM,
    alert_L_question,
    alert_user_login,
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

    const currentClickedStation = ref("");
    const isanswered = ref(false);
    const alert_user_login_ref = ref(null);
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
      console.log(line);

      if (line.checkText == "未上傳" || line.checkText == "審核未通過") {
        selectedLine.value = line;
      } else if (line.checkText == "審核通過") {
        alert("恭喜 ! 此照片審核已通過 !");
      } else if (line.checkText == "審核中") {
        alert("後台審核中");
      }
    };
    // const openQuestion = () => {
    //   // selectedQuestion.value = questions;
    //   isQuestionVisible.value = true;
    // };
    // 取得棕線的問題列表
    const brownLineQuestions = ref(
      questionData.metroLines.find((line) => line.line === "板南線").questions
    );
    // 隨機選擇一題
    const showRandomQuestion = async () => {
      const missionData = await GetUserMissionSpecialData(
        user_status.value.uid,
        mission.value
      );
      console.log("Firebase 取得的任務資料：", missionData);
      if (missionData && missionData["問答狀態"] === true) {
        alert("你已經回答過囉！");
        return;
      }
      const idx = Math.floor(Math.random() * brownLineQuestions.value.length);
      selectedQuestion.value = brownLineQuestions.value[idx];
      isQuestionVisible.value = true;
    };

    const handleModalCancel = () => {
      selectedLine.value = false;
    };
    const handleQuestionCancel = () => {
      isQuestionVisible.value = false;
    };

    const handleModalConfirm = () => {
      selectedLine.value = false;
    };
    const handleQuestionConfirm = (data) => {
      if (data.isCorrect) {
        markQuestionAsAnswered(data);
      }
      isQuestionVisible.value = false;
    };
    // user 狀態
    const user_status = inject("user"); // 取得用戶狀態

    // 檢查用戶有沒有登入的狀態
    const CheckUserStatus = async () => {
      console.log(user_status.value);

      if (user_status.value == null) {
        // 沒登入就跳登入提醒彈窗
        console.log("用戶沒登入");

        if (alert_user_login_ref.value && alert_user_login_ref.value.UserLoginShowAlert) {
          alert_user_login_ref.value.UserLoginShowAlert();
        } else {
          console.log("alert_user_login_ref 未正確獲取或方法名稱錯誤");
        }
      } else {
        GetUserId.value = user_status.value.uid;
        console.log(user_status.value.uid);

        // 拿到用戶的特殊任務遊戲進度資料
        let UserDBData = await GetUserMissionSpecialData(
          user_status.value.uid,
          mission.value
        );
        console.log(UserDBData);

        // 顯示目前資料庫的狀態

        // 淡水站的審核狀態
        // console.log(lines.value[0].checkText);
        // console.log(UserDBData.淡水.照片狀態);
        lines.value[0].checkText = UserDBData.國父紀念館.照片狀態;
        // 關渡站的審核狀態
        lines.value[1].checkText = UserDBData.台北車站.照片狀態;
        // 北投站的審核狀態
        lines.value[2].checkText = UserDBData.龍山寺.照片狀態;
        updateImagePath();
        let updatedUserQAData = await GetUserQuestionData(
          user_status.value.uid,
          mission.value
        );
        console.log("問答資料:", updatedUserQAData);
        if (updatedUserQAData && updatedUserQAData["問答狀態"] === true) {
          isanswered.value = true;
        } else {
          isanswered.value = false;
        }
      }
    };
    // 定義正確的顯示 alert 方法
    // const showPhotoAlert = () => {
    //   if (PhotoAlert.value) {
    //     console.log("PhotoAlert.value:", PhotoAlert.value);
    //     // 然後嘗試可能的方法名稱
    //     if (typeof PhotoAlert.value.showAlert === "function") {
    //       PhotoAlert.value.showAlert();
    //     } else if (typeof PhotoAlert.value.openAlert === "function") {
    //       PhotoAlert.value.openAlert();
    //     } else {
    //       console.log("可用的方法:", Object.keys(PhotoAlert.value));
    //     }
    //   }
    // };

    // const alertInfo = {
    //   fristTitle: "審核結果",
    //   svg_icon: `<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <circle cx="80" cy="80" r="75" stroke="#7D8A93" stroke-width="10"/>
    //         <path d="M63.2393 73.1818C63.2393 76.88 64.7084 80.4268 67.3234 83.0418C69.9385 85.6569 73.4852 87.126 77.1835 87.126C80.8817 87.126 84.4285 85.6569 87.0435 83.0418C89.6586 80.4268 91.1277 76.88 91.1277 73.1818C91.1277 69.4835 89.6586 65.9368 87.0435 63.3217C84.4285 60.7067 80.8817 59.2375 77.1835 59.2375C73.4852 59.2375 69.9385 60.7067 67.3234 63.3217C64.7084 65.9368 63.2393 69.4835 63.2393 73.1818Z" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    //         <path d="M91.1134 111.84L83.7555 119.198C82.0124 120.939 79.6493 121.917 77.1854 121.917C74.7215 121.917 72.3585 120.939 70.6154 119.198L50.8889 99.4759C46.5553 95.1416 43.3603 89.8033 41.5882 83.9359C39.8161 78.0685 39.5217 71.8541 40.7315 65.8455C41.9412 59.8369 44.6174 54.2205 48.522 49.4961C52.4266 44.7716 57.4384 41.0856 63.1117 38.7659C68.7849 36.4463 74.9436 35.565 81.0397 36.2004C87.1358 36.8358 92.9803 38.9683 98.0533 42.4081C103.126 45.8479 107.27 50.4883 110.116 55.9164C112.963 61.3446 114.423 67.3922 114.368 73.5211M109.72 124.311V124.357M109.72 110.366C111.803 110.36 113.825 109.654 115.46 108.363C117.095 107.071 118.25 105.269 118.739 103.243C119.229 101.218 119.025 99.0868 118.16 97.1912C117.295 95.2955 115.819 93.7448 113.968 92.7873C112.119 91.8401 110.004 91.5464 107.966 91.954C105.929 92.3616 104.09 93.4466 102.748 95.0324" stroke="#7D8A93" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //         `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式`,
    //   SecondTittle: "「淡水站」、「關渡站」",
    //   ThirdTittle: "上傳成功",
    //   ButtonText: "確認",
    //   allowOutsideClick: true,
    //   function: () => {
    //     console.log("Alert 確認按鈕被點擊");
    //   },
    // };

    const stations = ref([
      {
        id: 1,
        title: "國父紀念館站",
      },
      {
        id: 2,
        title: "台北車站",
      },
      { id: 3, title: "龍山寺站" },
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

    const lines = ref([
      {
        id: 1,
        title: "國父紀念館站",
        subtitle:
          "館內展出孫中山事蹟，周邊大草坪適合休憩，還可遠眺台北 101，信義區的百貨商場與夜生活就在附近。",
        message: "請拍攝「國父紀念館映池」",
        // img: "/src/assets/images/MissionSpecial/red_01.png",
        checkText: "",
        img: null,
      },
      {
        id: 2,
        title: "台北車站",
        subtitle:
          "台北交通樞紐，鐵路、高鐵、捷運交會，商場、美食、書店齊聚，連通地下街，適合購物與休閒。",
        message: "請拍攝「北門」",
        checkText: "",
        img: null,
      },
      {
        id: 3,
        title: "龍山寺站",
        subtitle:
          " 艋舺龍山寺香火鼎盛，是台北最古老的寺廟之一，周邊有剝皮寮老街、華西街夜市，展現濃厚的歷史與庶民文化。",
        message: "請拍攝「龍山寺」",
        checkText: "",
        img: null,
      },
    ]);
    const questions = ref([
      {
        id: 1,
        title: "問答",
        message: "藍線知識大挑戰，你能答對嗎？",
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
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 47.5L19 57L47.5 85.5L95 38L85.5 28.5L47.5 66.5L28.5 47.5Z" fill="white"/>
</svg>`;

    const GetUserId = ref("");
    // 當 user_status 有值時更新：
    if (user_status.value) {
      GetUserId.value = user_status.value.uid;
    }
    const imageUrl = ref("");
    const uploadDate = ref("");
    const mission = ref("板南線");
    const updateImagePath = async () => {
      for (let i = 0; i < lines.value.length; i++) {
        const index = i; // 保留 index 變數，確保對應 `lines.value[index]`
        const imagePath = `photos/${GetUserId.value}/`;
        const stationPrefix = `${mission.value}_${lines.value[index].title}_${uploadDate.value}`;

        try {
          console.log("下載路徑:", imagePath);
          const folderRef = storageRef(storage, imagePath);
          const fileList = await listAll(folderRef);
          // 過濾符合該站點的檔案，並按時間排序
          const stationFiles = fileList.items
            .map((file) => file.name)
            .filter((name) => name.startsWith(stationPrefix))
            .sort((a, b) => b.localeCompare(a)); // 降冪排序（最新在前）

          if (stationFiles.length > 0) {
            const latestImage = stationFiles[0]; // 最新的檔案
            const latestImageRef = storageRef(storage, `${imagePath}${latestImage}`);
            const url = await getDownloadURL(latestImageRef);

            // lines.value[index].img = url;
            // 加上防快取參數，確保圖片能正確更新
            // lines.value[index].img = `${url}?t=${Date.now()}`;
            // 透過不可變更新觸發 Vue 的響應式檢測
            // lines.value = [...lines.value];
            if (lines.value[index].img !== url) {
              lines.value[index].img = `${url}?t=${Date.now()}`; // 防快取
            }
            await nextTick();
            console.log(
              "DOM 更新後的 img src:",
              document.querySelector(`img[alt="${lines.value[index].title}"]`)?.src
            );
            console.log(`${lines.value[index].title} 圖片下載成功:`, url);
          } else {
            console.warn(`${lines.value[index].title} 沒有找到符合條件的圖片`);
          }
        } catch (error) {
          console.error(
            `${lines.value[index].title} 下載圖片失敗:`,
            error.code,
            error.message
          );
        }
      }
    };
    const handleUploadSuccess = async (newValue) => {
      console.log(newValue);
      console.log("上傳成功，開始更新圖片");
      await updateImagePath();

      // 準備將目前上傳圖片的 URL 跟 "審核中" 的照片狀態寫入 FireBase
      getUserAllPhotoData(user_status.value.uid);

      // 更新目前文字的狀態為 "審核中"

      switch (newValue) {
        case "國父紀念館站":
          lines.value[0].checkText = "審核中";
          break;
        case "台北車站":
          lines.value[1].checkText = "審核中";
          break;
        case "龍山寺站":
          lines.value[2].checkText = "審核中";
          break;
        default:
          break;
      }
    };
    const markQuestionAsAnswered = async (data) => {
      console.log("收到 update-question-status 事件:", data);

      if (!data.isCorrect) {
        console.log("答錯，不進行更新");
        return;
      }

      try {
        await GetUserQuestionData(user_status.value.uid, mission.value, true);
        isanswered.value = true;
        selectedQuestion.value.answered = true;
        console.log("✅ 問答狀態更新完成");
      } catch (err) {
        console.error(" 更新 Firebase 失敗:", err.message);
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
      setTimeout(() => {
        CheckUserStatus(); //等 3 秒再執行判斷用戶是否登入
      }, 3000);

      // 監聽用戶登入狀態
      watch(user_status, (newValue, oldValue) => {
        console.log("用戶登入狀態:", newValue);

        if (newValue == null) {
          setTimeout(() => {
            CheckUserStatus();
          }, 3000); // 等 3 秒再執行登入判斷，避免執行其他彈窗時間重疊到
        }
      });
      watch(updateImagePath, { immediate: true });

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
      CheckUserStatus,
      alert_user_login_ref,
      mission,
      GetUserId,
      checkIcon,
      getDownloadURL,
      storageRef,
      imageUrl,
      markQuestionAsAnswered,
      handleUploadSuccess,
      isanswered,
      currentClickedStation,
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
