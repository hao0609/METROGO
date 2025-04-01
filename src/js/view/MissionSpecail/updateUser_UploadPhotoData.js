import { database, ref as dbRef, update,get } from "@/firebase/firebaseConfig";

/**
 * 用戶上傳圖片後，將圖片網址 跟 審核狀態 更新到Firebase 會員資料表
 * @param {string} userid - 用戶ID 
 * @param {string} line - 捷運路線 
 * @param {string} station - 捷運站名
 * @param {string} uploadPhotoURL - 圖片 URL 
 * @param {string} updatetTime - 圖片 URL 
 */

export default async function updateUser_UploadPhotoData (userid,line,station,uploadPhotoURL,updatetTime){

    // console.log(userid,line,station,uploadPhotoURL);

    let stationName = station;

    if (station !== "台北車站" && station.endsWith("站")) {
    stationName = station.slice(0, -1); // 移除最後一個字（"站"）
    }
    
    console.log(`會員資料/${userid}/特殊任務遊戲進度/${line}/${stationName}`);
    
    
    const DataRef = dbRef(database, `會員資料/${userid}/特殊任務遊戲進度/${line}/${stationName}`);

    try {

        const snapshot = await get(DataRef);

        console.log(snapshot.exists());
        

        if (snapshot.exists()) {

            // 更新用戶會員資料的照片狀態與照片網址
            await update(DataRef, {照片狀態: "審核中", 目前照片URL: uploadPhotoURL,上傳時間: updatetTime});
            console.log(`已成功更新圖片 URL: ${uploadPhotoURL} 到會員-${line}-${stationName} 的目前網址中與照片狀態`);
        } else {
            console.log("找不到該用戶一般任務遊戲進度的資料");
          }
        
    } catch (error) {
        console.error("更新用戶上傳照片資料到資料庫失敗:", error.message);
    }

}

