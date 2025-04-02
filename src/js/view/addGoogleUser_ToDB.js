import { database } from '../../firebase/firebaseConfig';
import { ref, set, push, get } from 'firebase/database';
import MissionGeneral_UserInfo from '@/json/MissionGeneral_UserInfo.json';
import MissionSpecial_UserInfo from '@/json/MissionSpecial_UserInfo.json';
import GetUserData from '../view/Backend/checkUserDB_UserData.js'

/**
 * 生成下一個會員ID
 * @returns {Promise<string>} 會員ID
 */


const generateMemberID = async () => {
    try {
      // 讀取當前計數器值
      const counterRef = ref(database, 'counters/memberIDCounter');
      const snapshot = await get(counterRef);
      
      let nextNumber = 1; // 默認從 001 開始
      if (snapshot.exists()) {
        nextNumber = snapshot.val() + 1;
      }
      
      // 更新計數器
      await set(counterRef, nextNumber);
      
      // 格式化為三位數字   <!-- 這邊就不需要了 但還是保留 counter --> 
      // const formattedNumber = String(nextNumber).padStart(3, '0');
      // return `TID201${formattedNumber}`;

    } catch (error) {
      console.error('生成會員ID時出錯:', error);
      throw error;
    }
  };



/**
 * 將 google 登入帳號保存數據到Firebase
 * @param {Object} UserData - google 登入帳號資料
 */

export const addGoogleUser_ToDB = async (UserData) => {
   
    try{

    // 取得目前用戶註冊日期

    function getFormattedDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');  // 月份是從 0 開始的，所以要 +1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;                             // 產生 YYYY-MM-DD 格式
      }

    const userDataToSave_Final = {

    "會員姓名": UserData.displayName,           
    "會員密碼": "",
    "會員暱稱": UserData.displayName,
    "會員編號": UserData.uid,
    "會員註冊日期": getFormattedDate(),         // 用戶註冊日期
    "電子郵件":  UserData.email,
    "會員頭像":  UserData.photoURL,                             // 先給空的
    "點數積分": 0 ,                             // 先給0
        ...MissionGeneral_UserInfo,                // 一般任務遊戲進度
        ...MissionSpecial_UserInfo                // 特殊任務遊戲進度
    }
        
    const userRef = ref(database, '會員資料/' + UserData.uid);

    

    const ckeckUserExist = await GetUserData(UserData.uid)
    console.log(ckeckUserExist);
    
    // 先判斷用戶是否已存在，如果不存在則將用戶數據保存到Firebase
    if ( ckeckUserExist== null) {
      // 執行 Counter 功能
      await generateMemberID();

      await set(userRef, userDataToSave_Final);   // 變更為用用戶的唯一 UID set 方法添加至會員資料表 
      console.log('用戶數據已成功保存到Firebase，會員ID:', UserData.uid);
    }



    }catch(error){

        console.error('保存用戶數據時出錯:', error);
        return { error: error.message };

    }



}