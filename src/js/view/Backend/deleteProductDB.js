import { database, ref as dbRef, remove, get } from "@/firebase/firebaseConfig";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

// 初始化 Storage
const storage = getStorage();

/**
 * 刪除商品圖片
 * @param {string} imageURL - 圖片URL
 * @returns {Promise<boolean>} - 操作結果
 */
const deleteProductImage = async (imageURL) => {
  if (!imageURL) return true; // 如果沒有圖片，視為成功

  try {
    // 從URL中提取檔案路徑
    // Firebase Storage URL格式: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[encoded_path]?alt=media&token=[token]
    const urlObj = new URL(imageURL);
    const pathWithQuery = urlObj.pathname.split('/o/')[1]; // 獲取 o/ 後面的部分
    if (!pathWithQuery) return false;
    
    // 解碼路徑並移除查詢參數
    const fullPath = decodeURIComponent(pathWithQuery);
    
    // 刪除圖片
    const imageRef = storageRef(storage, fullPath);
    await deleteObject(imageRef);
    
    return true;
  } catch (error) {
    console.error('刪除商品圖片失敗:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    return false;
  }
};

/**
 * 刪除商品
 * @param {string} productId - 商品ID
 * @returns {Promise<Object>} - 操作結果
 */
export const deleteProduct = async (productId) => {
  try {
    if (!productId) {
      return {
        success: false,
        message: '缺少商品ID',
        type: 'validation_error'
      };
    }
    
    // 先獲取商品資料，以獲取圖片URL
    const productRef = dbRef(database, `商品管理/products/${productId}`);
    const snapshot = await get(productRef);
    
    if (!snapshot.exists()) {
      return {
        success: false,
        message: '商品不存在',
        type: 'not_found'
      };
    }
    
    const productData = snapshot.val();
    
    // 刪除商品圖片（如果有的話）
    if (productData.image) {
      await deleteProductImage(productData.image);
    }
    
    // 刪除商品資料
    await remove(productRef);
    
    return {
      success: true,
      message: '商品刪除成功',
      productId: productId
    };
  } catch (error) {
    console.error('刪除商品失敗:', error);
    return {
      success: false,
      message: '刪除商品時發生錯誤',
      error: error.message,
      type: 'unknown_error'
    };
  }
};

export default {
  deleteProduct,
  deleteProductImage
};