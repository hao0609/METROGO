import { database, ref, get, update } from "@/firebase/firebaseConfig";

/**
 * 處理照片審核結果
 * @param {string} userId 用戶ID
 * @param {string} routeName 路線名稱（原始鍵值）
 * @param {string} stationName 站點名稱
 * @param {string} reviewResult 審核結果，可能的值: "通過" 或 "未通過"
 * @returns {Promise<{success: boolean, points?: number}>} 操作結果
 */
export default async function handlePhotoReview(
  userId, 
  routeName, 
  stationName, 
  reviewResult
) {
  try {
    // 準備更新的數據
    const updates = {};
    
    // 更新特定站點的照片審核狀態的完整路徑
    const photoStatusPath = `會員資料/${userId}/特殊任務遊戲進度/${routeName}/${stationName}/照片狀態`;
    
    // 設定照片狀態
    updates[photoStatusPath] = reviewResult === "通過" ? "審核通過" : "審核未通過";
    
    // 如果審核通過，則增加用戶積分
    let points = 0;
    if (reviewResult === "通過") {
      points = 100; // 固定100積分

      // 更新會員資料表的總積分
      const memberPointDataRef = ref(database, `會員資料/${userId}`);
      const pointSnapshot = await get(memberPointDataRef);
      
      if (pointSnapshot.exists()) {
        const currentPoints = pointSnapshot.val().點數積分 || 0;
        const newTotalPoints = currentPoints + points;
        
        updates[`會員資料/${userId}/點數積分`] = newTotalPoints;
        
        console.log(`已成功更新 ${points} 積分到會員點數積分值，當前總積分：${newTotalPoints}`);
      } else {
        console.error(`找不到用戶 ${userId} 的會員資料`);
        return { success: false };
      }
    }
    
    // 執行更新
    await update(ref(database), updates);
    
    console.log(`照片審核完成: ${stationName} - ${reviewResult}`);
    return { 
      success: true, 
      points: reviewResult === "通過" ? points : 0 
    };
  } catch (error) {
    console.error("照片審核失敗:", error);
    return { success: false };
  }
}