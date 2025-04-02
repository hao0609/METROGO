// checkUserDB_UserProfile.js

// 引入獲取用戶積分的函數
import GetUserPoint from '@/js/view/MissionGeralView/checkUserDB_TotalPoint';
import { database, get, ref as dbRef } from "@/firebase/firebaseConfig";

/**
 * 獲取用戶積分
 * @param {string} uid - 用戶UID
 * @returns {Promise<string|number>} - 用戶積分或顯示符號
 */
export const fetchUserPoints = async (uid) => {
    try {
        if (!uid) {
            console.log('未提供用戶UID');
            return "--";
        }
        
        console.log('獲取用戶積分, UID:', uid);
        // 使用 GetUserPoint 函數獲取用戶積分
        const points = await GetUserPoint(uid);
        
        if (points !== null) {
            console.log('獲取用戶積分成功:', points);
            return points;
        } else {
            console.log('未獲取到用戶積分');
            return "--";
        }
    } catch (error) {
        console.error('獲取用戶積分失敗:', error);
        return "--";
    }
};

/**
 * 獲取用戶基本信息
 * @param {string} uid - 用戶UID
 * @returns {Promise<Object>} - 包含用戶信息的對象
 */
export const fetchUserBasicInfo = async (uid) => {
    try {
        if (!uid) {
            console.log('未提供用戶UID');
            return null;
        }
        
        console.log('獲取用戶基本信息, UID:', uid);
        const userRef = dbRef(database, `會員資料/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
            console.log('獲取用戶基本信息成功');
            return snapshot.val();
        } else {
            console.log('未找到用戶信息');
            return null;
        }
    } catch (error) {
        console.error('獲取用戶基本信息失敗:', error);
        return null;
    }
};

/**
 * 整合獲取用戶所有信息
 * @param {Object} userStatus - 用戶狀態對象
 * @returns {Promise<Object>} - 包含用戶所有信息的對象
 */
export const getUserProfile = async (userStatus) => {
    try {
        if (!userStatus) {
            console.log('用戶未登入');
            return {
                points: "--",
                userName: "",
                email: "",
                userPhoto: "",
                // 其他默認值...
            };
        }
        
        // 並行獲取用戶積分和基本信息
        const [points, basicInfo] = await Promise.all([
            fetchUserPoints(userStatus.uid),
            fetchUserBasicInfo(userStatus.uid)
        ]);

        return {
            points: points,
            userName: basicInfo?.['會員暱稱'] || "",
            email: basicInfo?.['電子郵件'] || userStatus.email || "",
            userPhoto: basicInfo?.['會員頭像'] || userStatus.userPhoto || "",
            // 可以添加更多用戶信息字段...
        };
    } catch (error) {
        console.error('獲取用戶信息過程發生錯誤:', error);
        return {
            points: "--",
            userName: "",
            email: "",
            userPhoto: "",
            // 其他默認值...
        };
    }
};

export default {
    fetchUserPoints,
    fetchUserBasicInfo,
    getUserProfile
};