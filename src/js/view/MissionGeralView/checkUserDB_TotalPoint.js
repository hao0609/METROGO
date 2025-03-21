
import { database, get, ref as dbRef} from "../../../firebase/firebaseConfig";


/**
 * 讀取用戶會員資料表目前的點數積分
 * @param {string} userUID - 當前的用戶UID
 * @returns {number} - 用戶會員資料表目前的點數積分
 */


// 取得用戶點數
export default async function GetUserPoint(userUID) { 

    try {

        const ref = dbRef(database,`會員資料/${userUID}`);
        const snapshot = await get(ref); // 🔹 使用 await 等待 Firebase 回應

            if (snapshot.exists()) {
                console.log(snapshot.val().點數積分);
                
                return snapshot.val().點數積分
                
            }else{
                console.log('No data available');
                return null
                
            }
        

    } catch (error) {
        console.log(error.message);
        return null
        
    }
}