import { database, ref, get} from "../../../firebase/firebaseConfig";

/**
 * 將用戶打卡的站點更新到Firebase 會員資料的一般任務進度
 * @param {string} userUID - 當前的用戶UID
 * @param {string} stationName - 用戶目前打卡的站點名稱
 * @returns {array} - 已打卡的所有站點
**/



export default async function checkUserDB_AllDoneStations(userUID) {


    const userProgressRef = ref(database, `會員資料/${userUID}/一般任務遊戲進度`);


    try {
        const snapshot = await get(userProgressRef);
    
        if (snapshot.exists()) {
          const gameProgressData = snapshot.val();
          let checkedInStations = [];
    
          // 遍歷所有捷運路線
          for (const routeName in gameProgressData) {
            const routeStations = gameProgressData[routeName];
    
            // 遍歷該路線的所有站點
            for (const stationName in routeStations) {
              if (routeStations[stationName].打卡狀態 === true) {
                checkedInStations.push({
                  "捷運站名稱": stationName,
                  "捷運站編號": routeStations[stationName].捷運站編號,
                  "所屬路線": routeName
                });
              }
            }
          }
    
          console.log("已打卡的捷運站:", checkedInStations);
          return checkedInStations;
        } else {
          console.log("找不到該會員的遊戲進度資料");
          return [];
        }
    } catch (error) {
    console.error("讀取 Firebase 失敗:", error.message);
    return [];
    }



}