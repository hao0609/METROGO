<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner brown">
    <h1>文湖線半日遊</h1>
    <div class="line-container">
      <div class="top">
        <div class="line-station">
          <div class="circle">
            <img src="../assets/images/tour/circle.svg" alt="" />
          </div>
          <div class="line">
            <img src="../assets/images/tour/line.svg" alt="" />
          </div>
          <div class="circle visible">
            <img src="../assets/images/tour/circle.svg" alt="" />
          </div>
          <div class="line visible">
            <img src="../assets/images/tour/line.svg" alt="" />
          </div>
          <router-link to="#target1">
            <div class="hover-container">
              <div class="circle hover-light">
                <img src="../assets/images/tour/circle.svg" alt="" />
              </div>
              <p class="station-name">大直站</p>
            </div>
          </router-link>
          <div class="line visible">
            <img src="../assets/images/tour/line.svg" alt="" />
          </div>
          <router-link to="#target2">
            <div class="hover-container">
              <div class="circle hover-light">
                <img src="../assets/images/tour/circle.svg" alt="" />
              </div>
              <p class="station-name">劍南路站</p>
            </div>
          </router-link>
          <div class="line visible">
            <img src="../assets/images/tour/line.svg" alt="" />
          </div>
          <div class="circle visible">
            <img src="../assets/images/tour/circle.svg" alt="" />
          </div>
          <div class="line">
            <img src="../assets/images/tour/line.svg" alt="" />
          </div>
          <div class="circle">
            <img src="../assets/images/tour/circle.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>
        <div class="line">
          <img src="../assets/images/tour/line.svg" alt="" />
        </div>
        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>
        <div class="line">
          <img src="../assets/images/tour/line.svg" alt="" />
        </div>
        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>
        <div class="line">
          <img src="../assets/images/tour/line.svg" alt="" />
        </div>

        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>

        <div class="line">
          <img src="../assets/images/tour/line.svg" alt="" />
        </div>
        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>
        <div class="line">
          <img src="../assets/images/tour/line.svg" alt="" />
        </div>
        <div class="circle">
          <img src="../assets/images/tour/circle.svg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <!-- 內文 -->
  <div class="paragraph brown">
    <div class="station" id="target1">
      <h2>捷運大直站</h2>
      <div class="paragraph-container">
        <p class="title1 name">實踐大學商圈</p>
        <p class="title1">
          地址：台北市中山區北安路<br />
          營業時間：10:00-22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            作為學生商圈，這裡擁有眾多 平價美食、小吃店與異國料理，從傳統台式便當、麵食，到日韓料理、義大
            利麵、手搖飲料店等應有盡有。其中，北安路與實踐大學周邊巷弄 更聚集了許多文青咖啡館與特色小餐館，
            成為學生與年輕人聚會的熱門地點。此外，夜間時段，周邊也有不少宵夜選擇，如滷味、鹽酥雞與居酒屋，
            深受學生和附近居民的喜愛。<br />
            <br />
            雖然商圈的規模不像美麗華商圈那麼大，但生活機能完善，周邊有 超商、超市、文具店、運動用品店等，
            滿足學生與居民的日常需求。部分店家特別針對學生提供優惠，如文具店、影印店與平價服飾店，讓大學
            生能以較低的預算採購所需物品。此外，鄰近的北安路上還有大型超市與量販店，提供更完整的購物選擇。<br />
            <br />
            商圈交通便利，距離 捷運大直站 只需步行約 5 分鐘，搭乘文湖線可快速抵達台北市中心。周邊還有多條
            公車路線，方便往返內湖、士林等地。此外，該區鄰近 迎風河濱公園，提供運動與休閒空間，讓學生與居民
            能夠輕鬆享受戶外活動。<br />
            <br />
            近年來，不少新穎的 文青咖啡館、創意料理餐廳 陸續進駐，使這個商圈逐漸走向多元化的發展。此外，
            隨著北市政府推動北安路周邊的都市更新，未來該區的商業與住宅價值預計將進一步提升。總體來說，大直
            實踐大學商圈以學生與年輕族群為主要客群，擁有親民的消費環境、多元的美食選擇與便利的交通條件，
            是台北市內充滿年輕活力與潛力的特色商圈之一。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_08.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/shih_chien_university_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/shih_chien_university_03.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/shih_chien_university_04.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">經國七海文化園區</p>
        <p class="title1">
          地址：台北市中山區北安路301號<br />
          營業時間：09:00–17:00，週一休息
        </p>
        <div class="text">
          <p class="paragraph-content">
            經國七海文化園區位於台北市中山區大直地區，鄰近基隆河畔，是為了紀念前總統 蔣經國 而設立的文化園區。
            該園區以 七海寓所 為核心，結合歷史建築、人文展覽與綠意景觀，提供市民一個認識台灣近代歷史、休閒散步
            與文化體驗的空間。<br />
            <br />
            這裡原是蔣經國於 1975 年至 1988 年擔任行政院長與總統期間的官邸，建築融合中西風格，內部裝潢簡約而
            莊重，呈現蔣經國一貫的低調務實風格。寓所內部保留了當時的家具擺設，讓遊客能一窺這位領導者的生活日常。
            此外，寓所內的展覽區展示了蔣經國生前的文物、書信與影像資料，使遊客能深入了解他的執政理念與歷史背景。<br />
            <br />
            園區內擁有大片綠地，種植了許多珍貴樹種，環境清幽，適合散步與拍照。基隆河畔的景色與整潔的步道，使這裡
            成為當地居民運動與休憩的好去處。除了七海寓所外，園區內還設有 經國先生紀念館，透過多媒體展示與互動裝置，
            介紹蔣經國的生平事蹟與當代歷史發展。此外，園區內不時舉辦文化講座、歷史導覽與特展活動，吸引歷史愛好者與
            學術界人士前來參訪。<br />
            <br />
            這裡不僅保存了重要的歷史文化資產，也提供市民一個寓教於樂的空間。未來，隨著政府對文化園區的推廣，預計將
            引入更多多元化展覽與教育活動，讓更多人能夠認識台灣近代歷史的重要篇章。<br />

          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_04.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/ching-kuo_chi-haicultural_park_03.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/ching-kuo_chi-haicultural_park_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/ching-kuo_chi-haicultural_park_01.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運劍南路站</h2>
      <div class="paragraph-container">
        <p class="title1 name">美麗華百樂園</p>
        <p class="title1">
          地址：台北市中山區敬業三路20號<br />
          營業時間：11:00-22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            美麗華百樂園（Miramar Entertainment Park)，是北台北知名的購物與娛樂中心。自 2004 年開幕以來，憑藉
            著多元的購物品牌、豐富的餐飲選擇、先進的影城以及標誌性的摩天輪，成為大直商圈的核心地標，也是許多台北
            人休閒娛樂的首選地點。<br />
            <br />
            商場擁有多層樓的購物空間，涵蓋國際精品、潮流服飾、運動品牌、生活家居 等，滿足不同消費族群的需求。百貨
            內也設有 無印良品（MUJI）、UNIQLO、Nike、Adidas 等知名品牌，提供時尚與休閒用品。此外，館內還有各式
            化妝品專櫃與家電賣場，吸引愛美與科技愛好者前來選購。<br />
            <br />
            美食區域豐富多樣，從平價美食到高級餐廳應有盡有。美食街 匯聚中西日韓等各國料理，如拉麵、火鍋、壽司、
            牛排等，適合家庭聚餐與朋友聚會。此外，館內還有多家 星巴克、哈根達斯、天仁茗茶 等咖啡與甜點店，提供
            舒適的休憩空間。若想享受更高級的餐飲體驗，頂樓的景觀餐廳區 提供精緻法式料理與浪漫夜景，是約會與慶祝
            特別日子的好選擇。<br />
            <br />
            這裡最具代表性的地標便是直徑 70 公尺的摩天輪，夜間燈光變化繽紛，是情侶與遊客拍照打卡的熱門景點。此外，
            館內設有國賓影城，擁有IMAX 巨幕影廳，提供極致的觀影體驗，吸引電影愛好者前來朝聖。百貨內還有大型兒童
            遊樂區，讓親子家庭也能盡情享受休閒時光。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_07.png"
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/miramar_02.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/miramar_05.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/miramar_04.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">美堤河濱公園</p>
        <p class="title1">
          地址：台北市中山區樂群一路基隆河基16號水門<br />
          營業時間：24小時
        </p>
        <div class="text">
          <p class="paragraph-content">
            美堤河濱公園 位於台北市中山區，緊鄰基隆河畔，橫跨 大直橋與中山橋 之間，是台北市民休閒運動的熱門景點。
            公園擁有開闊的綠地、完善的自行車道、兒童遊樂設施與絕佳的河岸風景，吸引許多運動愛好者、家庭與攝影愛好者
            前來享受自然與戶外活動。<br />
            <br />
            擁有大片綠草地，環境整潔且規劃完善，沿著基隆河畔提供了寬敞的散步與休憩空間。公園內種植了各式花草樹木，
            四季景色變化豐富，特別是春天櫻花綻放時，成為遊客拍照打卡的熱門地點。此外，這裡視野開闊，可以遠眺 大直橋、
            美麗華摩天輪與松山機場，尤其黃昏與夜晚的燈光倒映在河面上，更增添浪漫氛圍。<br />
            <br />
            這裡也是運動愛好者的天堂，擁有長達數公里的自行車道與慢跑步道，沿途風景優美，適合單車騎行、慢跑與散步。
            這裡也是台北市熱門的溜直排輪與滑板場地，並設有籃球場、網球場與兒童遊樂區，讓不同年齡層的市民都能享受戶外
            活動。此外，公園內也規劃了寵物友善空間，許多飼主會帶著愛犬來此散步與互動，形成友善的社區氛圍。<br />
            <br />
            此地也經常舉辦路跑活動、自行車賽與露天音樂會，為城市增添更多活力與文化氣息。這裡結合了自然景觀、運動設施
            與休閒空間，是台北市難得的都市綠地。不論是騎單車、運動健身，或是單純來散步賞景，這裡都是遠離城市喧囂、
            享受悠閒時光的理想地點。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_06.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/meiti_riverside_park_03.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/meiti_riverside_park_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/meiti_riverside_park_01.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
