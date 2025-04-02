import {storage,  storageref, listAll, getDownloadURL,getMetadata} from '../../firebase/firebaseConfig'

/**
 * 獲取用戶在 storage 中的所有圖片資料
 * @param {string} uid - 用戶UID
 * @returns {Object} - 用戶在 storage 中的所有圖片資料
 */

export const getUserAllPhotoData = async (uid) => {

    console.log(uid);
    
    // 用戶圖片資料的路徑
    const storageRef = storageref(storage, `photos/${uid}`);

    try {
        const result = await listAll(storageRef);
        console.log(result);


        // 使用 Promise.all 並行處理每個項目
        const fileData = await Promise.all(result.items.map(async (item) => {
            const [url, metadata] = await Promise.all([
                getDownloadURL(item),    // 取得圖片 URL
                getMetadata(item)        // 取得檔案的 metadata (圖片詳細資訊)
            ]);

            return {
                filename: metadata.name,
                downloadURL: url,
                timeCreated: metadata.timeCreated
            };
        }));

        console.log('File Data:', fileData);
        return fileData;
        
    } catch (error) {
        console.error('Error fetching file data:', error);
        return [];
        
    }
}
