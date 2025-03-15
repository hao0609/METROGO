<template>
  <div class="modal-overlay" @click.stop>
    <div class="modal-content" @click.stop>
      <!-- 點擊關閉按鈕觸發 cancel 事件 -->
      <button class="close-btn" @click="handleCancel">
        <span>&#10005;</span>
      </button>
      <div class="modal-body">
        <div class="title1 bold">{{ message }}</div>
        <div class="title2 bold">{{ message2 }}</div>
        <div class="add-photo"><span class="add-icon">+</span></div>
        <!-- 可選擇性顯示圖片 -->
        <img v-if="img" :src="img" alt="Alert Image" class="alert-img" />
        <!-- </div> -->
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn small">拍照</button>
          <!-- <button class="btn small" @click="onUploadFromAlbumClick">
            從相簿上傳
          </button> -->
          <!-- <alert_user_photo_open
            ref="alert_user_photo_open_ref"
            v-if="showUserPhotoOpen"
            @close="showUserPhotoOpen"
          /> -->
        </div>
        <button class="submit-btn" @click="handleConfirm">送出</button>
      </div>
      <div class="modal-img right">
        <img src="../assets/images/MissionSpecial/img_addPhoto.svg" alt="" />
      </div>
      <div class="modal-img left">
        <img src="../assets/images/MissionSpecial/img_addPhoto2.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import alert_user_photo_open from "@/alert/alert_user_photo_open.vue";

const alert_user_photo_open_ref = ref(null);
// const onUploadFromAlbumClick = () => {
//   console.log(alert_user_photo_open_ref.value);
// };
export default {
  components: {
    alert_user_photo_open,
  },
  name: "alert_L_Photo",
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    message2: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: null,
    },
  },
  emits: ["confirm", "cancel"],
  methods: {
    onUploadFromAlbumClick() {
      this.PhotoOpenShowAlert = true;
      console.log(alert_user_photo_open_ref.value);
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
  data() {
    return {
      showUserPhotoOpen: false,
    };
  },
  // export default {
  //   name: "alert_L_Photo",

  //   props: {
  //     title: {
  //       type: String,
  //       default: "",
  //     },
  //     message: {
  //       type: String,
  //       default: "",
  //     },
  //     message2: {
  //       type: String,
  //       default: "",
  //     },
  //     img: {
  //       type: String,
  //       default: null,
  //     },
  //   },
  //   emits: ["confirm", "cancel"],
  //   setup(props, { emit }) {
  //     const showUserPhotoOpen = ref(false);

  //     function onUploadFromAlbumClick() {
  //       // alert_user_photo_open_ref.value.PhotoOpenShowAlert();
  //       console.log(alert_user_photo_open_ref.value);
  //     }
  //     function handleConfirm() {
  //       emit("confirm");
  //     }
  //     function handleCancel() {
  //       emit("cancel");
  //     }

  //     return {
  //       showUserPhotoOpen,
  //       onUploadFromAlbumClick,
  //       handleConfirm,
  //       handleCancel,
  //     };
  //   },
  // };
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base/_color.scss";
@import "@/assets/sass/base/_font.scss";
@import "@/assets/sass/component/_btn.scss";
@import "@/assets/sass/mixin/_mixin.scss";
@import "@/assets/sass/component/_modal.scss";
</style>
