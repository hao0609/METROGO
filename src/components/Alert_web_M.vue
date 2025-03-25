<script setup>
  import Swal from 'sweetalert2';
  import { onUnmounted } from 'vue'
      // 自定義修改內容
      const props = defineProps({
        alertInfo: {
          type: Object,
          required: true,
          // 彈窗內容資料
          default: () => ({
            fristTitle: '',
            svg_icon: ``, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
            SecondTittle: '',
            ThirdTittle: '',
            ButtonText: '',
            allowOutsideClick: null,
            function: null,
          }),
        },
      });

    const showAlert = () => {
      Swal.fire({
        title: `<h2>${props.alertInfo.fristTitle}<h2>`,
        html: `<div class="content">
                  <div class="alert_icon">
                      ${props.alertInfo.svg_icon}
                  </div>
                  <div class="title1 bold">
                       ${props.alertInfo.SecondTittle}
                  </div>
                  <div class="title2 bold">
                      ${props.alertInfo.ThirdTittle}
                  </div>
                  
              </div>`,
        confirmButtonText: `${props.alertInfo.ButtonText}`,
        allowOutsideClick: props.alertInfo.allowOutsideClick,     //強迫用戶無法點選空白處關閉視窗，只能進行登入
        customClass: {
        popup: 'my-swal-M',
        confirmButton: 'btn_filled'
      }
      }).then((result) => {
        /* 兩個按鈕點擊後各個執行的功能 */
        if (result.isConfirmed) {
          const do_function = props.alertInfo.function
          do_function()
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







