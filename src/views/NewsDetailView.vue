<template>
    <div>
        <div class="detail-content">
            <div class="return-btn title2 bold" @click="goBack">
                <BackIcon/> 返回
            </div>
            <div class="news-card-detail">
                <div class="news-card-tag tag-1">最新消息</div>
                <div class="img-area">
                    <div class="img-news-photo"></div>
                </div>
                <!-- <img src="@/assets/images/img_login_bg.svg" alt="test"> -->
                <div class="card-text-wrap">
                    <div class="title2 bold">臺北市雙層觀光巴士Yes！Bus 探索臺北最具魅力的夜市－寧夏夜市！</div>
                    <div class="card-content">
                        <p class="caption txt-neutral-400"> 2024/12/01</p>
                        <p>
                            如果你想在臺北的夜晚體驗最道地的市井風情與美食饗宴，搭乘雙層巴士的「夜市專車」將是你不可錯過的選擇。這條路線從臺北車站出發，穿越臺北最具歷史與文化特色的街區，途經富有傳統韻味的迪化街，並最終抵達臺北人氣夜市之一的【寧夏夜市】。從雙層巴士的高處俯瞰街景，感受城市夜晚的獨特氛圍，無論是古老的建築美感還是夜市裡的香氣四溢，都能讓你深刻體會臺北的文化魅力與活力。
                            在寧夏夜市，你可以嚐到如蚵仔煎、麻油雞、臭豆腐、滷肉飯、刈包等經典臺灣街頭美食。此外，寧夏夜市的特色甜點也備受歡迎，其中包括地瓜球、古早味豆花，手工製作的冰品和各種傳統小吃的創新版本，完美地滿足了不同口味的需求。除了傳統小吃，這裡也有不少異國風味的美食，滿足不同口味的遊客需求。寧夏夜市北段主要集中各式美食攤位，南段則有玩具和遊戲攤位，讓遊客在大快朵頤的同時，也能享受夜市的趣味與活力。透過雙層巴士的夜市專車，遊客能輕鬆抵達這裡，親身感受臺灣夜市的獨特魅力。
                            Yes！Bus夜市專車，每天晚上提供20:00、20:30、21:00，共3班次，從臺北車站捷運M4出口出發，無論是來自臺北市區或外地的遊客，都能輕鬆抵達，暢遊整個夜市。無論您是想要品嚐道地的臺北小吃，還是體驗熱鬧的臺灣夜市文化，在寧夏夜市，您將體驗到臺北最熱鬧的夜晚。攤位間充滿人聲鼎沸，街頭的小攤擺放著琳瑯滿目的商品，每一條街道都瀰漫著食物的香氣與歡聲笑語，是您和朋友、家人共度美好時光的理想選擇。加入我們，感受寧夏夜市的獨特魅力！寧夏夜市將是您絕對不能錯過的美食與文化天堂！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '../assets/sass/page/news.scss';


</style>

<script>
import BackIcon from '@/components/icons/IconBack.vue';
export default {
    name: "NewsDetailView",
    components: {
        BackIcon
    },
    methods: {
    goBack() {
        this.$router.push('/news'); // 直接返回新聞列表頁
    }
    }
};

</script>
