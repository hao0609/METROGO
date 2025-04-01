<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner green">
    <h1>松山新店線半日遊</h1>
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
              <p class="station-name">松山站</p>
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
              <p class="station-name">台北小巨蛋站</p>
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
  <div class="paragraph green">
    <div class="station" id="target1">
      <h2>捷運松山站</h2>
      <div class="paragraph-container">
        <p class="title1 name">五分埔</p>
        <p class="title1">
          地址：台北市信義區永吉路443巷9弄<br />
          營業時間：13:00–22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            五分埔商圈位於台北市信義區，是台灣最大的成衣批發市場，以平價流行服飾聞名。這裡原本是傳統
            住宅區，後來逐漸發展成為成衣批發重地，吸引眾多服飾商家與消費者前來採購，成為台北時尚產業
            的重要據點。<br />
            <br />
            裡面的店家主要販售男女流行服飾、鞋包配件、運動休閒服、韓系與日系穿搭等，種類多元且價格親民。
            這裡不僅是年輕人尋找時尚單品的好去處，也是不少服飾店主前來批貨的地方，因此有「台北東大門」
            之稱。由於商品流動快速，每週都能發現最新流行款式，讓消費者能夠以平實的價格，緊跟時尚潮流。<br />
            <br />
            這裡的巷弄錯綜複雜，主要商店集中在永吉路、松山路及周邊巷弄內。購物時，建議消費者貨比三家、
            議價談折扣，尤其是批量購買時更能獲得優惠。此外，大多數店家以現金交易為主，部分店家也開始
            提供電子支付，提升購物便利性。<br />
            <br />
            逛完五分埔後，還可以前往附近的饒河街夜市品嚐台灣特色小吃，如胡椒餅、滷肉飯與珍珠奶茶。此外，
            五分埔鄰近松山車站與捷運後山埤站，交通方便，吸引許多來自各地的遊客與批發商前來採購。<br />
            <br />
            五分埔商圈是台北最具代表性的平價時尚購物區，無論是想尋找流行服飾，還是體驗台灣批發市場的獨特
            氛圍，這裡都是值得一訪的時尚採購勝地。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_05.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wufenpu_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wufenpu_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wufenpu_03.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">饒河夜市</p>
        <p class="title1">
          地址：台北市松山區饒河街<br />
          營業時間：17:00–00:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            饒河街夜市位於台北市松山區，全長約600公尺，是台北最具代表性的傳統夜市之一。夜市緊鄰松山慈祐宮，
            擁有悠久的歷史，是台北市最早規劃的觀光夜市之一。因其美食種類多元、價格親民，吸引眾多本地人與觀光
            客，是品嚐台灣小吃的熱門景點。<br />
            <br />
            這裡最著名的美食之一就是福州世祖胡椒餅，這家胡椒餅以香脆外皮、濃郁胡椒與多汁肉餡聞名，每天都大排
            長龍。此外，夜市內還有許多特色小吃，如藥燉排骨、花生捲冰淇淋、烤魷魚、滷味、臭豆腐、珍珠奶茶等，
            每一道都深受饕客喜愛。<br />
            <br />
            除了美食，饒河街夜市也有許多販售衣服、配件、紀念品與日常用品的攤位。此外，夜市內也設有遊戲攤位，
            如射氣球、套圈圈等，適合親子同樂，增添夜市的趣味性。此外，夜市位於松山慈祐宮旁，許多遊客會先到
            廟裡參拜，再來享受美食，是結合傳統文化與夜市風情的最佳旅遊路線。<br />
            <br />
            饒河街夜市融合了道地台灣美食、庶民文化與熱鬧氛圍，是體驗台灣夜市文化的最佳地點之一。無論是當地居
            民還是國際遊客，都能在這裡找到令人驚喜的美味與樂趣，是來台北旅遊不可錯過的經典夜市之一。

          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_03.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/SongshanStation_01.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/SongshanStation_03.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/RaoheStreetNightMarket _02.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運台北小巨蛋站</h2>
      <div class="paragraph-container">
        <p class="title1 name">台北小巨蛋</p>
        <p class="title1">
          地址：北市松山區南京東路四段2號<br />
          營業時間：09:00 - 22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            台北小巨蛋位於台北市松山區，於2005年完工啟用，是台灣最重要的多功能體育與娛樂場館之一。小巨蛋的
            設計靈感來自紐約的麥迪遜廣場花園（Madison Square Garden），可容納約15,000名觀眾，主要用於大型
            演唱會、體育賽事、展覽與各類活動，是台北市的指標性場館之一。<br />
            <br />
            主場館是一座現代化的多功能室內競技場，擁有可伸縮座椅、環場LED螢幕、專業燈光音響設備，能夠依照
            活動需求進行調整。場館內也設有溜冰場（台北市立冰上樂園），是台灣少數提供冰上運動的公共場地。
            此外，小巨蛋周邊的廣場與地下空間也常舉辦市集、展覽與公益活動，使其成為市民休閒與娛樂的重要場所，
            更是演唱會舉辦的熱門場地，許多國內外知名歌手，如周杰倫、五月天、BLACKPINK、Taylor Swift等，
            都曾在此開唱，吸引無數樂迷朝聖。此外，這裡也舉辦過許多國際體育賽事，如亞洲籃球錦標賽、世界花式
            溜冰錦標賽、超級籃球聯賽（SBL）等，為台灣的運動發展提供重要舞台。<br />
            <br />
            這裡交通十分便利，鄰近南京東路商圈與遼寧夜市，觀眾可以在活動前後順道品嚐美食或逛街購物。場館內外
            也設有多個休憩空間，成為市民日常運動與休閒的好去處，不僅是台灣的體育與演藝中心，更是見證無數經典
            時刻的場館。無論是觀看演唱會、參與賽事，還是單純體驗溜冰運動，這裡都是一個充滿活力與魅力的台北地標。
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
            <img src="../assets/images/tour/taipei_arena_07.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/taipei_arena_05.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/taipei_arena_06.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">微風南京</p>
        <p class="title1">
          地址：台北市松山區南京東路三段337號<br />
          營業時間：11:00–22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            微風南京店位於台北市松山區，緊鄰捷運南京復興站，是微風廣場集團旗下的購物中心之一。自2015年開幕
            以來，這裡以時尚精品、美食餐廳與精緻超市為主打，提供高品質的購物與餐飲體驗，吸引許多都會族群與
            上班族前來消費，館內品牌涵蓋精品服飾、運動潮流、彩妝保養與生活用品，如adidas、Under Armour、
            無印良品、誠品生活等，滿足不同客層的需求。<br />
            <br />
            這裡最具特色的就是其多元化的餐飲選擇，館內設有高檔餐廳、甜點名店與美食街。其中，6樓的「WA!
            RAU酒場」提供道地的日式居酒屋料理，是下班聚餐的好去處。此外，還有知名的鼎泰豐、欣葉台菜、
            金葉名氣坊等經典台灣料理，吸引許多饕客前來品嚐。<br />
            <br />
            地下一樓的「Breeze Super」是微風集團經營的高級超市，販售來自世界各地的進口食材、新鮮蔬果與
            高品質熟食，深受講究生活品質的消費者喜愛。此外，館內還有銀行、健身房與書店，提供完善的生活機能，
            使其不僅是一座購物中心，更是一個便利的生活空間。<br />
            <br />
            微風南京店位於捷運南京復興站2號出口旁，交通極為便利，周邊商業大樓林立，是許多上班族與購物愛好者
            的熱門去處。無論是購買時尚單品、享受精緻美食，或是挑選進口食材，這裡都能滿足不同需求，成為台北
            東區不可錯過的購物與美食地標之一。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_07.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/breeze_nanjing_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/breeze_nanjing_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/breeze_nanjing_03.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
