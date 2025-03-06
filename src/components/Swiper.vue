<script>
// swiper套件(輪播)
import { register } from "swiper/element/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";

// 註冊 swiper 自訂元素
register();

export default {
  data() {
    return { modules: [Autoplay, Navigation] };
  },
};
</script>
