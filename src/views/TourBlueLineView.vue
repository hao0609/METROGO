<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner blue">
    <h1>板南線半日遊</h1>
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
              <p class="station-name">西門站</p>
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
              <p class="station-name">龍山寺站</p>
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
  <div class="paragraph blue">
    <div class="station" id="target1">
      <h2>捷運西門站</h2>
      <div class="paragraph-container">
        <p class="title1 name">萬年商業大樓</p>
        <p class="title1">
          地址：台北市萬華區西寧南路70號<br />
          營業時間：11:00-22:00
        </p>
        <div class="text">
          <p class="paragraph-content">

            萬年大樓商場位於台北市萬華區西門町，是台北市最具代表性的購物與娛樂中心之一。大樓於1973年落成，
            至今已有數十年歷史，見證了西門町商圈的興盛與變遷。主要吸引年輕族群與次文化愛好者，尤其是動漫迷、
            模型收藏家、街頭潮流愛好者和遊戲玩家。<br />
            <br />
            商場內部擁有眾多商店，販售各類特色商品，包括動漫周邊、模型公仔、手辦、電玩遊戲、二手漫畫、
            潮流服飾、運動鞋、精品配件與各種創意商品。這裡可以找到許多日韓動漫相關商品，許多收藏級的
            限量模型、公仔也常在這裡出現，因此成為動漫迷朝聖的熱點。此外，大樓內還有電玩遊戲區，提供
            各類大型機台與復古遊戲機，吸引許多遊戲愛好者前來挑戰。<br />
            <br />
            除了動漫與潮流商品，萬年大樓還有美食區，販售各類小吃與特色餐點，讓逛街的顧客能夠休息補充體力。
            地下一樓則有電影院，過去曾是熱門的電影院據點，如今仍是不少電影愛好者的選擇。<br />
            <br />
            大樓雖然歷史悠久，但仍保持著獨特的魅力，融合了復古與現代的購物氛圍。這裡不僅是一個購物中心，
            更是西門町次文化的象徵，吸引著來自全台與國外的觀光客，成為台北不可錯過的潮流地標之一。

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
            <img src="../assets/images/tour/wan_nian_building_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wan_nian_building_04.webp  " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wan_nian_building_02.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">美國街</p>
        <p class="title1">
          地址：台北市萬華區昆明街96巷<br />
          營業時間：11:00–22:00，
        </p>
        <div class="text">
          <p class="paragraph-content">
            美國街位於台北市西門町商圈，因販售大量美式潮流服飾與街頭文化商品而得名。這條街道緊鄰電影街與
            峨眉街，全長不長，卻是西門町潮流文化的核心地帶，吸引了眾多熱愛街頭風格的年輕人與潮流愛好者。<br />
            <br />
            這裡的特色在於其獨特的街頭氛圍，店舖裝潢多帶有美式風格，販售商品涵蓋運動品牌服飾、滑板用品、
            潮流球鞋、復古牛仔服、嘻哈配件與二手古著等。這裡匯聚了眾多國內外潮流品牌，像是Nike、Adidas、
            Vans、Converse等經典品牌外，也能找到較小眾的美式街頭品牌，深受滑板族、嘻哈文化愛好者與時尚潮
            人喜愛。<br />
            <br />
            除了服飾，這裡也是滑板文化的重要據點，不少店家販售專業滑板裝備，並提供維修與客製化服務。此外，
            美國街經常舉辦街頭活動，如滑板比賽、塗鴉藝術展、潮流品牌快閃店等，使這條街充滿活力與創意氛圍。<br />
            <br />
            街頭藝術與塗鴉牆也是一大亮點，牆面經常出現各種潮流風格的藝術創作，成為網美與潮人們的熱門拍照
            景點。這裡不僅是購物天堂，更是一個代表次文化的潮流據點，讓西門町成為台北最具年輕活力的街區之
            一。無論是想尋找最新潮流單品，還是感受街頭文化的魅力，美國街都是不容錯過的地方。
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
            <img src="../assets/images/tour/american_street_03.webp  " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/american_street_01.webp  " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/american_street_02.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運龍山寺站</h2>
      <div class="paragraph-container">
        <p class="title1 name">龍山寺</p>
        <p class="title1">
          地址：台北市萬華區廣州街211號<br />
          營業時間：06:00 - 22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            萬華龍山寺位於台北市萬華區，是台灣最具代表性的傳統廟宇之一，擁有超過280年的歷史。龍山寺建於清
            朝乾隆三年(1738年)，由來自泉州的移民所興建，主要供奉觀世音菩薩，同時也奉祀多位佛道儒三教神祇，
            如關聖帝君、文昌帝君、媽祖等，展現出台灣傳統信仰的融合與多元性。<br />
            <br />
            寺廟歷經多次重建與修復，特別是在二戰期間，曾遭受美軍轟炸嚴重毀損，但信徒們齊心協力修復，使廟宇
            恢復昔日風采。如今，龍山寺不僅是宗教信仰中心，更是國定古蹟，吸引來自世界各地的遊客與信徒參拜。<br />
            <br />
            寺廟的建築極具傳統工藝價值，廟宇採用中國南方宮殿式風格，擁有華麗的雕刻與彩繪。屋頂的「龍柱」、
            「燕尾脊」及「交趾陶」裝飾極為精緻，展現台灣傳統工藝之美。廟內香火鼎盛，特別是在農曆初一、十五
            與重要節日時，更是人潮洶湧，許多信徒前來祈求平安、事業順利或學業進步。<br />
            <br />
            周邊也發展出獨特的文化與商業氛圍，像是著名的艋舺夜市、剝皮寮歷史街區及華西街夜市等，讓這裡成為
            結合宗教、歷史與美食的旅遊勝地。無論是本地居民或國際觀光客，來到龍山寺都能感受到台灣傳統信仰與
            文化的深厚底蘊，是探索台北歷史與民俗文化的重要地點之一。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/illustration_02.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/long_shan_temple_02.webp  " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/long_shan_temple_05.webp  " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/long_shan_temple_01.webp  " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">剝皮寮歷史街區</p>
        <p class="title1">
          地址：台北市萬華區康定路173巷<br />
          營業時間：09:00–18:00，週一休息
        </p>
        <div class="text">
          <p class="paragraph-content">
            剝皮寮歷史街區位於台北市萬華區，緊鄰龍山寺，是台北少數保存完整的清代街道之一。這條街道擁有超
            過200年的歷史，可追溯至清朝嘉慶年間（19世紀初），當時艋舺（今萬華）是台北的商業與貿易中心，
            剝皮寮曾是貨物集散地，後來發展為繁華的商業街區。<br />
            <br />
            關於「剝皮寮」名稱的由來，有多種說法，其中較為流傳的說法是這裡曾是木材加工場，木材去皮後才會
            送往市場，因此得名。此外，也有人認為此地曾有官方機構徵收稅款，被稱為「剝皮」，因此街名由此而來。<br />
            <br />
            街區的建築特色融合了清朝、日治時期與民國初期的風格，包含紅磚拱廊、木窗、洗石子牆面與傳統店屋設計，
            完整呈現早期台北的都市風貌。經過市政府修復後，這裡被規劃為歷史文化保存區，成為展覽、藝術活動與
            電影拍攝的熱門場地。知名電影《艋舺》即曾在此取景，讓剝皮寮更廣為人知。<br />
            <br />
            如今，這裡經常舉辦各種文化展覽、教育活動與藝術創作，成為民眾與遊客了解台北歷史的重要據點。漫步其中，
            不僅能感受昔日繁華的街景，還能體驗台灣百年來的城市變遷。這裡不只是歷史遺跡，更是一座活生生的文化
            展示空間，讓人們能夠深入了解台北的過去與發展。
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
            <img src="../assets/images/tour/BopiliaoHistoricBlock_07.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/BopiliaoHistoricBlock_04.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/BopiliaoHistoricBlock_02.webp  " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
