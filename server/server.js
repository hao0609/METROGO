// 引入 Express.js 框架，用來建立 HTTP 伺服器。
const express = require('express');

// 引入 cors 模組，用來處理跨域請求
const cors = require('cors');

// 引入 Firebase Admin SDK，用來處理 Firebase Authentication 用戶管理
const admin = require('./firebase_admin');

// 建立 Express.js 的應用程式
const app = express();

// 設定 Port 為 3000
const PORT = 3000;

// 啟用 CORS，允許 Vite 的前端請求
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// 測試 API
app.get('/', (req, res) => {
    res.send('Express 伺服器運行中');
  });


// 刪除用戶 API 節點
// API URL : http://localhost:3000/delete-user/會員的ID

app.delete('/delete-user/:uid', async (req, res) => {
    const { uid } = req.params;
  
    try {
      // 使用 Firebase Admin SDK 刪除用戶
      await admin.auth().deleteUser(uid);
      console.log(`用戶 ${uid} 已刪除`);
      res.json({ message: `用戶 ${uid} 已成功刪除` });
    } catch (error) {
      console.error('刪除用戶失敗:', error);
      res.status(500).json({ error: '刪除用戶失敗', details: error.message });
    }
  });


// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Express 伺服器運行在 http://localhost:${PORT}`);
  });