import { database, ref as dbRef, update } from "@/firebase/firebaseConfig";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

// 初始化 Storage
const storage = getStorage();

/**
 * 驗證檔案是否為有效圖片
 * @param {File} file - 待檢查的檔案
 * @returns {boolean} - 是否為有效圖片
 */
const isValidImageFile = (file) => {
    if (!file) return false;
    
    // 檔案大小限制（例如：5MB）
    const MAX_FILE_SIZE = 5 * 1024 * 1024; 
    
    // 允許的圖片類型
    const ALLOWED_TYPES = [
        'image/jpeg', 
        'image/png', 
        'image/gif', 
        'image/webp',
        'image/svg+xml',  // 修改為 image/svg+xml
        'image/svg'
    ];

    console.log('檔案詳情:', {
        name: file.name,
        type: file.type,
        size: file.size
    });
    
    return (
        file instanceof File && 
        ALLOWED_TYPES.includes(file.type) && 
        file.size > 0 && 
        file.size <= MAX_FILE_SIZE
    );
};

/**
 * 更新用戶名稱
 * @param {string} uid - 用戶UID
 * @param {string} userName - 用戶名稱
 * @returns {Promise<boolean>} - 更新結果
 */
export const updateUserName = async (uid, userName) => {
    try {
        if (!uid || !userName || userName.trim() === "") {
            console.warn('更新用戶名稱失敗：無效的UID或名稱');
            return false;
        }
        
        const userRef = dbRef(database, `會員資料/${uid}`);
        await update(userRef, { '會員暱稱': userName.trim() });
        
        return true;
    } catch (error) {
        console.error('更新用戶名稱失敗:', error);
        return false;
    }
};

/**
 * 上傳用戶頭像
 * @param {string} uid - 用戶UID
 * @param {File} imageFile - 頭像文件
 * @returns {Promise<string|null>} - 頭像 URL 或 null
 */
export const uploadUserPhoto = async (uid, imageFile) => {
    try {
        // 嚴格驗證檔案和UID
        if (!uid || !isValidImageFile(imageFile)) {
            console.warn('上傳頭像失敗：無效的 UID 或檔案', {
                uid: !!uid,
                validFile: isValidImageFile(imageFile)
            });
            return null;
        }
        // 生成唯一的檔案名
        const fileExtension = imageFile.name.split('.').pop().toLowerCase() || 'jpg'; // 修正此行
        const uniqueFileName = `${uid}_${Date.now()}.${fileExtension}`;
        const storagePath = `user_photos/${uniqueFileName}`;
        
        // 上傳到 Firebase Storage
        const photoRef = storageRef(storage, storagePath);
        const snapshot = await uploadBytes(photoRef, imageFile);
        
        // 獲取下載 URL
        const photoURL = await getDownloadURL(snapshot.ref);
        
        /// 更新用戶資料庫
        const userRef = dbRef(database, `會員資料/${uid}`);
        await update(userRef, { '會員頭像': photoURL });
        
        return photoURL;
    } catch (error) {
        console.error('上傳用戶頭像失敗:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        return null;
    }
};

/**
 * 刪除用戶頭像
 * @param {string} uid - 用戶UID
 * @returns {Promise<boolean>} - 刪除結果
 */
export const deleteUserPhoto = async (uid) => {
    try {
        if (!uid) {
            console.warn('刪除用戶頭像失敗：無效的UID');
            return false;
        }
        
        const userRef = dbRef(database, `會員資料/${uid}`);
        await update(userRef, { '會員頭像': "" });
        
        return true;
    } catch (error) {
        console.error('刪除用戶頭像失敗:', error);
        return false;
    }
};

/**
 * 更新用戶資料（包括名稱和頭像）
 * @param {Object} userStatus - 用戶狀態
 * @param {string} userName - 用戶名稱
 * @param {File|null} imageFile - 頭像文件或 null
 * @param {boolean} deletePhoto - 是否需要刪除頭像
 * @returns {Promise<Object>} - 更新結果
 */
export const updateUserProfile = async (userStatus, userName, imageFile, deletePhoto = false) => {
    try {
        // 嚴格驗證用戶狀態
        if (!userStatus?.uid) {
            return {
                success: false,
                message: '用戶未登入或缺少 UID'
            };
        }
        
        const uid = userStatus.uid;
        const results = {};
        let hasChanges = false;
        
        // 更新名稱
        if (userName && userName.trim() !== "") {
            results.userNameUpdated = await updateUserName(uid, userName);
            hasChanges = hasChanges || results.userNameUpdated;
        }
        
        // 處理頭像
        if (deletePhoto) {
            results.photoDeleted = await deleteUserPhoto(uid);
            hasChanges = hasChanges || results.photoDeleted;
        } else if (imageFile) {
            const photoURL = await uploadUserPhoto(uid, imageFile);
            results.photoURL = photoURL;
            results.photoUpdated = !!photoURL;
            hasChanges = hasChanges || results.photoUpdated;
        }
        
        // 如果沒有任何變更，直接返回
        if (!hasChanges) {
            return {
                success: true,
                message: '無需更新',
                details: results
            };
        }
        
        return {
            success: true,
            message: '資料更新成功',
            details: results
        };
    } catch (error) {
        console.error('更新用戶資料時發生錯誤:', error);
        return {
            success: false,
            message: '更新資料時發生未知錯誤',
            error: error.message
        };
    }
};

/**
 * 處理用戶資料更新的整體流程
 * @param {Object} options - 更新選項
 * @returns {Promise<Object>} - 更新結果
 */
export const handleUserProfileUpdate = async (options) => {
    const { 
        userStatus, 
        userName, 
        imageFile, 
        photoUrl, 
        isPhotoDeleted 
    } = options;

    try {
        // 檢查用戶登入狀態
        if (!userStatus?.uid) {
            return {
                success: false,
                message: '用戶未登入',
                type: 'login_error'
            };
        }

        // 檢查是否有實質性變更
        const hasNameChange = userName && userName.trim() !== '';
        const hasPhotoChange = !!imageFile || isPhotoDeleted;

        // 如果沒有任何變更，直接返回
        if (!hasNameChange && !hasPhotoChange) {
            return {
                success: true,
                message: '無需更新',
                type: 'no_change'
            };
        }

        // 執行更新
        const result = await updateUserProfile(
            userStatus, 
            hasNameChange ? userName : '', 
            imageFile, 
            isPhotoDeleted
        );

        return {
            ...result,
            photoUrl: result.details?.photoURL || photoUrl
        };
    } catch (error) {
        console.error('用戶資料更新失敗:', error);
        return {
            success: false,
            message: '更新資料時發生未知錯誤',
            type: 'unknown_error'
        };
    }
};


export default {
    updateUserName,
    uploadUserPhoto,
    deleteUserPhoto,
    updateUserProfile,
    handleUserProfileUpdate
};