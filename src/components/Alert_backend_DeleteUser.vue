<script setup>
  import Swal from 'sweetalert2';
  import { onUnmounted,defineEmits } from 'vue'
  import axios from 'axios';
  import {ref as dbRef ,database,remove } from '../firebase/firebaseConfig.js'

      // 自定義修改內容
      const props = defineProps({
        userID: {
          type: Object,
          required: true,
          // 彈窗內容資料
          default: () => ({
            ThirdTittle: '',
          }),
        },
      });


      const alertInfo =  {

      // 彈窗內容資料
        fristTitle: '確認刪除使用者?',
        svg_icon: `
        <svg class="f-7-exclamationmark-circle" width="171" height="171" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M85.4995 158.499C125.364 158.499 158.498 125.435 158.498 85.5C158.498 45.6356 125.291 12.5013 85.4262 12.5013C45.4947 12.5013 12.5039 45.6356 12.5039 85.5C12.5039 125.435 45.5649 158.499 85.4995 158.499ZM85.5026 146.333C51.7179 146.333 24.7335 119.279 24.7335 85.5C24.7335 51.7886 51.6446 24.6668 85.4262 24.6668C119.135 24.6668 146.256 51.7916 146.33 85.5C146.4 119.282 119.205 146.333 85.4965 146.333M85.4262 98.4533C88.8585 98.4533 90.7914 96.5204 90.8616 92.8011L91.9365 55.0132C92.0097 51.3611 89.1455 48.6434 85.353 48.6434C81.4871 48.6434 78.7695 51.2909 78.8397 54.9399L79.771 92.8011C79.8413 96.4501 81.8475 98.4533 85.4262 98.4533ZM85.4262 121.712C89.5028 121.712 93.1518 118.421 93.1518 114.271C93.1518 110.048 89.5761 106.826 85.4262 106.826C81.2032 106.826 77.6946 110.118 77.6946 114.271C77.6946 118.35 81.2734 121.712 85.4262 121.712Z" fill="#FCD34D" />
        </svg>          
        `, //無法確認 ICON 是否可以用外部引入.vue檔方式，目前先使用字串方式
        SecondTittle: '會員 ID',
        ButtonText_confirm: '確認',
        ButtonText_cancel: '取消',
        allowOutsideClick: true,
        function: null,
      }

    const showAlert = () => {
      Swal.fire({
        title: `<h2 class="backend_alertTittle" >${alertInfo.fristTitle}<h2>`,
        html: `<div class="content">
                  <div class="alert_icon ">
                      ${alertInfo.svg_icon}
                  </div>
                  <div class="title1 bold">
                       ${alertInfo.SecondTittle}
                  </div>
                  <div class="title2 bold">
                      ${props.userID.ThirdTittle}
                  </div>
                  
              </div>`,
        showCancelButton: true,
        confirmButtonText: `${alertInfo.ButtonText_confirm}`,
        cancelButtonText: `${alertInfo.ButtonText_cancel}`,
        allowOutsideClick: alertInfo.allowOutsideClick,     //強迫用戶無法點選空白處關閉視窗，只能進行登入
        customClass: {
        popup: 'my-swal-M',
        confirmButton: 'btn_filled',
        cancelButton: 'btn_outline',
      }
      }).then((result) => {
        /* 確認按鈕點擊後執行的刪除用戶功能 */
        if (result.isConfirmed) {
              deleteUser(props.userID.ThirdTittle);
          }
      });
    }
    // 定義 emit 事件，呼叫父組件 AdminUserView 的 getUserData
    const emit = defineEmits(['refresh-data']);

    const deleteUser = async(deleteUserID) => {
          try {
            // 發送刪除用戶請求 (使用 Axios 呼叫 express delete API)
            const response = await axios.delete(`http://localhost:3000/delete-user/${deleteUserID}`);
            console.log(response);

              // 刪除成功，跳彈窗
              if ( response.status === 200) {
                  alert('刪除用戶成功!')
              }

              // 刪除 Realtime Database 中的用戶資料
              const userRef = dbRef(database, `會員資料/${deleteUserID}`);
              await remove(userRef);

              // 重新更新目前的會員資料表內容
              emit('refresh-data');

          }
          catch (error) {
            console.error('刪除用戶失敗:', error);
            console.log(error.response);
            
          }
    }

    defineExpose({                                                // 暴露 showAlert 方法給父組件使用
      showAlert,
    });


    onUnmounted(() => {
      Swal.close();
  });
</script>







