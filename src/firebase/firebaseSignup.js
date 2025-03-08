import { database } from './firebaseConfig';
import { ref, set, push, get } from 'firebase/database';

/**
 * 生成下一個會員ID
 * @returns {Promise<string>} 會員ID，格式如 TID201001
 */
const generateMemberID = async () => {
    try {
      // 讀取當前計數器值
      const counterRef = ref(database, 'counters/memberIDCounter');
      const snapshot = await get(counterRef);
      
      let nextNumber = 1; // 默認從 001 開始
      if (snapshot.exists()) {
        nextNumber = snapshot.val() + 1;
      }
      
      // 更新計數器
      await set(counterRef, nextNumber);
      
      // 格式化為三位數字
      const formattedNumber = String(nextNumber).padStart(3, '0');
      return `TID201${formattedNumber}`;
    } catch (error) {
      console.error('生成會員ID時出錯:', error);
      throw error;
    }
  };
  
/**
 * 將用戶註冊資料保存到Firebase
 * @param {Object} userData - 用戶註冊數據，包含email, nickname, password
 * @returns {Promise} - 返回保存操作的Promise
 */
export const saveUserToFirebase = async (userData) => {
    try {
      // 生成會員ID
      const memberID = await generateMemberID();
      
      // 處理nickname為空的情況，並添加會員ID
      const userDataToSave = {
        ...userData,
        nickname: userData.nickname.trim() === '' ? 'null' : userData.nickname,
        memberID: memberID // 添加會員ID
      };
  
      // 生成一個唯一ID
      const userRef = ref(database, 'users');
      const newUserRef = push(userRef);
      
      // 保存用戶數據
      await set(newUserRef, userDataToSave);
      
      console.log('用戶數據已成功保存到Firebase，會員ID:', memberID);
      return { success: true, userId: newUserRef.key, memberID: memberID };
    } catch (error) {
      console.error('保存用戶數據時出錯:', error);
      return { success: false, error: error.message };
    }
  };