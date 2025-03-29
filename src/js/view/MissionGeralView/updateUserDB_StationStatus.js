import { database, ref, get, update } from "../../../firebase/firebaseConfig";


/**
 * 將用戶打卡的站點更新到Firebase 會員資料的一般任務進度
 * @param {string} userUID - 當前的用戶UID
 * @param {string} stationName - 用戶目前打卡的站點名稱
 * @param {string} checkedInTime - 用戶目前打卡的時間
 */

// 🔹 更新所有路線中的 "台北車站" 的打卡狀態為 true
export default async function updateUserDB_StationStatus(userUID,stationName) {
    const gameProgressRef = ref(database, `會員資料/${userUID}/一般任務遊戲進度`);
  
    try {
      const snapshot = await get(gameProgressRef);
  
      if (snapshot.exists()) {
        const gameProgressData = snapshot.val();
        let updates = {};
  
        // 遍歷所有捷運路線
        for (const routeName in gameProgressData) {
          const routeStations = gameProgressData[routeName];
  
          // 在該路線中尋找 "目前打卡的捷運站點"
          if (routeStations[stationName]) {
            console.log(routeName,stationName);
            
            // 更新會員資料表的打卡狀態
            updates[`會員資料/${userUID}/一般任務遊戲進度/${routeName}/${stationName}/打卡狀態`] = true;


            // 獲取目前時間並轉換為台灣時區
            const now = new Date();
            const checkedInTime = now.toLocaleString('zh-TW', {
              timeZone: 'Asia/Taipei',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });


            // 更新會員資料表的打卡時間
            updates[`會員資料/${userUID}/一般任務遊戲進度/${routeName}/${stationName}/打卡時間`] = checkedInTime;

          }
        }
  
        // 批量更新所有符合條件的捷運站點
        await update(ref(database), updates);
        console.log(`已成功更新所有路線中的 ${stationName} 打卡狀態！`);
      } else {
        console.log("找不到該用戶一般任務遊戲進度的資料");
      }
    } catch (error) {
      console.error("更新打卡狀態失敗:", error.message);
    }
  }
  
  // 測試：將所有 "台北車站" 的打卡狀態更新為 true
//   updateUserDB_StationStatus("台北車站");