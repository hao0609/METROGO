
import MissionGeneral_StationPoint from '../../../json/MissionGeneral_StationPoint.json'


/**
 * 尋找該用戶打卡的站點所要提供的積分
 * @param {string} stationName - 目前用戶打卡的站點名稱
 * @returns {number} - 該站點的積分
 */


export default function getStationScore(stationName) {

    // console.log(MissionGeneral_StationPoint.一般任務各站點積分);
    const stationData = MissionGeneral_StationPoint["一般任務各站點積分"]

    for (const routeName in stationData) {
        const routeStations = stationData[routeName];
        if (routeStations[stationName]) {
            // 如果有該站名，就回傳獎勵積分
            return routeStations[stationName]["獎勵積分"];
        }
    }
    return null; // 找不到時回傳 null
  }
  