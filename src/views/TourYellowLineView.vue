<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner yellow">
    <h1>中和新蘆線半日遊</h1>
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
              <p class="station-name">三重站</p>
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
              <p class="station-name">台北橋站</p>
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
  <div class="paragraph yellow">
    <div class="station" id="target1">
      <h2>捷運三重站</h2>
      <div class="paragraph-container">
        <p class="title1 name">新北大都會公園</p>
        <p class="title1">
          地址：新北市三重區水漾路一段<br />
          營業時間：24小時
        </p>
        <div class="text">
          <p class="paragraph-content">
            新北大都會公園位於新北市三重區，緊鄰臺北市，佔地約424公頃，是北臺灣最大的都市公園之一。公園坐
            落於淡水河與基隆河交會處，擁有寬廣的綠地與完善的設施，適合親子遊玩、運動休閒及各類戶外活動。<br />
            <br />
            這裡最著名的亮點之一是**「熊猴森樂園」**，這座遊樂區擁有全台最大的特色溜滑梯——「熊猴森樂園滑梯」，
            高達6層樓，吸引許多親子前來體驗。此外，公園內還有多處兒童遊樂設施，如攀爬架、鞦韆及沙坑等，滿足
            不同年齡層的需求。<br />
            <br />
            除了兒童遊樂區，公園內設有多功能運動場地，包括籃球場、足球場、滑板場與極限運動區，並規劃了長達
            15公里的自行車道，可沿著河岸欣賞美麗風景。園區內還設有親水步道與大片草坪，適合散步、野餐與休憩，
            並提供YouBike租借服務，方便遊客騎車環繞園區。<br />
            <br />
            這裡不僅是日常休閒的好去處，每年還會舉辦新北市風箏節、音樂演唱會及大型燈光秀等活動，吸引大量遊客
            前來參與。這裡也是台北跨年煙火的觀賞熱點之一，能遠眺淡水河畔的璀璨夜景。<br />
            <br />
            無論是親子遊玩、運動健身，還是單純欣賞河岸美景，新北大都會公園都是適合各年齡層的絕佳選擇，是北部
            都市生活中難得的一片綠意與悠閒天地。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_01.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/sanchong_station_07.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/sanchong_station_03.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/sanchong_station_05.webp" alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">先嗇宮</p>
        <p class="title1">
          地址：新北市三重區五谷王北街77號<br />
          營業時間：05:00–21:30
        </p>
        <div class="text">
          <p class="paragraph-content">
            位先嗇宮位於新北市三重區，是臺灣歷史悠久的廟宇之一，主祀神農大帝，也稱為「神農宮」。先嗇宮不僅
            是當地信仰中心，更承載著農業文化與傳統民俗，對於地方發展有著深遠影響。<br />
            <br />
            這裡的起源可追溯至清乾隆年間（約1760年左右），當時先民從福建渡海來臺，為感念神農大帝保佑農業豐
            收與人民健康，便興建廟宇供奉。早期，該廟為農業社會的重要信仰中心，象徵五穀豐登與百業興旺。隨著
            時代變遷，三重地區逐漸發展為工商業重鎮，但先嗇宮仍然維持其宗教與文化影響力，成為地方民眾的重要
            精神依靠。<br />
            <br />
            寺廟經歷數次重建，如今廟宇宏偉壯觀，融合傳統閩南建築風格與現代裝飾藝術。正殿供奉神農大帝，並設
            有觀音菩薩、文昌帝君、土地公等配祀神明，滿足不同信眾的需求。廟內雕梁畫棟，石雕、木雕及彩繪皆極
            具藝術價值，展現臺灣傳統廟宇工藝之美。<br />
            <br />
            每年農曆四月二十六日為神農大帝聖誕，廟方會舉辦盛大的祭典，包括祭祀儀式、遶境祈福、平安宴等，吸
            引大量信眾參與。此外，廟方也致力於推廣傳統文化，如農曆春節期間的迎春活動、放天燈、發放平安米等，
            傳承民間信仰與公益精神。<br />
            <br />
            作為三重地區的重要文化地標，先嗇宮承載著歷史、信仰與社會關懷，無論是當地居民或外地遊客，都能在
            此感受到臺灣宗教文化的獨特魅力。
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
            <img src="../assets/images/tour/xianse_temple_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/xianse_temple_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/xianse_temple_03.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運台北橋站</h2>
      <div class="paragraph-container">
        <p class="title1 name">天台廣場</p>
        <p class="title1">
          地址：新北市三重區重新路二段78號<br />
          營業時間：24小時
        </p>
        <div class="text">
          <p class="paragraph-content">
            天台廣場位於新北市三重區，是一座融合購物、娛樂、美食與休閒空間的綜合性商場。其獨特的建築設計與
            多元業態，使其成為當地居民與遊客喜愛的熱門去處。附近還有YouBike租借站，方便民眾騎乘單車前往。
            此外，天台廣場鄰近三重大都會公園，讓遊客能在購物之餘，也能享受都市中的綠意空間。<br />
            <br />
            廣場內部設有各類商店，包括時尚品牌、運動用品、家居用品及3C電子產品等，滿足不同年齡層與消費需求。
            此外，天台廣場內還有電影院與遊樂場，提供親子娛樂與朋友聚會的好選擇。天台廣場的美食區涵蓋各種料理，
            包括台灣小吃、日式料理、韓式燒肉、異國料理與連鎖速食，無論是想要簡單用餐或精緻饗宴，都能找到適合
            的選擇。此外，還有多間知名咖啡廳與甜點店，是下午茶與休憩的好地方。<br />
            <br />
            這裡經常舉辦市集、音樂表演、親子活動與節慶慶典，吸引大量人潮聚集。不僅是一處購物娛樂的場所，也是
            社交與文化活動的重要據點。許多品牌也會在此舉辦新品發表會或期間限定展覽，帶來新鮮有趣的體驗。天台
            廣場融合購物、娛樂與美食，成為三重區的潮流地標，不僅滿足當地居民的日常需求，也吸引外地遊客前來探
            索。不論是家庭出遊、朋友聚會，還是單獨休閒，這裡都能帶來多樣化的體驗，為城市生活增添豐富色彩。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_09.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/rooftop_plaza_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/rooftop_plaza_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/rooftop_plaza_03.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">三和夜市</p>
        <p class="title1">
          地址：新北市三重區中央北路<br />
          營業時間：17:00–00:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            三和夜市位於新北市三重區三和路上，是當地居民日常消費與遊客品嚐美食的熱門地點。雖然規模不如台北
            市的饒河夜市或士林夜市大，但三和夜市以平價美食、道地小吃與親民氛圍聞名，深受在地人與外地遊客喜愛。<br />
            <br />
            這裡擁有許多知名的台灣傳統小吃，其中幾樣必吃美食包括：
            蚵仔煎：酥脆外皮搭配鮮嫩蚵仔與特製醬汁，口感豐富。
            大腸包小腸：外皮香脆，糯米腸與香腸的搭配讓人食指大動。
            鹽酥雞：現炸的鹽酥雞香酥不油膩，搭配九層塔與蒜片，風味十足。
            滷味：各式滷味選擇豐富，可依個人口味挑選豆干、米血、鴨翅等食材。
            地瓜球：口感Q彈有嚼勁，是許多人來夜市必吃的點心。<br />
            <br />
            此外，這裡還有許多異國料理，如泰式炒飯、日式章魚燒、韓式炸雞等，滿足不同食客的需求。除了美食之外，
            夜市內也有許多販售服飾、配件、手機配件、小家電的攤販，價格實惠，適合逛街挖寶。此外，傳統的夜市遊戲
            攤，如射氣球、撈金魚、套圈圈等，也吸引許多親子同樂，增添夜市的趣味性。<br />
            <br />
            雖然不算大型觀光夜市，但擁有濃厚的在地風情與高CP值美食，適合想要體驗道地台灣夜市文化的遊客。無論是
            下班後想來吃宵夜，或是假日來走走逛逛，這裡都是三重區居民心目中的最佳選擇之一。下次來到三重，不妨到
            三和夜市品嚐美食、感受熱鬧氛圍，享受最道地的夜市文化！
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
            <img src="../assets/images/tour/sanhe_night_market_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/sanhe_night_market_03.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/sanhe_night_market_01.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
