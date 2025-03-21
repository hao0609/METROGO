import { database, ref, get, update } from "../../../firebase/firebaseConfig";
import  MissionGeneral_StationPoint from '../../../json/MissionGeneral_StationPoint.json'

/**
 * 將用戶打卡的站點對應積分表的積分值增加到會員資料表的點數積分
 * @param {string} userUID - 當前的用戶UID
 * @param {string} stationName - 用戶目前打卡的站點名稱
 */

// 🔹 更新所有路線中的 "台北車站" 的打卡狀態為 true
export default async function updateUserDB_addUserPoint(userUID,stationName) {


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
            
            // 尋找用戶目前打卡的捷運站點相對應的積分
            const point = await getStationScore(stationName)

            // 在遊戲畫面上直接增加該積分


            // 先取得用戶目前的點數積分
            


            // 在用戶的會員資料表的點數積分增加積分
            updates[`會員資料/${userUID}/點數積分`] = point;
           
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
  


  function getStationScore(stationName) {
    for (const routeName in MissionGeneral_StationPoint) {
        const routeStations = MissionGeneral_StationPoint[routeName];
    
        // 如果該路線內有該站點，則回傳該站的積分
        if (routeStations[stationName]) {
          return routeStations[stationName].獎勵積分;
        }
      }
      return null; // 找不到時回傳 null
  }
