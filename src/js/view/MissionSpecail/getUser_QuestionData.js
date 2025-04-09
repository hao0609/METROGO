import {
  database,
  ref as dbRef,
  update,
  get,
  set,
} from "@/firebase/firebaseConfig";

/**
 * 用戶上傳圖片後，將圖片網址 跟 審核狀態 更新到Firebase 會員資料表
 * @param {string} userid - 用戶ID
 * @param {string} line - 捷運路線
 * @param {boolean} isCorrect - 是否答題正確 (應為 true)

 */

export default async function getUser_QuestionData(
  userid,
  line,
  // station,
  isCorrect
  // updatetTime
) {
  console.log(`會員資料/${userid}/特殊任務遊戲進度/${line}/`);

  const DataRef = dbRef(
    database,
    `會員資料/${userid}/特殊任務遊戲進度/${line}/`
  );

  try {
    const snapshot = await get(DataRef);
    console.log("📦 是否存在？", snapshot.exists());

    if (!snapshot.exists()) {
      await set(DataRef, {
        問答狀態: isCorrect || false,
      });
      console.log("✅ 初始化問答資料成功");
    } else if (typeof isCorrect !== "undefined") {
      await update(DataRef, {
        問答狀態: isCorrect,
      });
      console.log(`✅ 更新問答狀態：${isCorrect}`);
    }

    const newSnapshot = await get(DataRef);
    return newSnapshot.exists() ? newSnapshot.val() : null;
  } catch (error) {
    console.error("❌ getUser_QuestionData 失敗:", error.message);
    return null;
  }
  //   if (snapshot.exists()) {
  //     // 更新用戶會員資料的照片狀態與照片網址
  //     await update(DataRef, {
  //       問答狀態: isCorrect, // 使用布林值 true
  //     });
  //     console.log(
  //       `已成功更新問答 URL: ${userid} 在${line}問答狀態${isCorrect}`
  //     );
  //   } else {
  //     console.log("找不到該用戶一般任務遊戲進度的資料");
  //   }
  // } catch (error) {
  //   console.error("更新用戶上傳照片資料到資料庫失敗:", error.message);
  // }
}
