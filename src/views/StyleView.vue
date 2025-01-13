<template>
  <div class="font-guide">
    <p style="margin-bottom: 40px">****** 字體樣式 ******</p>
    
    <!-- H1 -->
    <section class="guide-section bg-primary-400">
      <p class="section-title txt-primary-400">h1</p>
      <h1>H1 標題文字</h1>
    </section>

    <!-- H2 -->
    <section class="guide-section">
      <p class="section-title txt-neutral-0">h2</p>
      <h2>H2 標題文字</h2>
    </section>

    <!-- Title 1 -->
    <section class="guide-section">
      <p class="section-title">class="title1"</p>
      <div class="title1 bold">Title 1 粗體樣式</div>
      <div class="title1">Title 1 標準樣式</div>
    </section>
    

    <!-- Title 2 -->
    <section class="guide-section">
      <p class="section-title">class="title2"</p>
      <div class="title2 bold">Title 2 粗體樣式</div>
      <div class="title2">Title 2 標準樣式</div>
    </section>

    <!-- 內文 p -->
    <section class="guide-section">
      <p class="section-title">p</p>
      <p class="bold">p 粗體樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。</p>
      <p >p 標準樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。</p>
    </section>

    <!-- Caption -->
    <section class="guide-section">
      <p class="section-title">class="caption"</p>
      <p class="caption bold">caption 粗體樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。</p>
      <p class="caption">caption 標準樣式：力母吉一放多爪活像是昔房朵急首公！哭今泉乍田苦裏吉音色冬視怎院打常：朵沒几春記頭天禾牙高石，助詞念布米扒就時飽麼喜安胡二鳥。</p>
    </section>

    <p style="margin-bottom: 40px">****** 按鈕樣式 ******</p>
    <section style="display: flex; flex-direction: column; gap: 20px">
      <!-- size: Regular -->
      <btn class="btn_filled">按鈕</btn>
      <btn class="btn_outline">按鈕</btn>
      <btn class="btn_white">按鈕</btn>
      <!-- size: Small -->
      <btn class="btn_filled small">按鈕</btn>
      <btn class="btn_outline small">按鈕</btn>
      <btn class="btn_white small">按鈕</btn>

      <!-- <v-btn class="btn_filled small">Button</v-btn> -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'FontGuideView'
}
</script>

<style>
.font-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
}

.guide-section {
  margin-bottom: 48px;
  
  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #cacaca;
  }
}
</style>