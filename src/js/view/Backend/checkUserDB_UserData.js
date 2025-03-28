
import { database, get, ref as dbRef} from "../../../firebase/firebaseConfig";


/**
 * 讀取用戶會員資料表的所有資料
 * @param {string} userUID - 當前的用戶UID
 * @returns {object} - 用戶會員資料表的所有資料
 */


// 取得用戶資料
export default async function GetUserData(userUID) { 

    try {

        const ref = dbRef(database,`會員資料/${userUID}`);
        const snapshot = await get(ref); // 🔹 使用 await 等待 Firebase 回應

            if (snapshot.exists()) {
                
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