<script setup>
      //自定義修改內容
      const props = defineProps({
        rowInfo: {
          type: Object,
          required: true,
        // 彈窗內容資料
          default: () => ({
            Title2: '',
            Text: '',
            ImgSrc: '',
          }),
        },
      });
</script>


<template>
    <div class="row_box">
        <div class="image"><img :src="props.rowInfo.ImgSrc"></div>
        <div class="text_box">
            <div class="title2 bold">{{ props.rowInfo.Title2 }}</div>
            <div class="body">{{ props.rowInfo.Text }}</div>
        </div>
    </div>
</template>