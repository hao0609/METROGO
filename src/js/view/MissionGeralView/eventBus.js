// eventBus.js
import { reactive } from "vue";

export const EventBus = reactive({
    No_Station: null, // 預設為 null
    setNoStation(value) {
        this.No_Station = value;
    }
});