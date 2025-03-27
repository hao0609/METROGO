<script setup>
import { ref } from "vue";

// 各種組件
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import FeaturedMain from "@/components/FeaturedMain.vue";
import FeaturedSidebar from "@/components/FeaturedSidebar.vue";
import FeaturedInfo from "@/components/FeaturedInfo.vue";
import FeaturedContent from "@/components/FeaturedContent.vue";

// 匯入 JSON 資料
import featuredDataJson from "@/json/featured.json";

// 取得板南線 id=2 的資料 (大巨蛋)
const featuredData = ref(featuredDataJson["板南線"].find((item) => item.id === 2));
</script>

<template>
  <Navbar_V1 />
  <div class="div-all lightblue">
    <FeaturedMain :FeaturedMain="featuredData" />
    <!-- <div class="featured-main">
      <div class="journey_featured_title1">
        <h1>{{ featuredData.journey_featured_name }}</h1>
      </div>
      <div class="features-container flex">
        <div class="features-img-container flex">
          <div class="top-images flex">
            <div class="top-img-top">
              <img
                :src="featuredData.featured_main_photo"
                alt=""
                class="journey_featured_main_photo"
              />
            </div>
            <div class="side-images flex">
              <div class="side-img-top">
                <img
                  v-if="featuredData.featured_photos[0]"
                  :src="featuredData.featured_photos[0]"
                  alt=""
                  class="journey_featured_photo1"
                />
              </div>
              <div class="side-img-top">
                <img
                  v-if="featuredData.featured_photos[1]"
                  :src="featuredData.featured_photos[1]"
                  alt=""
                  class="journey_featured_photo2"
                />
              </div>
            </div>
          </div>
          <div class="bottom-images flex">
            <div class="bottom-img">
              <img
                v-if="featuredData.featured_photos[2]"
                :src="featuredData.featured_photos[2]"
                alt=""
                class="journey_featured_photo3"
              />
            </div>
            <div class="bottom-img">
              <img
                v-if="featuredData.featured_photos[3]"
                :src="featuredData.featured_photos[3]"
                alt=""
                class="journey_featured_photo4"
              />
            </div>
            <div class="bottom-img">
              <img
                v-if="featuredData.featured_photos[4]"
                :src="featuredData.featured_photos[4]"
                alt=""
                class="journey_featured_photo5"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 店家資訊 -->
    <div class="journey-featured-info blue">
      <FeaturedInfo :FeaturedInfo="featuredData.store_info" />
      <!-- <div class="featured-main">
        <h2 class="featured-info-title">{{ featuredData.store_info.name }}</h2>
        <div class="info-card">
          <p>
            地址：{{ featuredData.store_info.address }}<br />營業時間：{{
              featuredData.store_info.hours
            }}<br />聯絡電話：{{ featuredData.store_info.phone }}
          </p>
        </div>
      </div>
      <div class="featured-content-pic">
        <img
          :src="featuredData.store_info.info_photo"
          alt=""
          class="journey_featured_photo6"
        />
      </div> -->
    </div>

    <div class="featured-paragraph-main">
      <div class="featured-paragraph">
        <FeaturedContent :FeaturedContent="featuredData" />
        <!-- <div class="featured-paragraph-content">
          <p v-if="featuredData.featured_paragraphs[0]" :key="index">
            {{ featuredData.featured_paragraphs[0] }}
          </p>
          <h3 v-if="featuredData.featured_paragraphs[1]" :key="index">
            {{ featuredData.featured_paragraphs[1] }}
          </h3>
          <p v-if="featuredData.featured_paragraphs[2]" :key="index">
            {{ featuredData.featured_paragraphs[2] }}
          </p>
          <h3 v-if="featuredData.featured_paragraphs[3]" :key="index">
            {{ featuredData.featured_paragraphs[3] }}
          </h3>
          <p v-if="featuredData.featured_paragraphs[4]" :key="index">
            {{ featuredData.featured_paragraphs[4] }}
          </p>
          <h3 v-if="featuredData.featured_paragraphs[5]" :key="index">
            {{ featuredData.featured_paragraphs[5] }}
          </h3>
          <p v-if="featuredData.featured_paragraphs[6]" :key="index">
            {{ featuredData.featured_paragraphs[6] }}
          </p>
          <p v-if="featuredData.featured_paragraphs[7]" :key="index">
            {{ featuredData.featured_paragraphs[7] }}
          </p>
        </div> -->

        <!-- 小編精選熱門推薦 -->
        <FeaturedSidebar />

        <!-- <div class="featured-sidebar">
          <div class="sidebar-title">
            <hr />
            <h2>小編精選熱門推薦</h2>
            <hr />
          </div>
          <div class="featured-articles">
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
            <a href="#">
              <div class="article">
                <div class="article-pic">
                  <img
                    src="../../assets/images/featured/pic-featured_blue_hotpot_3.svg"
                    alt="文章1"
                  />
                </div>
                <p class="article-title">
                  拉麵控必訪！號稱新北最強拉麵店，濃郁湯頭重現日本道地口味
                </p>
              </div>
            </a>
            <hr />
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" scoped>
@import "@/assets/sass/page/journey-featured.scss";
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
</style>
