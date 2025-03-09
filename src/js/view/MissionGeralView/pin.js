import {  computed ,ref} from 'vue';

const baseW = 1440;                // 基準寬度 (來自每個 SVG 檔的寬高)
const baseH = 1024;                // 基準高度

export const stationName = ref('');
export function pinjs(stationName) {



    // 紅線路線定位    
    const pinStyle_red = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;
        let display = '';


        switch (stationName) {

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

        switch (stationName) {

            case "新店":
                leftRatio = 686 / baseW;
                topRatio = 181 / baseH;
                display = 'block';
                break;
            case "新店區公所":
                leftRatio = 611 / baseW;
                topRatio = 232 / baseH;
                display = 'block';
                break;
            case "七張":
                leftRatio = 531 / baseW;
                topRatio = 287 / baseH;
                display = 'block';
                break;
            case "大坪林":
                leftRatio = 456 / baseW;
                topRatio = 333 / baseH;
                display = 'block';
                break;    
            case "景美":
                leftRatio = 377 / baseW;
                topRatio = 384 / baseH;
                display = 'block';
                break;    
            case "萬隆":
                leftRatio = 287 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "公館":
                leftRatio = 287 / baseW;
                topRatio = 540 / baseH;
                display = 'block';
                break;  
            case "台電大樓":
                leftRatio = 365 / baseW;
                topRatio = 583 / baseH;
                display = 'block';
                break;  
            case "古亭":
                leftRatio = 441 / baseW;
                topRatio = 632 / baseH;
                display = 'block';
                break;
            case "中正紀念堂":
                leftRatio = 526 / baseW;
                topRatio = 678 / baseH;
                display = 'block';
                break;
            case "小南門":
                leftRatio = 597 / baseW;
                topRatio = 618 / baseH;
                display = 'block';
                break;
            case "西門":
                leftRatio = 681 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;    
            case "北門":
                leftRatio = 763 / baseW;
                topRatio = 703 / baseH;
                display = 'block';
                break;    
            case "中山":
                leftRatio = 848 / baseW;
                topRatio = 654 / baseH;
                display = 'block';
                break;  
            case "松江南京":
                leftRatio = 923 / baseW;
                topRatio = 600 / baseH;
                display = 'block';
                break;  
            case "南京復興":
                leftRatio = 1003 / baseW;
                topRatio = 540 / baseH;
                display = 'block';
                break;  
            case "台北小巨蛋":
                leftRatio = 1078 / baseW;
                topRatio = 483 / baseH;
                display = 'block';
                break;  
            case "南京三民":
                leftRatio = 1151 / baseW;
                topRatio = 434 / baseH;
                display = 'block';
                break;  
            case "松山":
                leftRatio = 1150 / baseW;
                topRatio = 343 / baseH;
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

        switch (stationName) {

            case "頂埔":
                leftRatio = 686 / baseW;
                topRatio = 180 / baseH;
                display = 'block';
                break;
            case "永寧":
                leftRatio = 612 / baseW;
                topRatio = 234 / baseH;
                display = 'block';
                break;
            case "土城":
                leftRatio = 532 / baseW;
                topRatio = 286 / baseH;
                display = 'block';
                break;
            case "海山":
                leftRatio = 457 / baseW;
                topRatio = 336 / baseH;
                display = 'block';
                break;
            case "亞東醫院":
                leftRatio = 377 / baseW;
                topRatio = 386 / baseH;
                display = 'block';
                break;
            case "府中":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;    
            case "板橋":
                leftRatio = 371 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;    
            case "新埔":
                leftRatio = 287 / baseW;
                topRatio = 540 / baseH;
                display = 'block';
                break;  
            case "江子翠":
                leftRatio = 363 / baseW;
                topRatio = 583 / baseH;
                display = 'block';
                break;  
            case "龍山寺":
                leftRatio = 441 / baseW;
                topRatio = 632 / baseH;
                display = 'block';
                break;  
            case "西門":
                leftRatio = 525 / baseW;
                topRatio = 678 / baseH;
                display = 'block';
                break;
            case "台北車站":
                leftRatio = 597 / baseW;
                topRatio = 619 / baseH;
                display = 'block';
                break;
            case "善導寺":
                leftRatio = 682 / baseW;
                topRatio = 663 / baseH;
                display = 'block';
                break;
            case "忠孝新生":
                leftRatio = 764 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;    
            case "忠孝復興":
                leftRatio = 848 / baseW;
                topRatio = 654 / baseH;
                display = 'block';
                break;    
            case "忠孝敦化":
                leftRatio = 925 / baseW;
                topRatio = 597 / baseH;
                display = 'block';
                break;  
            case "國父紀念館":
                leftRatio = 1000 / baseW;
                topRatio = 540 / baseH;
                display = 'block';
                break;  
            case "市政府":
                leftRatio = 1078 / baseW;
                topRatio = 485 / baseH;
                display = 'block';
                break;  
            case "永春":
                leftRatio = 1152 / baseW;
                topRatio = 435 / baseH;
                display = 'block';
                break;  
            case "後山埤":
                leftRatio = 1151 / baseW;
                topRatio = 344 / baseH;
                display = 'block';
                break;  
            case "昆陽":
                leftRatio = 1068 / baseW;
                topRatio = 305 / baseH;
                display = 'block';
                break;  
            case "南港":
                leftRatio = 986 / baseW;
                topRatio = 262 / baseH;
                display = 'block';
                break;  
            case "南港展覽館":
                leftRatio = 903 / baseW;
                topRatio = 218 / baseH;
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

        switch (stationName) {

            case "南勢角":
                leftRatio = 687 / baseW;
                topRatio = 177 / baseH;
                display = 'block';
                break;
            case "景安":
                leftRatio = 612 / baseW;
                topRatio = 232 / baseH;
                display = 'block';
                break;
            case "永安市場":
                leftRatio = 533 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "頂溪":
                leftRatio = 457 / baseW;
                topRatio = 334 / baseH;
                display = 'block';
                break;    
            case "古亭":
                leftRatio = 379 / baseW;
                topRatio = 386 / baseH;
                display = 'block';
                break;    
            case "東門":
                leftRatio = 292 / baseW;
                topRatio = 442 / baseH;
                display = 'block';
                break;  
            case "忠孝新生":
                leftRatio = 370 / baseW;
                topRatio = 487 / baseH;
                display = 'block';
                break;  
            case "松江南京":
                leftRatio = 286 / baseW;
                topRatio = 539 / baseH;
                display = 'block';
                break;  
            case "行天宮":
                leftRatio = 201 / baseW;
                topRatio = 593 / baseH;
                display = 'block';
                break;
            case "中山國小":
                leftRatio = 276 / baseW;
                topRatio = 637 / baseH;
                display = 'block';
                break;
            case "民權西路":
                leftRatio = 356 / baseW;
                topRatio = 686 / baseH;
                display = 'block';
                break;
            case "大橋頭":
                leftRatio = 437 / baseW;
                topRatio = 630 / baseH;
                display = 'block';
                break;    
            case "台北橋":
                leftRatio = 521 / baseW;
                topRatio = 673 / baseH;
                display = 'block';
                break;    
            case "菜寮":
                leftRatio = 676 / baseW;
                topRatio = 662 / baseH;
                display = 'block';
                break;  
            case "三重":
                leftRatio = 763 / baseW;
                topRatio = 708 / baseH;
                display = 'block';
                break;  
            case "先嗇宮":
                leftRatio = 849 / baseW;
                topRatio = 652 / baseH;
                display = 'block';
                break;  
            case "頭前庄":
                leftRatio = 924 / baseW;
                topRatio = 597 / baseH;
                display = 'block';
                break;  
            case "新莊":
                leftRatio = 1001 / baseW;
                topRatio = 540 / baseH;
                display = 'block';
                break;  
            case "輔大":
                leftRatio = 1079 / baseW;
                topRatio = 484 / baseH;
                display = 'block';
                break;  
            case "丹鳳":
                leftRatio = 1152 / baseW;
                topRatio = 433 / baseH;
                display = 'block';
                break;  
            case "迴龍":
                leftRatio = 1151 / baseW;
                topRatio = 343 / baseH;
                display = 'block';
                break;  
            case "三重國小":
                leftRatio = 512 / baseW;
                topRatio = 575 / baseH;
                display = 'block';
                break;  
            case "三和國中":
                leftRatio = 596 / baseW;
                topRatio = 615 / baseH;
                display = 'block';
                break;  
            case "徐匯中學":
                leftRatio = 676 / baseW;
                topRatio = 563 / baseH;
                display = 'block';
                break;  
            case "三民高中":
                leftRatio = 757 / baseW;
                topRatio = 606 / baseH;
                display = 'block';
                break;  
            case "蘆洲":
                leftRatio = 834 / baseW;
                topRatio = 549 / baseH;
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

        switch (stationName) {

            case "動物園":
                leftRatio = 688 / baseW;
                topRatio = 178 / baseH;
                display = 'block';
                break;
            case "木柵":
                leftRatio = 612 / baseW;
                topRatio = 231 / baseH;
                display = 'block';
                break;
            case "萬芳社區":
                leftRatio = 532 / baseW;
                topRatio = 285 / baseH;
                display = 'block';
                break;
            case "萬芳醫院":
                leftRatio = 455 / baseW;
                topRatio = 336 / baseH;
                display = 'block';
                break;    
            case "辛亥":
                leftRatio = 379 / baseW;
                topRatio = 388 / baseH;
                display = 'block';
                break;    
            case "麟光":
                leftRatio = 295 / baseW;
                topRatio = 439 / baseH;
                display = 'block';
                break;  
            case "六張犁":
                leftRatio = 371 / baseW;
                topRatio = 485 / baseH;
                display = 'block';
                break;  
            case "科技大樓":
                leftRatio = 287 / baseW;
                topRatio = 539 / baseH;
                display = 'block';
                break;  
            case "大安":
                leftRatio = 366 / baseW;
                topRatio = 584 / baseH;
                display = 'block';
                break;
            case "忠孝復興":
                leftRatio = 283 / baseW;
                topRatio = 632 / baseH;
                display = 'block';
                break;
            case "南京復興":
                leftRatio = 362 / baseW;
                topRatio = 681 / baseH;
                display = 'block';
                break;
            case "中山國中":
                leftRatio = 448 / baseW;
                topRatio = 722 / baseH;
                display = 'block';
                break;    
            case "松山機場":
                leftRatio = 522 / baseW;
                topRatio = 666 / baseH;
                display = 'block';
                break;    
            case "大直":
                leftRatio = 600 / baseW;
                topRatio = 612 / baseH;
                display = 'block';
                break;  
            case "劍南路":
                leftRatio = 679 / baseW;
                topRatio = 658 / baseH;
                display = 'block';
                break;  
            case "西湖":
                leftRatio = 769 / baseW;
                topRatio = 703 / baseH;
                display = 'block';
                break;  
            case "港墘":
                leftRatio = 846 / baseW;
                topRatio = 647 / baseH;
                display = 'block';
                break;  
            case "文德":
                leftRatio = 924 / baseW;
                topRatio = 599 / baseH;
                display = 'block';
                break;  
            case "內湖":
                leftRatio = 1002 / baseW;
                topRatio = 541 / baseH;
                display = 'block';
                break;  
            case "大湖公園":
                leftRatio = 1077 / baseW;
                topRatio = 485 / baseH;
                display = 'block';
                break;  
            case "葫洲":
                leftRatio = 1153 / baseW;
                topRatio = 434 / baseH;
                display = 'block';
                break;  
            case "東湖":
                leftRatio = 1150 / baseW;
                topRatio = 345 / baseH;
                display = 'block';
                break;  
            case "南港軟體園區":
                leftRatio = 1069 / baseW;
                topRatio = 304 / baseH;
                display = 'block';
                break;  
            case "南港展覽館":
                leftRatio = 980 / baseW;
                topRatio = 250 / baseH;
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


export function locationInfo() {

    const locationInfobox_style = computed(() => {

        let leftRatio = 0;
        let topRatio = 0;


        leftRatio = 678 / baseW;
        topRatio = 324 / baseH;

        //  寬高比例計算
        const widthRatio = 230 / baseW;     
        const heightRatio = 90 / baseH;

        return {
            left: `${leftRatio * 100}%`,
            top: `${topRatio * 100}%`,
            width: `${widthRatio * 100}%`,
            // height: `${heightRatio * 100}%`,
        };
    })
    return {locationInfobox_style}
}
