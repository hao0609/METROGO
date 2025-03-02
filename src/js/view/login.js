// loginUtils.js
// 包含登入表單的相關功能和操作

/**
 * 初始化密碼可見性狀態
 * @returns {Object} 密碼可見性的初始狀態
 */
export const initPasswordVisibility = () => {
    return {
      login: false,
      signup: false,
      signupConfirm: false,
      forgotpw: false,
      forgotpwConfirm: false
    };
  };
  
  /**
   * 初始化登入表單數據
   * @returns {Object} 登入表單的初始狀態
   */
  export const initLoginData = () => {
    return {
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      emailErrorMsg: '請輸入正確的信箱格式',
      passwordErrorMsg: '請輸入密碼'
    };
  };
  
  /**
   * 初始化忘記密碼表單數據
   * @returns {Object} 忘記密碼表單的初始狀態
   */
  export const initForgotPasswordData = () => {
    return {
      email: '',
      verificationCode: '',
      newPassword: '',
      confirmPassword: '',
      isEmailValid: true,
      isCodeValid: true,
      isPasswordValid: true,
      isPasswordMatched: true,
      emailErrorMsg: '請輸入正確的信箱格式',
      codeErrorMsg: '請輸入正確的驗證碼',
      passwordErrorMsg: '密碼需至少包含8個字元',
      passwordMatchErrorMsg: '密碼與確認密碼不符'
    };
  };
  
  /**
   * 重置密碼可見性狀態
   * @param {Object} passwordVisibility - 密碼可見性狀態對象
   */
  export const resetPasswordVisibility = (passwordVisibility) => {
    const initial = initPasswordVisibility();
    Object.keys(initial).forEach(key => {
      passwordVisibility[key] = initial[key];
    });
  };
  
  /**
   * 重置登入表單數據
   * @param {Object} loginData - 登入表單數據
   */
  export const resetLoginData = (loginData) => {
    const initial = initLoginData();
    Object.keys(initial).forEach(key => {
      loginData[key] = initial[key];
    });
  };
  export const validateLoginForm = (loginData) => {
    let isValid = true;
    
    // 驗證電子信箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    loginData.isEmailValid = emailRegex.test(loginData.email);
    if (!loginData.isEmailValid) {
      isValid = false;
    }
    
    // 驗證密碼 (簡單檢查非空)
    loginData.isPasswordValid = !!loginData.password;
    if (!loginData.isPasswordValid && loginData.password === '') {
      isValid = false;
    }
    
    return isValid;
  };