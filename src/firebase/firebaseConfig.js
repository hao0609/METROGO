// Import the functions you need from the SDKs you need
// 初始化
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  remove,
  update,
} from "firebase/database";
import { getStorage, ref as storageref, uploadBytes, listAll, getDownloadURL,getMetadata} from "firebase/storage";

// 引入 firebase authentication 登入註冊驗證方法
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// 共用的
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://metrogo-ff75f-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const auth = getAuth(app);
console.log(`Auth instance created: ${auth}`); // 測試 auth

// ** 在 Firebase 載入時，立即執行初始化資料庫架構**
async function initializeDatabase() {
  try {
    const dbRef = ref(database, "/");
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
      console.log(" Firebase 資料庫為空，正在建立初始資料結構...");
      await update(dbRef, {
        會員資料: {
          範例資料: {
            會員編號: "001",
            會員姓名: "黃小名",
            會員暱稱: "小名",
            電子郵件: "D6YFg@example.com",
            會員密碼: "123456",
            會員頭像: "./URL",
            會員註冊日期: "2022-01-01",
            點數積分: 0,
          },
        },
        商品管理: {
          products: [
            {
              id: "1",
              name: "圓形便利貼",
              price: "150",
              image: "/src/assets/images/store/img_produc_01_01.jpg",
              favorite: false,
            },
          ],
        },
        照片管理: {
          範例資料: {
            照片編號: "001",
            用戶上傳的照片: "./URL",
            照片上傳時間: "2022-01-01",
            照片狀態: "審核通過",
            會員編號: "001",
            捷運路線編號: "R",
            捷運站編號: "1",
            捷運站名稱: "淡水站",
            捷運站點審核條件: "這是審核條件敘述",
          },
        },
      });
      console.log("初始資料結構建立完成！");
    } else {
      console.log("Firebase 資料已存在，檢查是否缺少部分節點...");

      const updates = {};

      const data = snapshot.val(); // 取得目前資料

      if (!data["會員資料"]) {
        updates["會員資料"] = {
          範例資料: {
            會員姓名: "黃小名",
            電子郵件: "D6YFg@example.com",
            會員頭像: "./URL",
            會員註冊日期: "2022-01-01",
            點數積分: 0,
          },
        };
      }

      if (!data["商品管理"]) {
        updates["商品管理"] = {
          products: [
            {
              id: "1",
              name: "圓形便利貼",
              price: "150",
              image: "/src/assets/images/store/img_produc_01_01.jpg",
              favorite: false,
            },
          ],
        };
      }

      if (!data["照片管理"]) {
        updates["照片管理"] = {
          範例資料: {
            照片編號: "001",
            用戶上傳的照片: "./URL",
            照片上傳時間: "2022-01-01",
            照片狀態: "審核通過",
            會員編號: "001",
            捷運路線編號: "R",
            捷運站編號: "1",
            捷運站名稱: "淡水站",
            捷運站點審核條件: "這是審核條件敘述",
          },
        };
      }

      if (Object.keys(updates).length > 0) {
        await update(dbRef, updates);
        console.log("缺少的資料已補充完成！");
      } else {
        console.log("所有必要資料都已存在！");
      }
    }
  } catch (error) {
    console.error("初始化資料庫錯誤:", error);
  }
}

// 立即執行初始化
initializeDatabase();

const provider = new GoogleAuthProvider();

export { auth, database, ref, set, get, onValue, remove, update, storage, provider, signInWithPopup, signOut,listAll, getDownloadURL,storageref,getMetadata};
