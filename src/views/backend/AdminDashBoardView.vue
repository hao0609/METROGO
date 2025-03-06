<script>
// import EditIcon from '@/components/icons/IconAdminEdit.vue';
// import DeleteIcon from '@/components/icons/IconAdminDelete.vue';
// import AddIcon from '@/components/icons/IconAdd.vue';
import BarChart from "../../components/BarChart.vue";

export default {
  name: "AdminDashBoardView",
  components: {
    BarChart,
    // EditIcon,
    // DeleteIcon,
    // AddIcon,
  },

  // 熱門景點 圖表
  data() {
    return {
      popularity: {
        labels: [
          "南港軟體園區",
          "台北101世貿",
          "大安森林公園",
          "國父紀念館",
          "台北車站",
          "東門",
          "中正紀念堂",
          "松江南京",
          "內湖",
          "南勢角",
        ],
        datasets: [
          // 圖表樣式寫在這
          {
            label: "熱門打卡捷運站點 TOP 10",
            backgroundColor: "#f87979",
            data: [40, 38, 30, 29, 25, 23, 20, 19, 14, 10],
          },
        ],
      },
      // 半日遊完成人數 圖表
      half_day_tour: {
        labels: ["板南線", "板南線", "板南線", "板南線", "板南線"],
        datasets: [
          // 圖表樣式寫在這
          {
            label: "半日遊完成人數",
            backgroundColor: "#f87979",
            data: [40, 38, 30, 29, 25, 23, 20, 19, 14, 10],
          },
        ],
      },

      // 一日遊完成人數 圖表
      full_day_tour: {
        labels: ["板南線", "板南線", "板南線", "板南線", "板南線"],
        datasets: [
          // 圖表樣式寫在這
          {
            label: "一日遊完成人數",
            backgroundColor: "#f87979",
            data: [40, 38, 30, 29, 25, 23, 20, 19, 14, 10],
          },
        ],
      },
    };
  },
};
</script>

<template>
  <h1 class="admin-title">後台總覽</h1>
  <div class="dashboard-container">
    <div class="circle-container">
      <div class="item">
        <span>最新照片</span>
        <div class="circle">
          <div class="data-container">
            <p>待審核照片</p>
            <p>待串接資料</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>最新訂單</span>
        <div class="circle">
          <div class="data-container">
            <p>待處理訂單</p>
            <p>待串接資料</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>會員管理</span>
        <div class="circle">
          <div class="data-container">
            <p>新增會員數</p>
            <p>待串接資料</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>行程管理</span>
        <div class="circle">
          <div class="data-container">
            <p>待審核照片</p>
            <p>待串接資料</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span class="hidden">被隱藏了</span>
        <div class="circle">
          <div class="data-container">
            <p>待審核照片</p>
            <p>待串接資料</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mission">
      <span class="">一般任務 </span>
      <BarChart :chartData="popularity" />
    </div>
    <div class="mission">
      <span class="">特殊任務 </span>
      <div class="chart-container">
        <BarChart :chartData="half_day_tour" />
        <BarChart :chartData="full_day_tour" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/sass/page/backend/_admin-dashboard";
</style>
