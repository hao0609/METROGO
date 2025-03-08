<template>
  <div>
    <!-- 返回按鈕 -->
    <div class="return-btn title2 bold" @click="goBack"><BackIcon /> 返回</div>
    <h1 class="admin-title">會員資料</h1>
    <div class="user-profile">
      <p class="title2 bold">基本資料</p>
      <div class="profile-card">
        <img :src="user.avatar" alt="會員圖像" class="avatar" />
        <div class="info">
          <div class="info-row">
            <p class="info-title bold">會員 ID</p>
            <span>{{ user.id }}</span>
          </div>
          <div class="info-row">
            <p class="info-title bold">姓名</p>
            <span>{{ user.name }}</span>
          </div>
          <div class="info-row">
            <p class="info-title bold">電子郵件</p>
            <span>{{ user.email }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="admin-form">
      <div class="tabs-container">
        <div class="tabs">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="tab-content">
          <!-- 一般任務頁籤 -->
          <div v-if="activeTab === 'general'">
            <div class="filter-group">
              <div class="select-wrapper small">
                <select class="select-field">
                  <option value="all" selected>路線</option>
                  <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
              </div>
              <div class="input-wrapper small">
                <input type="text" class="input-field" placeholder="捷運站名" />
              </div>
              <button class="btn_filled small">篩選</button>
            </div>
            <div class="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>路線</th>
                    <th>站名</th>
                    <th>打卡狀態</th>
                    <th>打卡時間</th>
                    <th>集章狀態</th>
                    <th>獎勵領取</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(general, index) in generalItems"
                    :key="general.id"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ general.id }}</td>
                    <td>{{ general.route }}</td>
                    <td>{{ general.station }}</td>
                    <td>{{ general.punchStatus }}</td>
                    <td>{{ general.punchTime }}</td>
                    <td>{{ general.chapterStatus }}</td>
                    <td>{{ general.rewardStatus }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 特殊任務頁籤 -->
          <div v-if="activeTab === 'special'">
            <div class="filter-group">
              <div class="select-wrapper small">
                <select class="select-field">
                  <option value="all" selected>路線</option>
                  <option value="">選項</option>
                </select>
                <span class="select-arrow"></span>
              </div>
              <div class="input-wrapper small">
                <input type="text" class="input-field" placeholder="捷運站名" />
              </div>
              <button class="btn_filled small">篩選</button>
            </div>
            <div class="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>路線</th>
                    <th>行程</th>
                    <th>集章狀態</th>
                    <th>獎勵領取</th>
                    <th>查看</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(special, index) in specialItems"
                    :key="special.id"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ special.id }}</td>
                    <td>{{ special.route }}</td>
                    <td>{{ special.journeyTravel }}</td>
                    <td>{{ special.chapterStatus }}</td>
                    <td>{{ special.rewardStatus }}</td>
                    <td class="action-buttons">
                      <button class="table-btn view-btn">
                        <AdminEyeIcon />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 成就頁籤 -->
          <div v-if="activeTab === 'achievements'">
            <div class="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>任務分類</th>
                    <th>成就名稱</th>
                    <th>集章狀態</th>
                    <th>獎勵領取</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(achievements, index) in achievementsItems"
                    :key="achievements.id"
                    :class="{ 'highlight-row': index % 2 === 1 }"
                  >
                    <td>{{ achievements.id }}</td>
                    <td>{{ achievements.category }}</td>
                    <td>{{ achievements.name }}</td>
                    <td>{{ achievements.chapterStatus }}</td>
                    <td>{{ achievements.rewardStatus }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/admin-common.scss";
@use "@/assets/sass/page/backend/admin-userdata.scss";
</style>

<script>
// import EditIcon from '@/components/icons/IconAdminEdit.vue';
// import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
// import AddIcon from '@/components/icons/IconAdd.vue';
import BackIcon from "@/components/icons/IconBack.vue";
import AdminEyeIcon from "@/components/icons/IconAdminEye.vue";

export default {
  name: "AdminUserDataView",
  components: {
    AdminEyeIcon,
    BackIcon,
    // EditIcon,
    // DeleteIcon,
    // AddIcon,
  },
  methods: {
    goBack() {
      this.$router.push("/admin/user");
    },
  },
  data() {
    return {
      activeTab: "general",
      tabs: [
        { id: "general", label: "一般任務" },
        { id: "special", label: "特殊任務" },
        { id: "achievements", label: "成就" },
      ],
      user: {
        id: "TID201111",
        name: "王測試",
        email: "test@gmail.com",
        avatar: "http://127.0.0.1:5500/img/pic-featured_1.svg", // 預設會員圖像
      },
      generalItems: [
        {
          id: 1,
          route: "淡水信義線",
          station: "台北車站",
          punchStatus: "已打卡",
          punchTime: "2024-11-20 22:56:05",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 2,
          route: "淡水信義線",
          station: "臺大醫院站",
          punchStatus: "已打卡",
          punchTime: "2024-11-20 22:56:05",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 3,
          route: "板南線",
          station: "忠孝新生站",
          punchStatus: "已打卡",
          punchTime: "2024-11-20 22:56:05",
          chapterStatus: "已集章",
          rewardStatus: "未領取",
        },
      ],
      specialItems: [
        {
          id: 1,
          route: "淡水信義線",
          journeyTravel: "半日遊",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
          selected: false,
        },
        {
          id: 2,
          route: "淡水信義線",
          journeyTravel: "半日遊",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
          selected: false,
        },
        {
          id: 3,
          route: "板南線",
          journeyTravel: "一日遊",
          chapterStatus: "已集章",
          rewardStatus: "未領取",
          selected: false,
        },
      ],
      achievementsItems: [
        {
          id: 1,
          category: "一般任務",
          name: "時光旅人",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 2,
          category: "一般任務",
          name: "文湖線",
          chapterStatus: "已集章",
          rewardStatus: "已領取",
        },
        {
          id: 3,
          category: "特殊任務",
          name: "全制霸",
          chapterStatus: "已集章",
          rewardStatus: "未領取",
        },
      ],
    };
  },
};
</script>
