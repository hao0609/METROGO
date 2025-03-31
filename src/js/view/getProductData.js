import { database, ref, get } from "@/firebase/firebaseConfig";

/**
 * 從 Firebase 獲取所有商品資料
 * @returns {Promise<Array>} 商品資料陣列
 */
export const getAllProducts = async () => {
  try {
    console.log("嘗試從 Firebase 獲取商品資料...");
    // 檢查 database 是否已初始化
    if (!database) {
      console.error("Firebase database 未初始化");
      return getMockProducts();
    }

    // 嘗試不同的路徑來獲取商品資料
    let snapshot = null;
    const paths = [
      "products",
      "商品管理/products",
      "store/products",
      "products/data",
      "items",
      "商品",
      "product",
      "goods"
    ];
    
    // 依序嘗試所有可能的路徑
    for (const path of paths) {
      console.log(`嘗試路徑: ${path}`);
      const productRef = ref(database, path);
      try {
        snapshot = await get(productRef);
        if (snapshot.exists()) {
          console.log(`在路徑 '${path}' 找到資料`);
          break;
        }
      } catch (e) {
        console.log(`路徑 '${path}' 讀取錯誤: ${e.message}`);
      }
    }
    
    // 如果所有路徑都無法獲取資料，嘗試直接讀取整個資料庫根目錄
    if (!snapshot || !snapshot.exists()) {
      console.log("嘗試讀取資料庫根目錄...");
      const rootRef = ref(database, "/");
      try {
        snapshot = await get(rootRef);
        if (snapshot.exists()) {
          console.log("從根目錄找到資料，嘗試遍歷尋找商品資料");
          
          // 遍歷根目錄尋找可能的商品資料
          const data = snapshot.val();
          for (const key in data) {
            if (Array.isArray(data[key]) || typeof data[key] === 'object') {
              const possibleProducts = data[key];
              if (possibleProducts && Object.keys(possibleProducts).length > 0) {
                // 檢查是否像商品資料（判斷依據：包含價格或名稱字段）
                const sampleKey = Object.keys(possibleProducts)[0];
                const sampleItem = possibleProducts[sampleKey];
                
                if (sampleItem && (
                  sampleItem.price || sampleItem.Price || 
                  sampleItem.name || sampleItem.productName || sampleItem.ProductName || 
                  sampleItem.title || sampleItem.img || sampleItem.image
                )) {
                  console.log(`在路徑 '${key}' 找到可能的商品資料`);
                  snapshot = { 
                    val: () => possibleProducts,
                    exists: () => true
                  };
                  break;
                }
              }
            }
          }
        }
      } catch (e) {
        console.log(`讀取根目錄錯誤: ${e.message}`);
      }
    }
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("成功獲取商品資料:", data);
      
      // 將資料轉換成陣列，並處理欄位名稱映射
      const productsArray = Object.keys(data).map((key) => {
        const item = data[key];
        
        // 如果資料是從 Firebase 獲取的，獲取 posted 日期
        let posted = item.posted || null;
                    
        // 標準化欄位名稱，處理不同的欄位命名情況
        return {
          id: key,
          productName: item.name || item.ProductName || item.productName || item.title || '未命名商品',
          price: item.price || item.Price || 0,
          description: item.intro || item.description || item.Description || item.desc || '',
          summary: item.summary || item.Summary || '',
          imageUrl: item.image || item.img || item.imageUrl || item.ImageUrl || '',
          spec: item.spec || item.Spec || '',
          posted: posted, // 直接使用原始 posted 欄位
          ...item // 保留原始資料
        };
      });
      
      console.log("處理後的商品資料:", productsArray);
      return productsArray;
    } else {
      console.warn("所有嘗試的路徑均無商品資料");
      // 如果無法獲取真實資料，返回模擬資料以便測試
      return getMockProducts();
    }
  } catch (error) {
    console.error("獲取商品資料時發生錯誤:", error);
    // 返回模擬資料以便測試
    return getMockProducts();
  }
};

/**
 * 獲取最新的 N 筆商品資料
 * @param {number} count - 要獲取的商品數量
 * @returns {Promise<Array>} 排序後的最新商品資料陣列
 */
