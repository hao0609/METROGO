<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner red">
    <h1>淡水信義線半日遊</h1>
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
              <p class="station-name">台北101站</p>
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
              <p class="station-name">東門站</p>
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
  <div class="paragraph red">
    <div class="station" id="target1">
      <h2>捷運 台北101/世貿站</h2>
      <div class="paragraph-container">
        <p class="title1 name">台北101</p>
        <p class="title1">
          地址：台北市信義區信義路5段7號<br />
          營業時間：11:00–22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            台北101位於台灣台北市信義區，是台灣最具代表性的地標建築，也是世界知名的摩天大樓。大樓於1999
            年開始興建，2004年正式完工，高度達508公尺，共101層，因此得名「台北101」。在2004年至2010年
            間，台北101曾是全球最高的建築，直到杜拜哈里發塔（Burj Khalifa）完工才被超越。<br />
            <br />
            建築的設計融合了現代科技與傳統文化，外觀靈感來自竹節，象徵節節高升，並結合了風水與吉祥數字的
            概念，如8層為一個單位，象徵發財與繁榮。此外，這裡還擁有全球最大的阻尼器（風阻尼球），這顆重達
            660公噸的球體位於大樓內部，用來抵抗強風與地震，提升建築的穩定性。<br />
            <br />
            不僅是一座摩天大樓，更是一座結合購物、美食與觀光的綜合商業中心。大樓下層是台北101購物中心，
            匯集全球頂級奢侈品牌、高級餐廳與各式特色店舖，吸引許多國內外遊客。大樓的觀景台位於89樓，提供
            360度的壯觀視野，天氣晴朗時，甚至可以遠眺台灣海峽，是旅客必訪的景點之一。<br />
            <br />
            每年跨年夜，台北101的煙火秀更是全球矚目的盛事，吸引數十萬人聚集於信義區欣賞，成為台灣最具代表
            性的跨年活動之一。無論是白天或夜晚，台北101都是台北城市天際線最具代表性的建築，展現出台灣的繁
            榮與國際化發展，象徵著科技與傳統文化的完美融合。
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
            <img src="../assets/images/tour/taipei101_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/taipei101_04.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/taipei101_11.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">四四南村</p>
        <p class="title1">
          地址：台北市信義區松勤街52號<br />
          營業時間：09:00–17:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            四四南村位於台北市信義區，緊鄰台北101，是台灣第一座眷村，如今則成為融合歷史與文創的特色景點。
            四四南村原為國民政府遷台後，在1948年至1949年間為四四兵工廠員工及家屬所興建的宿舍，當時以簡單
            的磚造與水泥建築為主，是早期眷村建築的代表。<br />
            <br />
            隨著都市發展，台北市內的眷村大多被拆除改建，而四四南村因其歷史價值，經過整修保留下來，成為
            「信義公民會館」的一部分。現今的四四南村保留了部分老房屋，並改建成展覽空間、文創商店與咖啡廳，
            經常舉辦文創市集、藝術展覽與文化活動，使其成為台北市區內難得一見的歷史文化聚落。<br />
            <br />
            這裡的建築風格保留了過去簡樸的眷村特色，如紅磚牆、低矮房舍與窄小的巷弄，讓人能夠感受到早期軍眷
            生活的氛圍。此外，這裡的「好丘 Good Cho’s」餐廳，以台灣特色貝果與手作商品聞名，吸引許多遊客與
            文青前來朝聖。<br />
            <br />
            四四南村不僅是一處懷舊景點，也與現代城市發展相融合，成為台北101周邊最具特色的文化空間。無論是想
            了解台灣的眷村歷史，還是體驗文創與藝術氛圍，這裡都是值得一訪的地方。
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
            <img src="../assets/images/tour/four_four_south_village_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/four_four_south_village_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/four_four_south_village_03.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運東門站</h2>
      <div class="paragraph-container">
        <p class="title1 name">永康街</p>
        <p class="title1">
          地址：台北市大安區永康街<br />
          營業時間：10:30 - 21:30
        </p>
        <div class="text">
          <p class="paragraph-content">
            永康街位於台北市大安區，鄰近捷運東門站，以美食、文青氛圍和獨特的街區文化聞名，是台北最受歡迎的
            旅遊與休閒地點之一。這條街道原本是傳統住宅區，隨著美食餐廳、文創商店與特色咖啡廳的進駐，逐漸發
            展為人氣商圈，吸引許多本地人與觀光客前來探索。<br />
            <br />
            這裡最知名的特色之一就是豐富的美食選擇，其中最具代表性的就是鼎泰豐總店，這間世界知名的小籠包餐
            廳常吸引大批國內外旅客排隊品嚐。此外，這裡還有芒果冰名店「思慕昔」、傳統牛肉麵店、日式料理、異
            國餐廳等，滿足各種口味需求。<br />
            <br />
            除了美食，永康街也充滿濃厚的藝文與文創氛圍。街道兩旁有許多獨立書店、手作設計店、特色咖啡館與茶
            館，讓遊客能夠悠閒地漫步其中，感受台北的慢活風格。這裡的巷弄內還藏有許多獨特的小店，販售工藝品、
            陶藝、文具與古董，深受喜愛手作與設計的旅人青睞。<br />
            <br />
            此外，這裡鄰近永康公園，是許多居民與遊客放鬆休憩的好地方。無論是白天享受悠閒的散步，或是晚上品味
            各式特色美食，永康街都是一個融合傳統與現代、文化與美食的絕佳景點。這裡不僅展現出台北的城市魅力，
            也讓人感受到獨特的台灣生活風情。
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
            <img src="../assets/images/tour/yongkang_street_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/yongkang_street_02.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/yongkang_street_03.webp " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1 name">榕錦時光生活園區</p>
        <p class="title1">
          地址：台北市大安區金華街167號<br />
          營業時間：11:00–20:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            榕錦時光生活園區位於台北市大安區金華街，鄰近永康商圈，前身為台北市警察局宿舍群，經整修後於2022年
            正式開放，成為結合歷史、人文與文創的特色園區。園區名稱中的「榕」象徵園區內的大榕樹，而「錦」則代
            表過去街區的繁華，展現老建築與現代生活的融合。<br />
            <br />
            園區內的建築最早可追溯至日治時期，原為日軍憲兵隊宿舍，戰後則改為警察宿舍。這些日式建築經過修復後，
            保留了木造結構、斜屋頂、榻榻米地板等傳統風格，讓人彷彿走進過去的時光之中。同時，園區內也設置了許多
            綠地與開放空間，營造出寧靜悠閒的都市綠洲氛圍。<br />
            <br />
            園區集結了文創品牌、職人店鋪與特色餐飲，如知名的「蜷尾家霜淇淋」、結合東方茶文化的「春芳號」、販售
            手工生活用品的「小器生活」等，讓遊客能夠在園區內享受獨特的購物與飲食體驗。此外，園區內也不定期舉辦
            手作課程、藝文展覽與市集，讓這裡成為一處充滿創意與文化的生活空間。<br />
            <br />
            榕錦時光生活園區不僅是一個充滿文藝氣息的休閒場所，更是台北市區內少見的歷史建築保存空間，適合喜愛懷
            舊氛圍、手作藝術與特色美食的旅人前來探索。無論是漫步其中、品味美食，或是參加文化活動，這裡都能帶來
            獨特的時光體驗。
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
            <img src="../assets/images/tour/rongjin_gorgeous_time_01.webp " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/rongjin_gorgeous_time_02.webp" alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/rongjin_gorgeous_time_03.webp " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
