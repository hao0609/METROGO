<script setup>
import Navbar_V1 from "@/components/Navbar_V1.vue";
import Footer from "@/components/Footer.vue";
import HomeHero from "@/components/Home/HeroBanner.vue";
import HomeFeatures from "@/components/Home/IconFeatures.vue";
import HomeBenefits from "@/components/Home/Benfits.vue";
import HomeProducts from "@/components/Home/Products.vue";
import HomeNews from "@/components/Home/News.vue";
</script>

<template>
  <main class="main-content">
    <div class="home">
      <Navbar_V1 />
      <HomeHero />
      <HomeFeatures />
      <HomeBenefits />
      <HomeProducts />
      <HomeNews />
      <Footer />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-content {
  flex: 1;
  position: relative;
}

.home {
  position: relative;
  min-height: 100vh;
}
</style>