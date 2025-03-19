// Import the functions you need from the SDKs you need
// 初始化
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, remove,update } from 'firebase/database';

// 引入 firebase authentication 登入註冊驗證方法
import { getAuth } from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// 共用的
const firebaseConfig = {
  apiKey: "AIzaSyCr0etNy5x5Zdo9vzFintxYii6ckHRroHw",
  authDomain: "metrogo-ff75f.firebaseapp.com",
  databaseURL: "https://metrogo-ff75f-default-rtdb.firebaseio.com",
  projectId: "metrogo-ff75f",
  storageBucket: "metrogo-ff75f.firebasestorage.app",
  messagingSenderId: "36460695281",
  appId: "1:36460695281:web:42c5fa5fc62888561e2350"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);
console.log(`Auth instance created: ${auth}`);  // 測試 auth


// ** 在 Firebase 載入時，立即執行初始化資料庫架構**
async function initializeDatabase() {
  try {
    const dbRef = ref(database, '/');
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
      console.log(" Firebase 資料庫為空，正在建立初始資料結構...");
      await update(dbRef, {
        "會員資料": {
            "範例資料":{
                        "會員編號": "001",
                        "會員姓名": "黃小名",
                        "會員暱稱": "小名",
                        "電子郵件": "D6YFg@example.com",
                        "會員密碼": "123456",
                        "會員頭像": "./URL",
                        "會員註冊日期": "2022-01-01",
                        "點數積分": 0,
                      }
        },
        "商品管理": {
            "範例資料":{
                        "商品編號": "001",
                        "商品名稱": "馬克杯",
                        "商品價格": 123,
                        "商品簡介": "500ml的容量，適合各式大小的場合使用",
                        "商品圖片": {
                                  "圖片1": "./URL",
                                  "圖片2": "./URL",
                                  "圖片3": "./URL",
                                  "圖片4": "./URL",
                                  "圖片5": "./URL",
                                  },
                        "商品庫存": 10,
                        "商品分類": "日常用品",
                        "商品標籤": ["商品標籤1", "商品標籤2", "商品標籤3"],
                        "商品詳情": "這是一個商品的詳細資訊，包含商品的敘述、規格、等等",
                      } 
        },
        "照片管理": {
            "範例資料":{
                        "照片編號": "001",
                        "用戶上傳的照片": "./URL",
                        "照片上傳時間": "2022-01-01",
                        "照片狀態": "審核通過",
                        "會員編號": "001",
                        "捷運路線編號" : "R",
                        "捷運站編號" : "1",
                        "捷運站名稱" : "淡水站",
                        "捷運站點審核條件": "這是審核條件敘述"
                      }
        }
      });
      console.log("初始資料結構建立完成！");
    } else {
      console.log("Firebase 資料已存在，檢查是否缺少部分節點...");

      const updates = {};

      const data = snapshot.val(); // 取得目前資料


      if (!data["會員資料"]) {
        updates["會員資料"] = {
          "範例資料": {
            "會員姓名": "黃小名",
            "電子郵件": "D6YFg@example.com",
            "會員頭像": "./URL",
            "會員註冊日期": "2022-01-01",
            "點數積分": 0
          }
        };
      }

      if (!data["商品管理"]) {
        updates["商品管理"] = {
          "範例資料": {
            "商品名稱": "馬克杯",
            "商品價格": 123,
            "商品簡介": "500ml的容量，適合各式大小的場合使用",
            "商品圖片": {
              "圖片1": "./URL",
              "圖片2": "./URL",
              "圖片3": "./URL",
              "圖片4": "./URL",
              "圖片5": "./URL"
            },
            "商品庫存": 10,
            "商品分類": "日常用品",
            "商品標籤": {
              "tag_001": "促銷商品",
              "tag_002": "新上市"
            },
            "商品詳情": "這是一個商品的詳細資訊，包含商品的敘述、規格、等等"
          }
        };
      }

      if (!data["照片管理"]) {
        updates["照片管理"] = {
          "範例資料":{
            "照片編號": "001",
            "用戶上傳的照片": "./URL",
            "照片上傳時間": "2022-01-01",
            "照片狀態": "審核通過",
            "會員編號": "001",
            "捷運路線編號" : "R",
            "捷運站編號" : "1",
            "捷運站名稱" : "淡水站",
            "捷運站點審核條件": "這是審核條件敘述"
          }
        };
      }


      if (Object.keys(updates).length > 0) {
        await update(dbRef, updates);
        console.log("缺少的資料已補充完成！");
      } else {
        console.log("所有必要資料都已存在！");
      }

    }

  }catch (error) {
      console.error("初始化資料庫錯誤:", error);
  }

}


// 立即執行初始化
initializeDatabase();





export { auth,database, ref, set, get, onValue, remove, update };