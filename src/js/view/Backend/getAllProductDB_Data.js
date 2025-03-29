import { database, get, ref as dbRef} from "../../../firebase/firebaseConfig";

/**
 * 讀取 firebase 商品資料表中所有商品的資料
 * 包含上架日期欄位
 * @returns {object} - 所有商品的資料
 */

// 取得所有商品的資料
export default async function GetAllProductData() {
    try {
        // 調整路徑以匹配 Firebase 的結構：商品管理/products
        const ref = dbRef(database, `商品管理/products`);
        const snapshot = await get(ref); // 🔹 使用 await 等待 Firebase 回應
        
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            
            // return 所有目前商品資料表的商品資料
            return snapshot.val()
            
        } else {
            console.log('No data available');
            return null
            
        }
    } catch (error) {
        console.log(error.message);
        return null
        
    }
}