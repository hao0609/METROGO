// useUserPoints.js
import { ref, onUnmounted } from "vue";
import { database, ref as dbRef, get } from "@/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useUserPoints() {
  const userPoints = ref(0);
  const auth = getAuth();

  const fetchPoints = async (uid) => {
    try {
      if (!uid) return 0;
      console.log("取得會員 UID:", uid);
      const pointsRef = dbRef(database, `會員資料/${uid}/點數積分`);
      const snapshot = await get(pointsRef);
      if (snapshot.exists()) {
        // console.log("點數資料:", snapshot.val());
        return snapshot.val(); // 確保返回的值是數字
      } else {
        // return 0; // 如果沒有點數資料，返回 0
      }
    } catch (error) {
      console.error("獲取會員點數失敗:", error);
      return 0; // 如果發生錯誤，返回 0
    }
  };

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      userPoints.value = await fetchPoints(user.uid);
      console.log("會員點數:", userPoints.value); // 打印數值
    } else {
      console.log("未登入");
      userPoints.value = 0; // 登出後設為 0
    }
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return { userPoints }; // 返回 userPoints 作為 ref
}
