<script setup>
import Navbar_V1 from "../components/Navbar_V1.vue";
</script>

<template>
  <Navbar_V1 />
  <!-- banner -->
  <div class="banner">
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
  <div class="paragraph">
    <div class="station" id="target1">
      <h2>捷運西門站</h2>
      <div class="paragraph-container">
        <p class="title1">
          萬年商業大樓<br />
          地址：台北市萬華區西寧南路70號<br />
          營業時間：11:30–22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            萬年大樓商場位於台北市萬華區西門町，是台北市最具代表性的購物與娛樂中心之一。大樓於1973年落成，至今已有數十年歷史，見證了西門町商圈的興盛與變遷。萬年大樓主要吸引年輕族群與次文化愛好者，尤其是動漫迷、模型收藏家、街頭潮流愛好者和遊戲玩家。
            
            商場內部擁有眾多商店，販售各類特色商品，包括動漫周邊、模型公仔、手辦、電玩遊戲、二手漫畫、潮流服飾、運動鞋、精品配件與各種創意商品。這裡可以找到許多日韓動漫相關商品，許多收藏級的限量模型、公仔也常在這裡出現，因此成為動漫迷朝聖的熱點。
            此外，大樓內還有電玩遊戲區，提供各類大型機台與復古遊戲機，吸引許多遊戲愛好者前來挑戰。

            除了動漫與潮流商品，萬年大樓還有美食區，販售各類小吃與特色餐點，讓逛街的顧客能夠休息補充體力。地下一樓則有電影院，過去曾是熱門的電影院據點，如今仍是不少電影愛好者的選擇。

            萬年大樓雖然歷史悠久，但仍保持著獨特的魅力，融合了復古與現代的購物氛圍。這裡不僅是一個購物中心，更是西門町次文化的象徵，吸引著來自全台與國外的觀光客，成為台北不可錯過的潮流地標之一。
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
            <img src="../assets/images/tour/wan_nian_building_01.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wan_nian_building_04.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/wan_nian_building_02.jpg " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1">
          美國街<br />
          地址：台北市萬華區昆明街96巷<br />
          營業時間：11:30–22:00
        </p>
        <div class="text">
          <p class="paragraph-content">
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/1735490750891-removebg-preview.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="station" id="target2">
      <h2>捷運龍山寺站</h2>
      <div class="paragraph-container">
        <p class="title1">
          一甲子餐飲<br />
          地址：台北市萬華區康定路173巷<br />
          營業時間：09:00–18:00，週一休息
        </p>
        <div class="text">
          <p class="paragraph-content">
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/1735490750891-removebg-preview.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
        </div>
      </div>
      <div class="paragraph-container">
        <p class="title1">
          一甲子餐飲<br />
          地址：台北市萬華區康定路173巷<br />
          營業時間：09:00–18:00，週一休息
        </p>
        <div class="text">
          <p class="paragraph-content">
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
            位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
          </p>
          <div class="img-container hidden">
            <img
              src="../assets/images/tour/1735490750891-removebg-preview.png "
              alt=""
            />
          </div>
        </div>

        <div class="img-container-rows">
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
          <div class="img-container-bottom">
            <img src="../assets/images/tour/1735490720074.jpg " alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/page/tour";
</style>
