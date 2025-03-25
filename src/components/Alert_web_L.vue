<script setup>
  import Swal from 'sweetalert2';
  import alert_web_L_row from './Alert_web_L_row.vue'
  import { h } from "vue";   // h 是 Vue 組件創建虛擬節點方法
  import { renderToString } from "@vue/server-renderer"; // renderToString 是 Vue 組件 DOM 轉成字串方法
  import { onUnmounted } from 'vue'

  // 自定義修改內容
  const props = defineProps({
    alertInfo: {
      type: Object,
      required: true,
      // 彈窗內容資料
      default: () => ({
        Title1 : "",
        rowData1 : {
          Title2: "",
          Text: "",
          ImgSrc: sampleImg,
        },
        rowData2 : {
        Title2: "",
        Text: "",
        ImgSrc: sampleImg
        },
        ButtonText: "",
        function_2: null,
        function_1: null,
      }),
    },
  });


  const showAlert = async () => {



      // 引用範例
      const row_content_1 = await renderToString(h(alert_web_L_row,{rowInfo: props.alertInfo.rowData1}));
      const row_content_2 = await renderToString(h(alert_web_L_row,{rowInfo: props.alertInfo.rowData2}));

      
      Swal.fire({
          title: `<h2>${props.alertInfo.Title1}<h2>`,
          html: `<div class="content">
                    ${row_content_1}
                    ${row_content_2}
                </div>`,

          showCancelButton: true,
          confirmButtonText: `${props.alertInfo.ButtonText}`,
          cancelButtonText: `關閉`,
          allowOutsideClick: true,     
          customClass: {
          popup: 'my-swal-L',
          confirmButton: 'btn_filled',
          cancelButton: 'btn_outline',
        }
      }).then((result) => {
      /* 兩個按鈕點擊後各個執行的功能 */
      if (result.isConfirmed) {
        props.alertInfo.function_1();
        
      } else if (result.isDismissed) {
        props.alertInfo.function_2();

        // router.push("/login"); // Vue Router 內部導航
      }
    });
    }

    defineExpose({                                                // 暴露 showAlert 方法給父組件使用
      showAlert,
    });

    onUnmounted(() => {
      Swal.close();
  });
</script>




