import {  computed , ref , onMounted } from 'vue';

const baseW = 1440;                // 基準寬度 (來自每個 SVG 檔的寬高)
const baseH = 1024;                // 基準高度

export function pinjs() {
    // console.log(moverW.value,moverH.value);
    
    
    const pinStyle = computed(() => {
  
        // 淡水站畫面地位
        // let leftRatio = 690 / baseW;
        // let topRatio = 174 / baseH;

        // 紅樹林畫面地位
        // let leftRatio = 609 / baseW;
        // let topRatio = 131 / baseH;

        // 竹圍畫面地位
        // let leftRatio = 515 / baseW;
        // let topRatio = 196 / baseH;

        // 關渡畫面地位
        // let leftRatio = 429 / baseW;
        // let topRatio = 255 / baseH;

        // 關渡畫面地位
        // let leftRatio = 429 / baseW;
        // let topRatio = 255 / baseH;

        // 復興崗畫面地位
        // let leftRatio = 337 / baseW;
        // let topRatio = 317 / baseH;

        // 北投崗畫面地位
        // let leftRatio = 333 / baseW;
        // let topRatio = 431 / baseH;

        // 新北投崗畫面地位
        // let leftRatio = 236 / baseW;
        // let topRatio = 497 / baseH;

        // 奇岩崗畫面地位
        // let leftRatio = 429 / baseW;
        // let topRatio = 488 / baseH;

        // 唭哩岸畫面地位
        // let leftRatio = 335 / baseW;
        // let topRatio = 550 / baseH;

        // 石牌畫面地位
        // let leftRatio = 225 / baseW;
        // let topRatio = 619 / baseH;

        // 明德畫面地位
        // let leftRatio = 325 / baseW;
        // let topRatio = 671 / baseH;

        // 芝山畫面地位
        // let leftRatio = 429 / baseW;
        // let topRatio = 720 / baseH;

        // 士林畫面地位
        // let leftRatio = 519 / baseW;
        // let topRatio = 655 / baseH;

        // 劍潭畫面地位
        // let leftRatio = 604 / baseW;
        // let topRatio = 588 / baseH;

        // 圓山畫面地位
        // let leftRatio = 700 / baseW;
        // let topRatio = 636 / baseH;

        // 民權西路畫面地位
        // let leftRatio = 799 / baseW;
        // let topRatio = 693 / baseH;

        // 雙連畫面地位
        // let leftRatio = 885 / baseW;
        // let topRatio = 626 / baseH;

        // 中山畫面地位
        // let leftRatio = 977 / baseW;
        // let topRatio = 561 / baseH;

        // 台北車站畫面地位
        // let leftRatio = 1065 / baseW;
        // let topRatio = 491 / baseH;

        // 台大醫院畫面地位
        // let leftRatio = 1154 / baseW;
        // let topRatio = 424 / baseH;

        // 中正紀念堂畫面地位
        // let leftRatio = 1248 / baseW;
        // let topRatio = 368 / baseH;

        // 東門畫面地位
        // let leftRatio = 1151 / baseW;
        // let topRatio = 302 / baseH;

        // 大安森林公園畫面地位
        // let leftRatio = 1254 / baseW;
        // let topRatio = 248 / baseH;

        // 大安畫面地位
        // let leftRatio = 1165 / baseW;
        // let topRatio = 184 / baseH;

        // 信義安和畫面地位
        // let leftRatio = 1065 / baseW;
        // let topRatio = 146 / baseH;

        // 台北101畫面地位
        // let leftRatio = 968 / baseW;
        // let topRatio = 96 / baseH;

        // 象山畫面地位
        let leftRatio = 819 / baseW;
        let topRatio = 170 / baseH;



        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;


        

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`
        };
    });


  return { pinStyle  };

  

}