export const getLatestProducts = async (count = 4) => {
  try {
    console.log(`嘗試獲取最新的 ${count} 筆商品資料...`);
    const allProducts = await getAllProducts();
    
    if (allProducts.length === 0) {
      console.warn("無法獲取任何商品資料");
      return getMockProducts(count);
    }
    
    console.log("排序前的所有商品:", allProducts.map(p => ({
      name: p.name || p.productName || "未命名",
      posted: p.posted
    })));

    // 使用 posted 字段進行排序 (從新到舊)
    const sortedProducts = [...allProducts].sort((a, b) => {
      // 獲取 posted 值 (可能是字符串或時間戳)
      const postedA = a.posted || '';
      const postedB = b.posted || '';
      
      console.log(`比較: ${a.name || a.productName || '商品'} (${postedA}) vs ${b.name || b.productName || '商品'} (${postedB})`);
      
      // 如果都是字符串格式，直接比較字符串 (較新的日期字符串在字典排序中更大)
      if (typeof postedA === 'string' && typeof postedB === 'string') {
        return postedB.localeCompare(postedA); // 降序排列
      }
      
      // 如果是日期字符串，轉換為時間戳再比較
      let dateA = postedA;
      let dateB = postedB;
      
      if (typeof dateA === 'string') {
        try {
          // 嘗試解析日期字符串
          const parsedDate = new Date(dateA);
          dateA = parsedDate.getTime();
          console.log(`解析日期 A: "${postedA}" => ${parsedDate} (${dateA})`);
        } catch (e) {
          console.warn(`無法解析日期 A: "${postedA}"`, e);
          dateA = 0;
        }
      }
      
      if (typeof dateB === 'string') {
        try {
          // 嘗試解析日期字符串
          const parsedDate = new Date(dateB);
          dateB = parsedDate.getTime();
          console.log(`解析日期 B: "${postedB}" => ${parsedDate} (${dateB})`);
        } catch (e) {
          console.warn(`無法解析日期 B: "${postedB}"`, e);
          dateB = 0;
        }
      }
      
      // 數值比較 (較大的數值代表較新的日期)
      const result = dateB - dateA;
      console.log(`比較結果: ${result > 0 ? 'B較新' : (result < 0 ? 'A較新' : '相同')}`);
      return result;
    });
    
    console.log("排序後的商品順序:", sortedProducts.map(p => ({
      name: p.name || p.productName || "未命名",
      posted: p.posted
    })));
    
    // 返回指定數量的產品
    const result = sortedProducts.slice(0, count);
    console.log(`返回 ${result.length} 筆排序後的商品資料:`, result.map(p => p.name || p.productName || "未命名"));
    return result;
  } catch (error) {
    console.error("獲取最新商品資料時發生錯誤:", error);
    return getMockProducts(count);
  }
};

/**
 * 獲取模擬商品資料（當無法從 Firebase 獲取資料時使用）
 * @param {number} count - 要獲取的商品數量
 * @returns {Array} 模擬商品資料陣列
 */
const getMockProducts = (count = 4) => {
  console.log("使用模擬商品資料");
  const mockProducts = [
    {
      id: "product1",
      name: "風格T恤 (最新)",
      productName: "風格T恤",
      price: 450,
      description: "舒適透氣的經典T恤，適合各種場合穿著。",
      summary: "舒適經典款式",
      imageUrl: "/src/assets/images/T-shirt.png",
      posted: "2025/03/20"
    },
    {
      id: "product2",
      name: "特色馬克杯",
      productName: "特色馬克杯",
      price: 350,
      description: "精美設計的馬克杯，讓你的每一口飲品都充滿風味。",
      summary: "精美設計杯款",
      imageUrl: "/src/assets/images/cap.png",
      posted: "2025/02/15"
    },
    {
      id: "product3",
      name: "藝術明信片",
      productName: "藝術明信片",
      price: 150,
      description: "獨特設計的明信片，傳達你的心意與祝福。",
      summary: "獨特設計款式",
      imageUrl: "/src/assets/images/card.png",
      posted: "2025/01/10"
    },
    {
      id: "product4",
      name: "禮品卡套裝",
      productName: "禮品卡套裝",
      price: 250,
      description: "精美的禮品卡套裝，是送禮的完美選擇。",
      summary: "精緻禮品套裝",
      imageUrl: "/src/assets/images/card2.png",
      posted: "2024/12/20"
    }
  ];
  
  return mockProducts.slice(0, count);
};