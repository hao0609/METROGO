// src/js/view/signout.js

import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";



export const logoutUser = async () =>{
    let logout_success = false
    try {
      await signOut(auth);
      console.log("✅ 用戶已成功登出");
      logout_success = true

    } catch (error) {
      console.error("❌ 登出失敗:", error.message);
      logout_success = false
    }

    return logout_success
  }