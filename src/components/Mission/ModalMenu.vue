<template>
  <div class="modal-overlay">
    <div class="modal-container modal-large">
      <div v-if="type === 'rewards' || type === 'stampBook'">
        <div class="modal-header">
          <div class="modal-title title1 bold">
            {{ type === "rewards" ? "獎勵領取" : "集章冊" }}
          </div>
          <button @click="$emit('close')" class="close-btn light">
            <span>&#10005;</span>
          </button>
        </div>
        <div class="modal-content">
          <!-- Tab 按鈕 -->
          <div>
            <button
              class="tabs title1"
              :class="{ active: activeTab === 'task' }"
              @click="activeTab = 'task'"
            >
              定位任務
            </button>
            <button
              class="tabs title1"
              :class="{ active: activeTab === 'achievement' }"
              @click="activeTab = 'achievement'"
            >
              成就任務
            </button>
            <button
              class="tabs title1"
              :class="{ active: activeTab === 'special' }"
              @click="activeTab = 'special'"
            >
              特殊任務
            </button>
          </div>

          <div class="tab-content item title2 bold">
            <div class="tab-content" v-if="type === 'rewards'">
              <div v-if="activeTab === 'task'">
                <TaskDisplay
                  v-for="(task, index) in locationTasks"
                  :key="index"
                  :task="task"
                  :onClaim="() => claimTaskReward('定位任務', index)"
                />
              </div>
              <div v-if="activeTab === 'achievement'">
                <TaskDisplay
                  v-for="(task, index) in achievementTasks"
                  :key="index"
                  :task="task"
                  :onClaim="() => claimTaskReward('成就任務', index)"
                />
              </div>
              <div v-if="activeTab === 'special'">
                <TaskDisplay
                  v-for="(task, index) in specialTasks"
                  :key="index"
                  :task="task"
                  :onClaim="() => claimTaskReward('特殊任務', index)"
                />
              </div>
            </div>
            <!-- StampBook 模式: 只顯示徽章 -->
            <div class="tab-content" v-if="type === 'stampBook'">
              <div v-if="activeTab === 'task'">
                <BadgeDisplay
                  v-for="(badge, index) in completedLocationBadges"
                  :key="index"
                  :badge="badge"
                />
              </div>
              <div v-if="activeTab === 'achievement'">
                <BadgeDisplay
                  v-for="(badge, index) in completedAchievementBadges"
                  :key="index"
                  :badge="badge"
                />
              </div>
              <div v-if="activeTab === 'special'">
                <BadgeDisplay
                  v-for="(badge, index) in completedSpecialBadges"
                  :key="index"
                  :badge="badge"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="type === 'gameRules'">
        <!-- 幻燈片標題 -->
        <div class="modal-header">
          <div class="modal-title title1 bold">
            <div v-if="activeSlide === 0">玩法說明</div>
            <div v-if="activeSlide === 1">一般任務</div>
            <div v-if="activeSlide === 2">特殊任務</div>
          </div>
          <button @click="$emit('close')" class="close-btn light">
            <span>&#10005;</span>
          </button>
        </div>
        <div class="modal-content">
          <div class="slide-content">
            <!-- 第一頁：玩法說明 -->
            <div v-if="activeSlide === 0" class="rules-page1">
              <p>
                此互動遊戲可分為 "一般任務" 與 "特殊任務"
                兩種玩法，皆可透過遊玩達成任務獲得相關對應的獎勳積分以及成就解鎖與蒐集徽章，玩家可透過獲取的積分至
                "購物商城" 進行商品免費兌換或商品購買價格折抵 ( 每 5 積分可折抵
                1元 )
              </p>
              <div>
                <div class="game-rules">
                  <div class="game-rules1">
                    <div class="rules-title2">
                      <h2>一般任務</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="84"
                        height="109"
                        viewBox="0 0 84 109"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_2006_16851)">
                          <path
                            d="M39 49.025C35.5427 49.025 32.227 47.7212 29.7824 45.4004C27.3377 43.0797 25.9643 39.9321 25.9643 36.65C25.9643 33.3679 27.3377 30.2203 29.7824 27.8996C32.227 25.5788 35.5427 24.275 39 24.275C42.4573 24.275 45.773 25.5788 48.2176 27.8996C50.6623 30.2203 52.0357 33.3679 52.0357 36.65C52.0357 38.2751 51.6985 39.8843 51.0434 41.3857C50.3883 42.8871 49.4281 44.2513 48.2176 45.4004C47.0072 46.5496 45.5701 47.4611 43.9886 48.083C42.407 48.7049 40.7119 49.025 39 49.025ZM39 2C29.3196 2 20.0357 5.65061 13.1906 12.1487C6.34552 18.6469 2.5 27.4602 2.5 36.65C2.5 62.6375 39 101 39 101C39 101 75.5 62.6375 75.5 36.65C75.5 27.4602 71.6545 18.6469 64.8094 12.1487C57.9643 5.65061 48.6804 2 39 2Z"
                            fill="#FF0000"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_2006_16851"
                            x="0.5"
                            y="0"
                            width="83"
                            height="109"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="3" dy="3" />
                            <feGaussianBlur stdDeviation="2.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_2006_16851"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_2006_16851"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div class="rules-item">
                      <p>定位打卡捷運站點</p>
                      <p>捷運站 5 公里範圍內</p>
                      <p>24 小時後即可重複打卡</p>
                    </div>
                  </div>
                  <div class="game-rules2">
                    <div class="rules-title2">
                      <h2>特殊任務</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="101"
                        height="100"
                        viewBox="0 0 101 100"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_2055_3861)">
                          <path
                            d="M47.5 2.5L58.0522 36.3582L92.1997 36.3582L64.5737 57.2837L75.1259 91.1418L47.5 70.2163L19.8741 91.1418L30.4263 57.2837L2.80034 36.3582L36.9478 36.3582L47.5 2.5Z"
                            fill="#FFF200"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_2055_3861"
                            x="0.800781"
                            y="0.5"
                            width="99.3984"
                            height="98.6416"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="3" dy="3" />
                            <feGaussianBlur stdDeviation="2.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_2055_3861"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_2055_3861"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div class="rules-item">
                      <p>景點拍照上傳打卡</p>
                      <p>小知識問答</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 第二頁：一般任務 -->
            <div v-if="activeSlide === 1" class="rules-page2">
              <p>
                一般任務主要遊玩方法為定位捷運站點打卡，透過玩家定位位置與附近 5
                公里範圍內的捷運站點來判別玩家是否位於該捷運站點，若要遊玩
                "一般任務" 請務必開啟裝置或瀏覽器定位功能 !
              </p>
              <p>
                若系統判別用戶位於該捷運站點位置時，畫面中該站點將會呈現 "玩家"
                圖標，代表玩家目前位於此捷運站點位置中，此時點擊該圖標將會跳出
                "定位成功" 畫面視窗，系統將會通知用戶至 "獎勳領取"
                區域進行領取相對應的積分，完成任務。
              </p>
              <p>
                一般定位任務可重複執行，但執行完成後將在 24 小時後進行重置，即每
                24 小時可完成單一站點打卡任務領取一次積分。
              </p>
              <div class="game-icon">
                <p>打卡成功</p>
                <img src="/img/Group 37206.png" alt="打卡成功" />

                <p>積分領取</p>
                <div class="game-icon menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="31"
                    viewBox="0 0 35 31"
                    fill="none"
                  >
                    <path
                      d="M2.53902 29.6025C2.53902 30.256 3.14677 30.7839 3.89902 30.7839H16.054V16.903H2.53902V29.6025ZM18.944 30.7839H31.099C31.8513 30.7839 32.459 30.256 32.459 29.6025V16.903H18.944V30.7839ZM33.139 8.04279H26.866C27.444 7.25276 27.784 6.31506 27.784 5.3109C27.784 2.50149 25.1533 0.216309 21.919 0.216309C20.1595 0.216309 18.5743 0.895588 17.499 1.96619C16.4238 0.895588 14.8385 0.216309 13.079 0.216309C9.84477 0.216309 7.21402 2.50149 7.21402 5.3109C7.21402 6.31506 7.54977 7.25276 8.13202 8.04279H1.85902C1.10677 8.04279 0.499023 8.57071 0.499023 9.22414V14.3926H16.054V8.04279H18.944V14.3926H34.499V9.22414C34.499 8.57071 33.8913 8.04279 33.139 8.04279ZM16.054 7.89512H13.079C11.4385 7.89512 10.104 6.73591 10.104 5.3109C10.104 3.88589 11.4385 2.72669 13.079 2.72669C14.7195 2.72669 16.054 3.88589 16.054 5.3109V7.89512ZM21.919 7.89512H18.944V5.3109C18.944 3.88589 20.2785 2.72669 21.919 2.72669C23.5595 2.72669 24.894 3.88589 24.894 5.3109C24.894 6.73591 23.5595 7.89512 21.919 7.89512Z"
                      fill="#FF3B30"
                    />
                  </svg>
                  <span>獎勵領取</span>
                </div>
                <p>兌換商品</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="49"
                  height="100"
                  viewBox="0 0 49 48"
                  fill="none"
                >
                  <rect
                    width="48"
                    height="48"
                    transform="translate(0.499023)"
                    fill="#232529"
                  />
                  <path
                    d="M15.499 40C17.1559 40 18.499 38.6569 18.499 37C18.499 35.3431 17.1559 34 15.499 34C13.8422 34 12.499 35.3431 12.499 37C12.499 38.6569 13.8422 40 15.499 40Z"
                    fill="white"
                  />
                  <path
                    d="M33.499 40C35.1559 40 36.499 38.6569 36.499 37C36.499 35.3431 35.1559 34 33.499 34C31.8422 34 30.499 35.3431 30.499 37C30.499 38.6569 31.8422 40 33.499 40Z"
                    fill="white"
                  />
                  <path
                    d="M6.49902 10H10.499L11.699 16M11.699 16L14.499 30H34.499L38.499 16H11.699Z"
                    stroke="white"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <!-- <img src="/img/humbleicons_cart.png" alt="cart" /> -->
              </div>
            </div>

            <!-- 第三頁：特殊任務 -->
            <div v-if="activeSlide === 2" class="rules-page3">
              <div class="rules-list">
                <ol>
                  <li>玩家需選擇一條台北捷運線，挑戰一日遊或半日遊行程：</li>
                  <ol class="rules-list circle">
                    <li>一日遊:4個景點與1個問答。</li>
                    <li>半日遊:3個景點與1個問答。</li>
                  </ol>

                  <li>
                    玩家可自由選擇景點，在每個景點拍攝含有指定標的物的照片並上傳。
                    照片需經官方審核，審核時間約1個工作天。若照片不清晰或照片中無指定標的物，將被視為未完成挑戰，需重新拍攝上傳。
                  </li>
                  <p>上傳失敗例:</p>
                  <div class="game-icon special">
                    <div class="icon">
                      <p>照片不清晰</p>
                      <img src="https://picsum.photos/id/100/100/?blur" />
                    </div>
                    <div class="icon">
                      <p>無指定標的物 <br />ex:台北101</p>
                      <img src="https://picsum.photos/id/236/100/100" />
                    </div>
                  </div>

                  <li>
                    每一線景點及問答挑戰完成後，即完成該條線的行程，可至「徽章領取」及「集章冊」領取積分與徽章。
                  </li>
                  <div class="game-icon special">
                    <div class="icon">
                      <p>任務完成</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 171 171"
                        fill="none"
                      >
                        <circle cx="85.5" cy="85.5" r="85.5" fill="#E3002C" />
                        <path
                          d="M133.448 127.669L110.371 119.769L102.429 142.837L84.7048 108.234L67.9009 142.837L59.9594 119.769L36.8828 127.669L53.6867 93.0671C47.9719 85.9173 44.8655 77.0257 44.8819 67.865C44.8819 57.1584 49.126 46.8903 56.6806 39.3195C64.2352 31.7488 74.4814 27.4956 85.1652 27.4956C95.849 27.4956 106.095 31.7488 113.65 39.3195C121.204 46.8903 125.448 57.1584 125.448 67.865C125.448 77.3807 122.168 86.1466 116.644 93.0671L133.448 127.669ZM56.3914 67.865L71.8717 75.5929L70.7783 92.8941L85.1652 83.3207L99.552 92.8364L98.5737 75.5929L113.939 67.865L98.5162 60.0795L99.552 42.8937L85.1652 52.3516L70.7783 42.7783L71.7566 60.1372L56.3914 67.865Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="arrow">&#10148;</span>
                    <div class="icon">
                      <p>徽章領取</p>
                      <div class="game-icon menu">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 45 45"
                        >
                          <path
                            fill="#00b8f0"
                            d="M43 10.41L26 9.6v1.57h-4V9.6l-17 .81a2 2 0 0 0-1.9 2v27a2 2 0 0 0 2.13 2l13.44-.81a1 1 0 0 1 .95.54c.26.66 1 .91 1.89.91h5c.88 0 1.63-.25 1.89-.91a1 1 0 0 1 .95-.54l13.44.81a2 2 0 0 0 2.13-2v-27a2 2 0 0 0-1.92-2"
                          ></path>
                          <path
                            fill="#4acfff"
                            d="M43 10.41L26 9.6v1.57h-4V9.6l-17 .81a2 2 0 0 0-1.9 2v3.5a2 2 0 0 1 1.9-2L24 13l19 .91a2 2 0 0 1 1.9 2V12.4a2 2 0 0 0-1.9-1.99"
                          ></path>
                          <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M43 10.41L26 9.6v1.57h-4V9.6l-17 .81a2 2 0 0 0-1.9 2v27a2 2 0 0 0 2.13 2l13.44-.81a1 1 0 0 1 .95.54c.26.66 1 .91 1.89.91h5c.88 0 1.63-.25 1.89-.91a1 1 0 0 1 .95-.54l13.44.81a2 2 0 0 0 2.13-2v-27a2 2 0 0 0-1.92-2"
                            stroke-width="1"
                          ></path>
                          <path
                            fill="#627b8c"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 36h6v2a1.54 1.54 0 0 1-1.54 1.54h-2.92A1.54 1.54 0 0 1 21 38z"
                            stroke-width="1"
                          ></path>
                          <path
                            fill="#45413c"
                            d="M7 43.5a17 1.5 0 1 0 34 0a17 1.5 0 1 0-34 0"
                            opacity="0.15"
                          ></path>
                          <path
                            fill="#fffef2"
                            d="m8.59 9.5l-2.16 2.74a2.05 2.05 0 0 0-.34 1.13V39l2.5-3.67Zm30.82 0l2.16 2.74a2.05 2.05 0 0 1 .34 1.13V39l-2.5-3.67Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M6.43 12.24a2.05 2.05 0 0 0-.34 1.13v3.5a2.05 2.05 0 0 1 .34-1.13L8.59 13V9.5Zm35.14 0L39.41 9.5V13l2.16 2.74a2.05 2.05 0 0 1 .34 1.13v-3.5a2.05 2.05 0 0 0-.34-1.13"
                          ></path>
                          <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.59 9.5l-2.16 2.74a2.05 2.05 0 0 0-.34 1.13V39l2.5-3.67Zm30.82 0l2.16 2.74a2.05 2.05 0 0 1 .34 1.13V39l-2.5-3.67Z"
                            stroke-width="1"
                          ></path>
                          <path
                            fill="#fffef2"
                            d="M24 37V11a3 3 0 0 0-3-3l-11.5.92a1.52 1.52 0 0 0-.91.58v29l12.63-.4A3.42 3.42 0 0 1 24 37m3-29a3 3 0 0 0-3 3v26a3.42 3.42 0 0 1 2.78 1.1l12.63.4v-29a1.52 1.52 0 0 0-.91-.58Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="m21 8l-11.5.92a1.52 1.52 0 0 0-.91.58v2.92a1 1 0 0 1 .91-1L21 10.5a3 3 0 0 1 3 3V11a3 3 0 0 0-3-3m17.5.92L27 8a3 3 0 0 0-3 3v2.5a3 3 0 0 1 3-3l11.5.92a1 1 0 0 1 .91 1V9.5a1.52 1.52 0 0 0-.91-.58"
                          ></path>
                          <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 37V11a3 3 0 0 0-3-3l-11.5.92a1.52 1.52 0 0 0-.91.58v29l12.63-.4A3.42 3.42 0 0 1 24 37m3-29a3 3 0 0 0-3 3v26a3.42 3.42 0 0 1 2.78 1.1l12.63.4v-29a1.52 1.52 0 0 0-.91-.58Z"
                            stroke-width="1"
                          ></path>
                          <path
                            fill="#fffce5"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 37a3 3 0 0 0-3-2.5l-12.41.83L6.09 39l15.09-.83A3.34 3.34 0 0 1 24 37m2.82 1.17l15.09.83l-2.5-3.67L27 34.5a3 3 0 0 0-2.95 2.5a3.34 3.34 0 0 1 2.77 1.17"
                            stroke-width="1"
                          ></path>
                          <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m20.5 11.5l-9 .86m9 2.97l-9 .86m9 2.97l-9 .85m9 2.98l-9 .85m9 2.97l-9 .86m9 2.97l-9 .86m16-20l9 .86m-9 2.97l9 .86m-9 2.97l9 .85m-9 2.98l9 .85m-9 2.97l9 .86m-9 2.97l9 .86"
                            stroke-width="1"
                          ></path>
                        </svg>
                        <span>集章冊</span>
                      </div>
                    </div>
                    <span class="arrow">&#10148;</span>
                    <div class="icon">
                      <p>積分領取</p>
                      <div class="game-icon menu">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="31"
                          viewBox="0 0 35 31"
                          fill="none"
                        >
                          <path
                            d="M2.53902 29.6025C2.53902 30.256 3.14677 30.7839 3.89902 30.7839H16.054V16.903H2.53902V29.6025ZM18.944 30.7839H31.099C31.8513 30.7839 32.459 30.256 32.459 29.6025V16.903H18.944V30.7839ZM33.139 8.04279H26.866C27.444 7.25276 27.784 6.31506 27.784 5.3109C27.784 2.50149 25.1533 0.216309 21.919 0.216309C20.1595 0.216309 18.5743 0.895588 17.499 1.96619C16.4238 0.895588 14.8385 0.216309 13.079 0.216309C9.84477 0.216309 7.21402 2.50149 7.21402 5.3109C7.21402 6.31506 7.54977 7.25276 8.13202 8.04279H1.85902C1.10677 8.04279 0.499023 8.57071 0.499023 9.22414V14.3926H16.054V8.04279H18.944V14.3926H34.499V9.22414C34.499 8.57071 33.8913 8.04279 33.139 8.04279ZM16.054 7.89512H13.079C11.4385 7.89512 10.104 6.73591 10.104 5.3109C10.104 3.88589 11.4385 2.72669 13.079 2.72669C14.7195 2.72669 16.054 3.88589 16.054 5.3109V7.89512ZM21.919 7.89512H18.944V5.3109C18.944 3.88589 20.2785 2.72669 21.919 2.72669C23.5595 2.72669 24.894 3.88589 24.894 5.3109C24.894 6.73591 23.5595 7.89512 21.919 7.89512Z"
                            fill="#FF3B30"
                          />
                        </svg>
                        <span>獎勵領取</span>
                      </div>
                    </div>
                    <span class="arrow">&#10148;</span>
                    <div class="icon">
                      <p>兌換商品</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="49"
                        height="80"
                        viewBox="0 0 49 48"
                        fill="none"
                      >
                        <rect
                          width="48"
                          height="48"
                          transform="translate(0.499023)"
                          fill="#232529"
                        />
                        <path
                          d="M15.499 40C17.1559 40 18.499 38.6569 18.499 37C18.499 35.3431 17.1559 34 15.499 34C13.8422 34 12.499 35.3431 12.499 37C12.499 38.6569 13.8422 40 15.499 40Z"
                          fill="white"
                        />
                        <path
                          d="M33.499 40C35.1559 40 36.499 38.6569 36.499 37C36.499 35.3431 35.1559 34 33.499 34C31.8422 34 30.499 35.3431 30.499 37C30.499 38.6569 31.8422 40 33.499 40Z"
                          fill="white"
                        />
                        <path
                          d="M6.49902 10H10.499L11.699 16M11.699 16L14.499 30H34.499L38.499 16H11.699Z"
                          stroke="white"
                          stroke-width="2.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slider" v-if="type === 'gameRules'">
      <button class="pre" @click="prevSlide" :disabled="activeSlide === 0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="42"
          viewBox="0 0 32 42"
          fill="none"
        >
          <path d="M0 21L32 0V42L0 21Z" fill="black" />
        </svg>
      </button>

      <button class="next" @click="nextSlide" :disabled="activeSlide === 2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="42"
          viewBox="0 0 32 42"
          fill="none"
        >
          <path d="M32 21L0 0V42L32 21Z" fill="black" />
        </svg>
      </button>

      <!-- <button @click="$emit('close')" class="btn_filled small close-filled">
        我知道了
      </button> -->
    </div>
  </div>
