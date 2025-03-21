import { database, ref, get, update } from "../../../firebase/firebaseConfig";
import  MissionGeneral_StationPoint from '../../../json/MissionGeneral_StationPoint.json'

/**
 * 將用戶打卡的站點對應積分表的積分值增加到會員資料表的點數積分
 * @param {string} userUID - 當前的用戶UID
 * @param {number} userTotalPoint - 要更新至用戶會員資料的的總積分
 */

export default async function updateUserDB_addUserPoint(userUID,userTotalPoint) {


    const pointDataRef = ref(database, `會員資料/${userUID}`);
  
    try {
      const snapshot = await get(pointDataRef);
      
      
  
      if (snapshot.exists()) { 
        // 更新用戶會員資料的的總積分
        await update(pointDataRef, {點數積分: userTotalPoint});
        console.log(`已成功更新 ${userTotalPoint} 到會員點數積分值`);

      } else {
        console.log("找不到該用戶一般任務遊戲進度的資料");
      }
    } catch (error) {
      console.error("更新點數積分失敗:", error.message);
    }
  }
  