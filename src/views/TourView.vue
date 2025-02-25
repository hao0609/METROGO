<template>
  <div class="banner">
    <h1>板南線半日遊</h1>
    <div class="line-container">
      <div class="top">
        <img src="../assets/images/tour/Frame 71.png" alt="" />
      </div>
      <p class="banner-station station1">西門站</p>
      <p class="banner-station station2">龍山寺站</p>
      <div class="bottom">
        <img src="../assets/images/tour/Frame 71.png" alt="" />
      </div>
    </div>
  </div>
  <div class="paragraph">
    <div class="station">
      <div class="text">
        <h2>捷運西門站</h2>
        <p class="title1">
          一甲子餐飲<br />
          地址：台北市萬華區康定路173巷<br />
          營業時間：09:00–18:00，週一休息
        </p>
        <p class="paragraph-content">
          位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
          位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
          位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
        </p>
      </div>
      <div class="img-container">
        <img
          src="../assets/images/tour/1735490750891-removebg-preview.png "
          alt=""
        />
      </div>
    </div>
    <div class="station">
      <h2>捷運龍山寺站</h2>
      <p class="title1">
        一甲子餐飲<br />
        地址：台北市萬華區康定路173巷<br />
        營業時間：09:00–18:00，週一休息
      </p>
      <p class="paragraph-content">
        位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
        位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
        位於艋舺祖師爺廟旁的臺南風味小店，至今已傳承了三代。老闆每天選用肥瘦均勻的五花肉，佐以自製小黃瓜、酸菜、滷豆乾，以及口感出眾的南部米，製作出招牌焢肉飯。此外，滷肉飯、刈包與麻豆碗粿也是店內熱門小吃，後者更限量供應。如果想嚐嚐北部口味，可以來一碗沙茶味道濃厚的豬血湯佐餐。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/base/font";
@import "../assets/sass/base/color";

/* Banner */

.banner {
  display: flex;
  width: 100%;
  height: 572px;
  padding: 0px 96px;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  background-color: $metro-blue;
}

.line-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  border: 5px sandybrown solid;
}

.top {
  display: flex;
  align-self: flex-end;
  flex-direction: column;
}

.bottom {
  display: flex;
  align-self: flex-start;
}

.banner-station {
  writing-mode: vertical-lr;
  font-size: 30px;
  line-height: 36px;
  font-weight: bold;
  color: $neutral-0;
  position: absolute;
  right: 246px;
  top: -26px;
}

// .station-container {
//   display: flex;
//   gap: 111px;
//   border: 5px sandybrown solid;
// }

/* 文章 */

.paragraph {
  display: flex;
  width: 100%;
  padding: 80px 96px 120px 96px;
  flex-direction: column;
  align-items: center;
  gap: 80px;
}

.station {
  display: flex;
  width: 100%;
}

.text {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}

h1 {
  color: $neutral-0;
}

.title1 {
  font-family: $font-dela;
  font-weight: 400;
}

p {
  font-weight: bold;
}

.paragraph-content {
  display: flex;
  width: 60%;
  height: auto;
  flex-direction: column;
  justify-content: center;
}

.img-container {
  width: 400px;
  height: 400px;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

</style>
