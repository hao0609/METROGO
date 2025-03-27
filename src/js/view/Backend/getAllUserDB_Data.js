
import { database, get, ref as dbRef} from "../../../firebase/firebaseConfig";


/**
 * 讀取 firebase 會員資料表中所有會員的資料
 * @returns {object} - 所有會員的資料
 */


// 取得所有會員的資料
export default async function GetAllUserData() { 

    try {

        const ref = dbRef(database,`會員資料`);
        const snapshot = await get(ref); // 🔹 使用 await 等待 Firebase 回應

            if (snapshot.exists()) {
                // console.log(snapshot.val());
                
                // return 所有目前會員資料表的會員資料
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