</template>
<script>
import TaskDisplay from "./TaskDisplay.vue";
import BadgeDisplay from "./BadgeDisplay.vue";

export default {
  props: {
    type: String,
    gameData: Object, // 接收遊戲數據
  },
  components: {
    TaskDisplay,
    BadgeDisplay,
  },
  data() {
    return {
      activeTab: "task",
      activeSlide: 0,

      locationTasks: [
        { progress: 100, title: "淡水站" },
        { progress: 75, title: "紅樹林站" },
      ],
      locationBadges: ["時光旅人", "打卡全制霸"],
      achievementTasks: [
        { progress: 30, title: "時光旅人" },
        { progress: 60, title: "打卡全制霸" },
      ],
      achievementBadges: ["半日遊", "一日遊"],
      specialTasks: [
        { progress: 80, title: "淡水信義線" },
        { progress: 100, title: "板南線" },
      ],
      specialBadges: ["成就徽章 1", "成就徽章 2"],
    };
  },
  methods: {
    prevSlide() {
      if (this.activeSlide > 0) this.activeSlide--;
    },
    nextSlide() {
      if (this.activeSlide < 2) this.activeSlide++;
    },
    claimTaskReward(tab, index) {
      if (tab === "定位任務") {
        this.locationTasks[index].progress = 100;
      } else if (tab === "成就任務") {
        this.achievementTasks[index].progress = 100;
      } else if (tab === "特殊任務") {
        this.specialTasks[index].progress = 100;
      }
    },
  },
  computed: {
    // 只顯示已完成的定位任務徽章
    completedLocationBadges() {
      return this.locationTasks
        .map((task, index) =>
          task.progress === 100 ? this.locationBadges[index] : null
        )
        .filter((badge) => badge !== null);
    },

    // 只顯示已完成的成就任務徽章
    completedAchievementBadges() {
      return this.achievementTasks
        .map((task, index) =>
          task.progress === 100 ? this.achievementBadges[index] : null
        )
        .filter((badge) => badge !== null);
    },

    // 只顯示已完成的特殊遊戲徽章
    completedSpecialBadges() {
      return this.specialTasks
        .map((task, index) =>
          task.progress === 100 ? this.specialBadges[index] : null
        )
        .filter((badge) => badge !== null);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal_menu.scss";
</style>
