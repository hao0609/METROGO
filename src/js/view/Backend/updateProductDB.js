/**
 * 更新現有商品
 * @param {Object} options - 更新選項
 * @returns {Promise<Object>} - 操作結果
 */
export const updateExistingProduct = async (options) => {
    const { 
        productId, 
        productData, 
        imageFile, 
        imageUrl,
        originalImageUrl,
        isPhotoDeleted 
    } = options;

    try {
        if (!productId) {
            return {
                success: false,
                message: '缺少商品ID',
                type: 'validation_error'
            };
        }

        if (!productData.name || !productData.price) {
            return {
                success: false,
                message: '商品名稱和價格為必填項',
                type: 'validation_error'
            };
        }

        // 準備更新的數據
        const updateData = {
            name: productData.name,
            intro: productData.intro || '',
            summary: productData.summary || '',
            spec: productData.spec || '', 
            price: productData.price,
            posted: new Date().toISOString().split('T')[0].replace(/-/g, '/') // 更新日期
        };

        // 處理圖片
        let newImageUrl = imageUrl;

        // 如果有新上傳的圖片
        if (imageFile) {
            // 上傳新圖片並獲取URL
            newImageUrl = await uploadProductImage(productId, imageFile);
        } 
        // 如果用戶刪除了圖片
        else if (isPhotoDeleted) {
            newImageUrl = '';
        }

        // 只有當圖片URL有變化時才更新
        if (newImageUrl !== originalImageUrl) {
            updateData.image = newImageUrl;
        }

        // 更新商品數據
        const productRef = dbRef(database, `商品管理/products/${productId}`);
        await update(productRef, updateData);

        return {
            success: true,
            message: '商品更新成功',
            productId: productId,
            productData: updateData
        };
    } catch (error) {
        console.error('更新商品失敗:', error);
        return {
            success: false,
            message: '更新商品時發生錯誤',
            error: error.message,
            type: 'unknown_error'
        };
    }
};import { database, ref as dbRef, update, get, set } from "@/firebase/firebaseConfig";
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
        'image/svg+xml',
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
 * 上傳商品圖片
 * @param {string} productId - 商品ID
 * @param {File} imageFile - 圖片文件
 * @returns {Promise<string|null>} - 圖片 URL 或 null
 */
export const uploadProductImage = async (productId, imageFile) => {
    try {
        // 嚴格驗證檔案和productId
        if (!productId || !isValidImageFile(imageFile)) {
            console.warn('上傳商品圖片失敗：無效的商品ID或檔案', {
                productId: !!productId,
                validFile: isValidImageFile(imageFile)
            });
            return null;
        }
        
        // 生成唯一的檔案名
        const fileExtension = imageFile.name.split('.').pop().toLowerCase() || 'jpg';
        const uniqueFileName = `img_produc_${productId}_${Date.now()}.${fileExtension}`;
        const storagePath = `product_photos/${uniqueFileName}`;
        
        // 上傳到 Firebase Storage
        const photoRef = storageRef(storage, storagePath);
        const snapshot = await uploadBytes(photoRef, imageFile);
        
        // 獲取下載 URL
        const imageURL = await getDownloadURL(snapshot.ref);
        
        return imageURL;
    } catch (error) {
        console.error('上傳商品圖片失敗:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        return null;
    }
};

/**
 * 獲取下一個可用的商品ID
 * @returns {Promise<string>} - 下一個可用的商品ID
 */
export const getNextProductId = async () => {
    try {
        const productsRef = dbRef(database, '商品管理/products');
        const snapshot = await get(productsRef);
        
        if (!snapshot.exists()) {
            return "1"; // 如果沒有商品，返回 "1" 作為第一個ID
        }
        
        const products = snapshot.val();
        
        // 從現有產品中找出最大的ID值
        let maxId = 0;
        for (const key in products) {
            const currentId = parseInt(key, 10);
            if (!isNaN(currentId) && currentId > maxId) {
                maxId = currentId;
            }
        }
        
        // 返回下一個ID (最大ID + 1)
        return String(maxId + 1);
    } catch (error) {
        console.error('獲取下一個商品ID失敗:', error);
        // 如果發生錯誤，使用當前時間戳作為ID (不推薦，但作為後備方案)
        return String(Date.now());
    }
};

/**
 * 新增商品到數據庫
 * @param {Object} productData - 商品數據
 * @param {File} imageFile - 商品圖片
 * @returns {Promise<Object>} - 操作結果
 */
export const addProduct = async (productData, imageFile) => {
    try {
      if (!productData.name || !productData.price) {
        return {
          success: false,
          message: '商品名稱和價格為必填項',
          type: 'validation_error'
        };
      }
      
      // 獲取下一個可用的商品ID
      const nextId = await getNextProductId();
      
      // 準備商品數據
      const formattedProduct = {
        id: nextId,
        name: productData.name,
        summary: productData.summary || '',  
        intro: productData.intro || '',  
        spec: productData.spec || '',
        price: productData.price,
        posted: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
        favorite: false
      };
      
      // 如果有圖片，上傳並添加URL
      if (imageFile) {
        const imageUrl = await uploadProductImage(nextId, imageFile);
        if (imageUrl) {
          formattedProduct.image = imageUrl;
        }
      }
      
      // 儲存商品數據到數據庫
      const productRef = dbRef(database, `商品管理/products/${nextId}`);
      await set(productRef, formattedProduct);
      
      return {
        success: true,
        message: '商品新增成功',
        productId: nextId,
        productData: formattedProduct
      };
    } catch (error) {
      console.error('新增商品失敗:', error);
      return {
        success: false,
        message: '新增商品時發生錯誤',
        error: error.message,
        type: 'unknown_error'
      };
    }
  };

/**
 * 處理商品數據新增和更新的整體流程
 * @param {Object} options - 商品數據和選項
 * @returns {Promise<Object>} - 操作結果
 */
export const handleProductUpdate = async (options) => {
    const { 
        productData, // 商品表單數據
        imageFile // 上傳的圖片文件
    } = options;

    try {
        // 驗證必要的商品數據
        if (!productData || !productData.name || !productData.price) {
            return {
                success: false,
                message: '缺少必要的商品信息',
                type: 'validation_error'
            };
        }

        // 驗證圖片
        if (!imageFile) {
            return {
                success: false,
                message: '請上傳商品圖片',
                type: 'validation_error'
            };
        }
        
        // 新增商品
        const result = await addProduct(productData, imageFile);
        
        return result;
    } catch (error) {
        console.error('處理商品更新失敗:', error);
        return {
            success: false,
            message: '更新商品時發生未知錯誤',
            type: 'unknown_error'
        };
    }
};

export default {
    uploadProductImage,
    getNextProductId,
    addProduct,
    handleProductUpdate,
    updateExistingProduct
};