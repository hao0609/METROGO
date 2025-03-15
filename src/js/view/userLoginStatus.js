import { ref, onMounted, onUnmounted } from "vue";
import { auth } from "../../firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";

export function userLoginStatus() {
    
    const user = ref(null);


    let unsubscribe = null; //用來存取消監聽的方法

  // 監聽 Firebase Authentication 用戶登入狀態變化
 
    onMounted(() => {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
        console.log("🔹 用戶狀態變更:", user.value);
        });
    });

  // 組件銷毀時取消監聽，避免記憶體洩漏
  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return { user };
}