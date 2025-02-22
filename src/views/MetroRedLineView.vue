<script setup>
import { ref } from 'vue'  
import Message from "../components/Message.vue"
import MessageCard from "../components/MessageCard.vue"
import MetroLineTitle from '@/components/MetroLineTitle.vue'
import Footer from '@/components/Footer.vue'

// 留言板假資料可以先不理他
const messageData = ref([
  {
    id: 1,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1"
      },
    ],
    timestamp: "2025/02/22"
  },
  {
    id: 2,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1"
      },
    ],
    timestamp: "2025/02/22"
  },
  {
    id: 3,
    userName: "吳楚仁",
    rating: 3,
    content: "下午接近黃昏的海山站...",
    images: [
      {
        src: "https://picsum.photos/150/360",
        alt: "海山站景色 1"
      },
    ],
    timestamp: "2025/02/22"
  },
])

</script>

<template>
  <!-- class 後方的 blue 換掉就可以吃到其他線的配色 -->
  <div class="metroline-detail red">
    <div class="introduce">
      <div class="banner-group group-1">
        <div class="banner">
          <div class="banner-img banner-img-1-1">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
        <div class="banner">
          <div class="banner-img banner-img-1-2">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
      </div>

      <div class="banner-group group-2">
        <div class="banner">
          <div class="banner-img banner-img-2-1">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
        <h1 class="banner-group-title">板南線</h1>
        <div class="banner">
          <div class="banner-img banner-img-2-2">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
      </div>

      <div class="banner-group group-3">
        <div class="banner">
          <div class="banner-img banner-img-3-1">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
        <div class="banner">
          <div class="banner-img banner-img-3-2">img</div>
          <div class="banner-txt-wrapper">
            <p class="title1 bold banner-txt-title">有拜有保庇，你想要..?</p>
            <p class="title2 bold banner-txt-content">
              懷著滿滿的願望，誠懇地與神交流吧！充滿歷史意義與神秘的氛圍，不管你想得到
              甚麼或想知道甚麼，甚至煩惱糾結的選擇，這裡都可以給你參考的答案！
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- GO精選 -->
    <!-- 引入 MetroLineTitle 元件可直接輸入標題文字 -->
    <MetroLineTitle title="GO精選" />
    <div class="section-group">
      <div class="go-choise-img">
        <h2 class="group-title">火鍋季開跑</h2>
      </div>
      <div class="go-choise-img">
        <h2 class="group-title">耶誕城派對</h2>
      </div>
    </div>

    <!-- 半日遊行程推薦 -->
    <MetroLineTitle title="板南線半日遊行程推薦" />
    <router-link to="/tour/tourtype">
      <div class="w-full-img">
        <h1 class="group-title white">西門町</h1>
      </div>
    </router-link>

    <!-- 一日遊行程推薦 -->
    <MetroLineTitle title="板南線一日遊行程推薦" />
    <router-link to="/tour/tourtype">
      <div class="w-full-img">
        <h1 class="group-title white">龍山寺</h1>
      </div>
    </router-link>

    <!-- 留言板 -->
    <MetroLineTitle title="留言板" />
    <div class="section-message">
      <div class="section-group message-card-group">
        <MessageCard
          v-for="message in messageData"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>
    <!-- 留言板小工具 -->
    <Message />
  </div>
  <Footer/>
  <!-- <div class="bl_inter_banner_02">
          <div class="bl_inter_banner_02a">
            <img class="bl_14_01" src="../assets/images/sample.jpg"
            width="300px" hight="417px">
          </div>
          <div class="b1_inter_banner_02_1">
            <p class="title1 Bold">當懷舊與新潮達成默契</p>
            <p class="title2 Bold">由舊倉庫來改造成今日的展覽場所，懷舊與新潮在這裡達成默契，品牌與動漫也和諧
            一致地等待你大駕光臨，探索你的想像，支持你愛的偶像，世界就是充滿愛與和平。</P>
          </div>
        </div>

        <div class="bl_inter_banner_03">
          <div class="bl_inter_banner_03a">
            <img class="bl_11_01" src="../assets/images/sample.jpg"
            width="300px" hight="417px">
          </div>
          <div class="b1_inter_banner_03_1">
            <p class="title1 Bold">潮！城市是我的伸展台</p>
            <p class="p5">潮流就是風格，挖掘屬於你自我風格，這裡相信可以滿足你的需求，文青、龐克、韓風、
            日式、台式、美式，在這裡做自己，何必在意別人眼光！</P>
          </div>
        </div>

        <h1>板南線</h1>

        <div class="bl_inter_banner_04">
          <div class="bl_inter_banner_04a">
            <img class="bl_18_01" src="../assets/images/sample.jpg"
            width="300px" hight="417px">
          </div>
          <div class="b1_inter_banner_04_1">
            <p class="p1">百貨公司的密集症候群</p>
            <p class="p5">有人許運池裡滿滿的百貨公司嗎? 那這裡一定不會讓你失望，奢侈品、名牌精品、精緻
            美食、也可能不經意地遇到藝人明星，機會不等人，先來先贏！</P>
          </div>
        </div>

        <div class="bl_inter_banner_05">
          <div class="bl_inter_banner_05a">
            <img class="bl_07_01" src="../assets/images/sample.jpg"
            width="300px" hight="417px">
          </div>
          <div class="b1_inter_banner_05_1">
            <p class="p1">2024全台最嗨的耶誕季</p>
            <p class="p5">來感受濃濃台式的耶誕季，投射巨大的耶誕樹與聲光效果，周邊的燈海與特別打卡拍照
            處，周末還有巨星陪你歡唱不停，更是少不了等你品嘗的美食，猶豫甚麼？還不趕快跟上！</P>
          </div>
        </div>

        <div class="bl_inter_banner_06">
          <div class="bl_inter_banner_06a">
            <img class="bl_12_01" src="../assets/images/sample.jpg"
            width="300px" hight="417px">
          </div>
          <div class="b1_inter_banner_06_1">
            <p class="p1">2024約在北車北三門見喔！</p>
            <p class="p5">身為首都的車站，怎麼可以輕易地錯過它呢？這裡有著最多的人潮，還有絕不能錯過的
            商家與地下街， 眾多的異國美食，有吃有玩，怎能不約在這呢？</P>
          </div>
        </div>

    
        <div class="hr-container">
            <hr>
        <span>GO編精選</span>
        </div>

        <div class="editor_choice_01">
            <img class="hot_pot_01" src="../assets/images/sample.jpg">
            <img class="xmas_party_01" src="../assets/images/sample.jpg">
        </div>

        <div class="hr-container">
            <hr>
            <span>板南線半日遊行程推薦</span>
        </div>
    
        <div class="bl_halfday_travel_01">
            <img class="bl_11_02" src="../assets/images/sample.jpg">
        </div>

        <div class="hr-container">
            <hr>
            <span>板南線一日遊行程推薦</span>
        </div>

        <div class="bl_halfday_travel_01">
            <img class="bl_10_02" src="../assets/images/sample.jpg">
        </div> -->
</template>

<style lang="scss" scoped>
@use "../assets/sass/page/_metro-line.scss";
</style>
