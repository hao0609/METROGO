// src/js/view/Backend/getProductDB.js
import { database, ref as dbRef, get } from "@/firebase/firebaseConfig";

// 獲取單個商品資料的函數
export const fetchSingleProductData = async (productId, expectedName = null) => {
  try {
    console.log('=== 嘗試獲取商品資料 ===');
    console.log(`讀取的商品ID: ${productId}, 期望的商品名稱: ${expectedName}`);
    
    const safeProductId = String(productId);
    const productRef = dbRef(database, `商品管理/products/${safeProductId}`);
    
    const snapshot = await get(productRef);
    
    if (snapshot.exists()) {
      const productData = snapshot.val();
      console.log('從 Firebase 獲取到的商品數據:', productData);
      
      // 驗證獲取到的商品是否與預期一致
      if (expectedName && productData.name !== expectedName) {
        console.warn(`獲取到的商品名稱 "${productData.name}" 與預期的 "${expectedName}" 不符`);
      }
      
      return productData;
    } else {
      console.warn(`找不到指定ID的商品: ${safeProductId}`);
      return null;
    }
  } catch (error) {
    console.error('獲取商品資料時發生錯誤:', error);
    return null;
  }
};

// 驗證獲取的數據是否正確的函數
export const validateProductData = (productForm, productId) => {
  const expectedName = localStorage.getItem('expectedProductName');
  const expectedID = localStorage.getItem('expectedProductID');
  
  const isNameMatch = expectedName && productForm.value.name === expectedName;
  const isIDMatch = expectedID && productId.value === expectedID;
  
  console.log(`驗證結果: 名稱匹配=${isNameMatch}, ID匹配=${isIDMatch}`);
  console.log(`期望名稱="${expectedName}", 實際名稱="${productForm.value.name}"`);
  console.log(`期望ID="${expectedID}", 實際ID="${productId.value}"`);
  
  // 清除localStorage中的驗證數據
  localStorage.removeItem('expectedProductName');
  localStorage.removeItem('expectedProductID');
  
  return isNameMatch && isIDMatch;
};

// 填充表單的函數
export const fillProductForm = (productFormRef, photoUrlRef, photoStatusRef, productData) => {
    productFormRef.value.name = productData.name || '';
    productFormRef.value.summary = productData.summary || ''; 
    productFormRef.value.intro = productData.intro || ''; 
    productFormRef.value.spec = productData.spec || ''; 
    productFormRef.value.price = productData.price || '';
    
    // 處理照片邏輯
    if (productData.image) {
      photoUrlRef.value = productData.image;
      photoStatusRef.value = 'uploaded';
      console.log(`設置商品圖片: ${photoUrlRef.value}`);
    } else {
      photoStatusRef.value = 'nophoto';
      console.log('商品無圖片，設置為 nophoto 狀態');
    }
  };

// 處理商品資料的函數
export const processProductData = (productDataObj) => {
  if (!productDataObj) return [];

  const productsList = Object.entries(productDataObj).map(([key, value]) => ({
    id: key,
    name: value.name || '',
    price: value.price || '',
    posted: value.posted || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
    ...value
  }));

  // 排序：按照 id 由小到大排序（數字排序）
  return productsList.sort((a, b) => {
    const idA = parseInt(a.id, 10);
    const idB = parseInt(b.id, 10);
    
    if (!isNaN(idA) && !isNaN(idB)) {
      return idA - idB;
    } else {
      return a.id.localeCompare(b.id);
    }
  });
};

// 搜索商品的函數
export const searchProducts = (products, query) => {
  if (!query) return products;
  
  const lowercaseQuery = query.trim().toLowerCase();
  
  return products.filter(product =>
    Object.values(product).some(value =>
      String(value).toLowerCase().includes(lowercaseQuery)
    )
  );
};

// 篩選商品的函數
export const filterProducts = (products, filters = {}) => {
  return products.filter(product => {
    if (filters.minPrice && parseFloat(product.price) < filters.minPrice) return false;
    if (filters.maxPrice && parseFloat(product.price) > filters.maxPrice) return false;
    return true;
  });
};