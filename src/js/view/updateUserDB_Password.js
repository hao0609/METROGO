import { database, ref as dbRef, update } from "@/firebase/firebaseConfig";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

/**
 * 驗證密碼格式是否符合要求
 * @param {string} password - 待驗證的密碼 
 * @returns {boolean} - 驗證結果，true 為通過，false 為不通過
 */
const validatePasswordFormat = (password) => {
    // 檢查密碼是否只包含英數字和特殊符號
    const regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    return regex.test(password);
};

/**
 * 驗證密碼長度是否符合要求（至少 6 個字符）
 * @param {string} password - 待驗證的密碼
 * @returns {boolean} - 驗證結果，true 為通過，false 為不通過
 */
const validatePasswordLength = (password) => {
    return password && password.length >= 6;
};

/**
 * 更新 Firebase Authentication 中的用戶密碼
 * @param {string} newPassword - 新密碼
 * @returns {Promise<Object>} - 更新結果
 */
const updateAuthPassword = async (newPassword) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            return {
                success: false,
                message: '用戶未登入 Authentication',
                type: 'auth_error'
            };
        }
        
        // 更新 Firebase Authentication 的密碼
        await updatePassword(user, newPassword);
        
        return {
            success: true,
            message: 'Authentication 密碼更新成功',
            type: 'success'
        };
    } catch (error) {
        console.error('更新 Authentication 密碼時發生錯誤:', error);
        
        // 處理需要重新驗證的情況
        if (error.code === 'auth/requires-recent-login') {
            return {
                success: false,
                message: '需要重新登入以更新密碼',
                type: 'auth_requires_recent_login'
            };
        }
        
        return {
            success: false,
            message: `Authentication 密碼更新失敗: ${error.message}`,
            type: 'auth_update_error',
            error: error
        };
    }
};

/**
 * 更新用戶密碼
 * @param {Object} userStatus - 用戶狀態
 * @param {string} newPassword - 新密碼
 * @returns {Promise<Object>} - 更新結果
 */
export const updateUserPassword = async (userStatus, newPassword) => {
    try {
        // 驗證用戶是否已登入
        if (!userStatus?.uid) {
            console.warn('更新密碼失敗：用戶未登入');
            return {
                success: false,
                message: '用戶未登入',
                type: 'auth_error'
            };
        }

        // 驗證密碼不能為空
        if (!newPassword || newPassword.trim() === '') {
            return {
                success: false,
                message: '請輸入新密碼',
                type: 'validation_error'
            };
        }

        // 驗證密碼長度
        if (!validatePasswordLength(newPassword)) {
            return {
                success: false,
                message: '密碼需大於 6 個字符',
                type: 'length_error'
            };
        }

        // 驗證密碼格式
        if (!validatePasswordFormat(newPassword)) {
            return {
                success: false,
                message: '密碼格式不符',
                type: 'format_error'
            };
        }

        // 獲取用戶的UID
        const uid = userStatus.uid;

        // 參考用戶在資料庫中的路徑
        const userRef = dbRef(database, `會員資料/${uid}`);

        // 1. 先嘗試更新 Authentication 的密碼
        const authUpdateResult = await updateAuthPassword(newPassword);
        
        // 如果 Authentication 更新失敗，則不更新 Realtime Database
        if (!authUpdateResult.success) {
            // 對於需要重新登入的特殊情況，提供明確的提示
            if (authUpdateResult.type === 'auth_requires_recent_login') {
                return {
                    success: false,
                    message: '需要重新登入後再更新密碼',
                    type: 'auth_requires_recent_login'
                };
            }
            
            // 其他 Authentication 更新失敗的情況
            return authUpdateResult;
        }

        // 2. 只有當 Authentication 更新成功後，才更新 Realtime Database
        await update(userRef, { '會員密碼': newPassword });
        
        console.log('密碼更新成功（Authentication 和 Database）');
        
        // 返回成功結果
        return {
            success: true,
            message: '密碼更新成功',
            type: 'success'
        };
    } catch (error) {
        // 記錄錯誤並返回失敗結果
        console.error('更新密碼時發生錯誤:', error);
        return {
            success: false,
            message: '密碼更新失敗',
            type: 'unknown_error',
            error: error.message
        };
    }
};

/**
 * 處理密碼更新的整體流程
 * @param {Object} userStatus - 用戶狀態
 * @param {string} newPassword - 新密碼
 * @param {string} confirmPassword - 確認密碼
 * @returns {Promise<Object>} - 更新結果
 */
export const handlePasswordUpdate = async (userStatus, newPassword, confirmPassword) => {
    try {
        // 檢查用戶登入狀態
        if (!userStatus?.uid) {
            return {
                success: false,
                message: '用戶未登入',
                type: 'auth_error'
            };
        }

        // 檢查新密碼是否為空
        if (!newPassword || newPassword.trim() === '') {
            return {
                success: false,
                message: '請輸入新密碼',
                type: 'validation_error',
                field: 'newPassword'
            };
        }

        // 檢查新密碼長度
        if (!validatePasswordLength(newPassword)) {
            return {
                success: false,
                message: '密碼需大於 6 個字符',
                type: 'length_error',
                field: 'newPassword'
            };
        }

        // 檢查新密碼格式
        if (!validatePasswordFormat(newPassword)) {
            return {
                success: false,
                message: '密碼格式不符',
                type: 'format_error',
                field: 'newPassword'
            };
        }

        // 檢查確認密碼是否為空
        if (!confirmPassword || confirmPassword.trim() === '') {
            return {
                success: false,
                message: '請輸入新密碼',
                type: 'validation_error',
                field: 'confirmPassword'
            };
        }

        // 檢查確認密碼長度
        if (!validatePasswordLength(confirmPassword)) {
            return {
                success: false,
                message: '密碼需大於 6 個字符',
                type: 'length_error',
                field: 'confirmPassword'
            };
        }

        // 檢查確認密碼格式
        if (!validatePasswordFormat(confirmPassword)) {
            return {
                success: false,
                message: '密碼格式不符',
                type: 'format_error',
                field: 'confirmPassword'
            };
        }

        // 檢查密碼是否一致
        if (newPassword !== confirmPassword) {
            return {
                success: false,
                message: '密碼與確認密碼不符',
                type: 'match_error'
            };
        }

        // 調用更新密碼函數
        const result = await updateUserPassword(userStatus, newPassword);
        return result;
    } catch (error) {
        console.error('處理密碼更新時發生錯誤:', error);
        return {
            success: false,
            message: '密碼更新處理失敗',
            type: 'unknown_error'
        };
    }
};

/**
 * 重新驗證用戶以更新密碼
 * @param {string} email - 用戶電子郵件
 * @param {string} currentPassword - 當前密碼
 * @returns {Promise<Object>} - 重新驗證結果
 */
export const reauthenticateUser = async (email, currentPassword) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            return {
                success: false,
                message: '用戶未登入',
                type: 'auth_error'
            };
        }
        
        // 創建憑證
        const credential = EmailAuthProvider.credential(email, currentPassword);
        
        // 重新驗證用戶
        await reauthenticateWithCredential(user, credential);
        
        return {
            success: true,
            message: '重新驗證成功',
            type: 'success'
        };
    } catch (error) {
        console.error('重新驗證用戶時發生錯誤:', error);
        return {
            success: false,
            message: '重新驗證失敗，請確認當前密碼是否正確',
            type: 'auth_error',
            error: error
        };
    }
};

// 導出函數
export { validatePasswordFormat, validatePasswordLength };