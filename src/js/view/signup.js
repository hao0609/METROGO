// src/js/view/signup.js

// 註冊送出後上傳 firebase
import { saveUserToFirebase } from '@/firebase/firebaseSignup';






/**
 * 初始化註冊表單的資料結構
 * @returns {Object} 註冊表單的初始狀態
 */
export const initSignupData = () => {
  return {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    isEmailValid: true,
    isPasswordValid: true,
    isPasswordMatched: true,
    emailErrorMsg: '電子信箱格式不正確',
    passwordErrorMsg: '請輸入密碼',
    passwordMatchErrorMsg: '密碼與確認密碼不符'
  };
};

/**
 * 驗證電子信箱格式
 * @param {string} email - 要驗證的電子信箱
 * @returns {boolean} 電子信箱是否有效
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 驗證密碼強度
 * @param {string} password - 要驗證的密碼
 * @returns {boolean} 密碼是否符合強度要求
 */
export const validatePassword = (password) => {
  // 簡單檢查密碼是否有值
  return !!password;
};

/**
 * 檢查兩個密碼是否匹配
 * @param {string} password - 原始密碼
 * @param {string} confirmPassword - 確認密碼
 * @returns {boolean} 兩個密碼是否匹配
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * 驗證註冊表單
 * @param {Object} signupData - 註冊表單數據
 * @returns {boolean} 表單是否全部有效
 */
export const validateSignupForm = (signupData) => {
  let isValid = true;
  
  // 驗證電子信箱
  signupData.isEmailValid = validateEmail(signupData.email);
  if (!signupData.isEmailValid) {
    isValid = false;
  }
  
  // 驗證密碼強度
  signupData.isPasswordValid = !!signupData.password;
  if (!signupData.isPasswordValid) {
    isValid = false;
  }
  
  // 驗證密碼匹配
  signupData.isPasswordMatched = passwordsMatch(signupData.password, signupData.confirmPassword);
  if (!signupData.isPasswordMatched) {
    isValid = false;
  }
  
  return isValid;
};

/**
 * 表單重置
 * @param {Object} signupData - 註冊表單數據
 */
export const resetSignupForm = (signupData) => {
  const initialData = initSignupData();
  Object.keys(initialData).forEach(key => {
    signupData[key] = initialData[key];
  });
};

/**
 * 處理註冊並保存數據到Firebase
 * @param {Object} signupData - 註冊表單數據
 * @param {string} userUID - 用戶UID
 * @returns {Promise} 返回包含註冊結果的Promise
 */
export const handleSignupAndSaveToFirebase = async (signupData,userUID) => {
    try {
      // 準備要保存的用戶數據
      const userData = {
        email: signupData.email,
        nickname: signupData.nickname || 'null', // 如果nickname為空，保存為'null'
        password: signupData.password
      };

    // 保存數據到Firebase
    const result = await saveUserToFirebase(userData, userUID);
    
    if (result.success) {

        console.log('用戶註冊成功並保存到Firebase, userId:', result.userId);

        return { 
          success: true, 
          userId: result.userId,
          memberID: result.userId  //memberID 修改為直接使用 userId
        };
      } else {
        console.error('保存用戶數據時出錯:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('註冊過程中出錯:', error);
      return { success: false, error: error.message };
    }
  };