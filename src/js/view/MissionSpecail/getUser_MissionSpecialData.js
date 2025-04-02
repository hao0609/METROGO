
import { database, get, ref as dbRef} from "../../../firebase/firebaseConfig";


/**
 * 讀取用戶會員資料表的特殊任務進度
 * @param {string} userUID - 當前的用戶UID
 * @param {string} line - 捷運路線
 * @returns {Array} - 用戶會員資料表的特殊任務進度資料
 */


// 取得用戶點數
export default async function GetUserMissionSpecialData(userUID,line) { 

    try {

        const ref = dbRef(database,`會員資料/${userUID}/特殊任務遊戲進度/${line}`);
        const snapshot = await get(ref); // 🔹 使用 await 等待 Firebase 回應

            if (snapshot.exists()) {
                console.log(snapshot.val());
                
                return snapshot.val()
                
            }else{
                console.log('No data available');
                return null
                
            }
        

    } catch (error) {
        console.log(error.message);
        return null
        
    }
}
