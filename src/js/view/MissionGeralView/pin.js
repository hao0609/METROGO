import {  computed , watch ,ref} from 'vue';
import { gelocation } from './geolocation';

const {nearby_station} = gelocation();

const baseW = 1440;                // 基準寬度 (來自每個 SVG 檔的寬高)
const baseH = 1024;                // 基準高度

const stationName = ref('');
export function pinjs() {
    // console.log(moverW.value,moverH.value);
        watch(nearby_station, (newStation) => {            // 監聽 nearby_station 的變化
            console.log("目前用戶靠近的捷運站:", newStation);
            stationName.value = newStation
        });

    // 紅線路線定位    
    const pinStyle_red = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';

        switch (stationName.value) {

            case "淡水":
                leftRatio = 690 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "紅樹林":
                leftRatio = 611 / baseW;
                topRatio = 235 / baseH;
                display = 'block';
                break;
            case "竹圍":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "關渡":
                leftRatio = 457 / baseW;
                topRatio = 339 / baseH;
                display = 'block';
                break;    
            case "忠義":
                leftRatio = 378 / baseW;
                topRatio = 391 / baseH;
                display = 'block';
                break;    
            case "復興崗":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "北投":
                leftRatio = 375 / baseW;
                topRatio = 491 / baseH;
                display = 'block';
                break;  
            case "新北投":
                leftRatio = 293 / baseW;
                topRatio = 546 / baseH;
                display = 'block';
                break;  
            case "奇岩":
                leftRatio = 458 / baseW;
                topRatio = 538 / baseH;
                display = 'block';
                break;
            case "唭哩岸":
                leftRatio = 378 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "石牌":
                leftRatio = 292 / baseW;
                topRatio = 646 / baseH;
                display = 'block';
                break;
            case "明德":
                leftRatio = 370 / baseW;
                topRatio = 693 / baseH;
                display = 'block';
                break;    
            case "芝山":
                leftRatio = 457 / baseW;
                topRatio = 733 / baseH;
                display = 'block';
                break;    
            case "士林":
                leftRatio = 533 / baseW;
                topRatio = 679 / baseH;
                display = 'block';
                break;  
            case "劍潭":
                leftRatio = 607 / baseW;
                topRatio = 622 / baseH;
                display = 'block';
                break;  
            case "圓山":
                leftRatio = 688 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;  
            case "民權西路":
                leftRatio = 773 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "雙連":
                leftRatio = 848 / baseW;
                topRatio = 656 / baseH;
                display = 'block';
                break;  
            case "中山":
                leftRatio = 927 / baseW;
                topRatio = 601 / baseH;
                display = 'block';
                break;  
            case "台北車站":
                leftRatio = 1000 / baseW;
                topRatio = 542 / baseH;
                display = 'block';
                break;  
            case "台大醫院":
                leftRatio = 1076 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "中正紀念堂":
                leftRatio = 1155 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "東門":
                leftRatio = 1070 / baseW;
                topRatio = 395 / baseH;
                display = 'block';
                break;  
            case "大安森林公園":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 1073 / baseW;
                topRatio = 301 / baseH;
                display = 'block';
                break;  
            case "信義安和":
                leftRatio = 989 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "台北101":
                leftRatio = 904 / baseW;
                topRatio = 220 / baseH;
                display = 'block';
                break;  
            case "象山":
                leftRatio = 819 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;  
            
            default:
                display = 'none';
                break;
        }

        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`,
            display: `${display}`,
        };
    });
    const pinStyle_green = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';

        switch (stationName.value) {

            case "淡水":
                leftRatio = 690 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "紅樹林":
                leftRatio = 611 / baseW;
                topRatio = 235 / baseH;
                display = 'block';
                break;
            case "竹圍":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "關渡":
                leftRatio = 457 / baseW;
                topRatio = 339 / baseH;
                display = 'block';
                break;    
            case "忠義":
                leftRatio = 378 / baseW;
                topRatio = 391 / baseH;
                display = 'block';
                break;    
            case "復興崗":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "北投":
                leftRatio = 375 / baseW;
                topRatio = 491 / baseH;
                display = 'block';
                break;  
            case "新北投":
                leftRatio = 293 / baseW;
                topRatio = 546 / baseH;
                display = 'block';
                break;  
            case "奇岩":
                leftRatio = 458 / baseW;
                topRatio = 538 / baseH;
                display = 'block';
                break;
            case "唭哩岸":
                leftRatio = 378 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "石牌":
                leftRatio = 292 / baseW;
                topRatio = 646 / baseH;
                display = 'block';
                break;
            case "明德":
                leftRatio = 370 / baseW;
                topRatio = 693 / baseH;
                display = 'block';
                break;    
            case "芝山":
                leftRatio = 457 / baseW;
                topRatio = 733 / baseH;
                display = 'block';
                break;    
            case "士林":
                leftRatio = 533 / baseW;
                topRatio = 679 / baseH;
                display = 'block';
                break;  
            case "劍潭":
                leftRatio = 607 / baseW;
                topRatio = 622 / baseH;
                display = 'block';
                break;  
            case "圓山":
                leftRatio = 688 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;  
            case "民權西路":
                leftRatio = 773 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "雙連":
                leftRatio = 848 / baseW;
                topRatio = 656 / baseH;
                display = 'block';
                break;  
            case "中山":
                leftRatio = 927 / baseW;
                topRatio = 601 / baseH;
                display = 'block';
                break;  
            case "台北車站":
                leftRatio = 1000 / baseW;
                topRatio = 542 / baseH;
                display = 'block';
                break;  
            case "台大醫院":
                leftRatio = 1076 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "中正紀念堂":
                leftRatio = 1155 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "東門":
                leftRatio = 1070 / baseW;
                topRatio = 395 / baseH;
                display = 'block';
                break;  
            case "大安森林公園":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 1073 / baseW;
                topRatio = 301 / baseH;
                display = 'block';
                break;  
            case "信義安和":
                leftRatio = 989 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "台北101":
                leftRatio = 904 / baseW;
                topRatio = 220 / baseH;
                display = 'block';
                break;  
            case "象山":
                leftRatio = 819 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;  
            
            default:
                display = 'none';
                break;
        }
        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`,
            display: `${display}`,
        };
    });
    const pinStyle_blue = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';

        switch (stationName.value) {

            case "淡水":
                leftRatio = 690 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "紅樹林":
                leftRatio = 611 / baseW;
                topRatio = 235 / baseH;
                display = 'block';
                break;
            case "竹圍":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "關渡":
                leftRatio = 457 / baseW;
                topRatio = 339 / baseH;
                display = 'block';
                break;    
            case "忠義":
                leftRatio = 378 / baseW;
                topRatio = 391 / baseH;
                display = 'block';
                break;    
            case "復興崗":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "北投":
                leftRatio = 375 / baseW;
                topRatio = 491 / baseH;
                display = 'block';
                break;  
            case "新北投":
                leftRatio = 293 / baseW;
                topRatio = 546 / baseH;
                display = 'block';
                break;  
            case "奇岩":
                leftRatio = 458 / baseW;
                topRatio = 538 / baseH;
                display = 'block';
                break;
            case "唭哩岸":
                leftRatio = 378 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "石牌":
                leftRatio = 292 / baseW;
                topRatio = 646 / baseH;
                display = 'block';
                break;
            case "明德":
                leftRatio = 370 / baseW;
                topRatio = 693 / baseH;
                display = 'block';
                break;    
            case "芝山":
                leftRatio = 457 / baseW;
                topRatio = 733 / baseH;
                display = 'block';
                break;    
            case "士林":
                leftRatio = 533 / baseW;
                topRatio = 679 / baseH;
                display = 'block';
                break;  
            case "劍潭":
                leftRatio = 607 / baseW;
                topRatio = 622 / baseH;
                display = 'block';
                break;  
            case "圓山":
                leftRatio = 688 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;  
            case "民權西路":
                leftRatio = 773 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "雙連":
                leftRatio = 848 / baseW;
                topRatio = 656 / baseH;
                display = 'block';
                break;  
            case "中山":
                leftRatio = 927 / baseW;
                topRatio = 601 / baseH;
                display = 'block';
                break;  
            case "台北車站":
                leftRatio = 1000 / baseW;
                topRatio = 542 / baseH;
                display = 'block';
                break;  
            case "台大醫院":
                leftRatio = 1076 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "中正紀念堂":
                leftRatio = 1155 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "東門":
                leftRatio = 1070 / baseW;
                topRatio = 395 / baseH;
                display = 'block';
                break;  
            case "大安森林公園":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 1073 / baseW;
                topRatio = 301 / baseH;
                display = 'block';
                break;  
            case "信義安和":
                leftRatio = 989 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "台北101":
                leftRatio = 904 / baseW;
                topRatio = 220 / baseH;
                display = 'block';
                break;  
            case "象山":
                leftRatio = 819 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;  
            
            default:
                display = 'none';
                break;
        }

        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`,
            display: `${display}`,
        };
    });    
    const pinStyle_yellow = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';

        switch (stationName.value) {

            case "淡水":
                leftRatio = 690 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "紅樹林":
                leftRatio = 611 / baseW;
                topRatio = 235 / baseH;
                display = 'block';
                break;
            case "竹圍":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "關渡":
                leftRatio = 457 / baseW;
                topRatio = 339 / baseH;
                display = 'block';
                break;    
            case "忠義":
                leftRatio = 378 / baseW;
                topRatio = 391 / baseH;
                display = 'block';
                break;    
            case "復興崗":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "北投":
                leftRatio = 375 / baseW;
                topRatio = 491 / baseH;
                display = 'block';
                break;  
            case "新北投":
                leftRatio = 293 / baseW;
                topRatio = 546 / baseH;
                display = 'block';
                break;  
            case "奇岩":
                leftRatio = 458 / baseW;
                topRatio = 538 / baseH;
                display = 'block';
                break;
            case "唭哩岸":
                leftRatio = 378 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "石牌":
                leftRatio = 292 / baseW;
                topRatio = 646 / baseH;
                display = 'block';
                break;
            case "明德":
                leftRatio = 370 / baseW;
                topRatio = 693 / baseH;
                display = 'block';
                break;    
            case "芝山":
                leftRatio = 457 / baseW;
                topRatio = 733 / baseH;
                display = 'block';
                break;    
            case "士林":
                leftRatio = 533 / baseW;
                topRatio = 679 / baseH;
                display = 'block';
                break;  
            case "劍潭":
                leftRatio = 607 / baseW;
                topRatio = 622 / baseH;
                display = 'block';
                break;  
            case "圓山":
                leftRatio = 688 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;  
            case "民權西路":
                leftRatio = 773 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "雙連":
                leftRatio = 848 / baseW;
                topRatio = 656 / baseH;
                display = 'block';
                break;  
            case "中山":
                leftRatio = 927 / baseW;
                topRatio = 601 / baseH;
                display = 'block';
                break;  
            case "台北車站":
                leftRatio = 1000 / baseW;
                topRatio = 542 / baseH;
                display = 'block';
                break;  
            case "台大醫院":
                leftRatio = 1076 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "中正紀念堂":
                leftRatio = 1155 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "東門":
                leftRatio = 1070 / baseW;
                topRatio = 395 / baseH;
                display = 'block';
                break;  
            case "大安森林公園":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 1073 / baseW;
                topRatio = 301 / baseH;
                display = 'block';
                break;  
            case "信義安和":
                leftRatio = 989 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "台北101":
                leftRatio = 904 / baseW;
                topRatio = 220 / baseH;
                display = 'block';
                break;  
            case "象山":
                leftRatio = 819 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;  
            
            default:
                display = 'none';
                break;
        }

        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`,
            display: `${display}`,
        };
    }); 
    const pinStyle_brown = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';

        switch (stationName.value) {

            case "淡水":
                leftRatio = 690 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "紅樹林":
                leftRatio = 611 / baseW;
                topRatio = 235 / baseH;
                display = 'block';
                break;
            case "竹圍":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "關渡":
                leftRatio = 457 / baseW;
                topRatio = 339 / baseH;
                display = 'block';
                break;    
            case "忠義":
                leftRatio = 378 / baseW;
                topRatio = 391 / baseH;
                display = 'block';
                break;    
            case "復興崗":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "北投":
                leftRatio = 375 / baseW;
                topRatio = 491 / baseH;
                display = 'block';
                break;  
            case "新北投":
                leftRatio = 293 / baseW;
                topRatio = 546 / baseH;
                display = 'block';
                break;  
            case "奇岩":
                leftRatio = 458 / baseW;
                topRatio = 538 / baseH;
                display = 'block';
                break;
            case "唭哩岸":
                leftRatio = 378 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "石牌":
                leftRatio = 292 / baseW;
                topRatio = 646 / baseH;
                display = 'block';
                break;
            case "明德":
                leftRatio = 370 / baseW;
                topRatio = 693 / baseH;
                display = 'block';
                break;    
            case "芝山":
                leftRatio = 457 / baseW;
                topRatio = 733 / baseH;
                display = 'block';
                break;    
            case "士林":
                leftRatio = 533 / baseW;
                topRatio = 679 / baseH;
                display = 'block';
                break;  
            case "劍潭":
                leftRatio = 607 / baseW;
                topRatio = 622 / baseH;
                display = 'block';
                break;  
            case "圓山":
                leftRatio = 688 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;  
            case "民權西路":
                leftRatio = 773 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "雙連":
                leftRatio = 848 / baseW;
                topRatio = 656 / baseH;
                display = 'block';
                break;  
            case "中山":
                leftRatio = 927 / baseW;
                topRatio = 601 / baseH;
                display = 'block';
                break;  
            case "台北車站":
                leftRatio = 1000 / baseW;
                topRatio = 542 / baseH;
                display = 'block';
                break;  
            case "台大醫院":
                leftRatio = 1076 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "中正紀念堂":
                leftRatio = 1155 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "東門":
                leftRatio = 1070 / baseW;
                topRatio = 395 / baseH;
                display = 'block';
                break;  
            case "大安森林公園":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 1073 / baseW;
                topRatio = 301 / baseH;
                display = 'block';
                break;  
            case "信義安和":
                leftRatio = 989 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "台北101":
                leftRatio = 904 / baseW;
                topRatio = 220 / baseH;
                display = 'block';
                break;  
            case "象山":
                leftRatio = 819 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;  
            
            default:
                display = 'none';
                break;
        }

        //  座標寬高比例計算
        const widthRatio = 50 / baseW;     
        const heightRatio = 70 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            height: `${heightRatio * 100}%`,
            display: `${display}`,
        };
    }); 

  return { pinStyle_red , pinStyle_green, pinStyle_blue, pinStyle_yellow , pinStyle_brown,stationName};

  

}
