// 載入 dotenv 並根據環境變數載入對應的 .env 檔案 (根據 NODE_ENV 的值，預設是 development)
// run dev/build 時配置對應的前端 URL 與 後端 URL

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});


// 引入 Express.js 框架，用來建立 HTTP 伺服器。
const express = require('express');

// 引入 cors 模組，用來處理跨域請求
const cors = require('cors');

const path = require('path');

// 引入 Firebase Admin SDK，用來處理 Firebase Authentication 用戶管理
const admin = require('./firebase_admin');

// 建立 Express.js 的應用程式
const app = express();

// 設定 Port 為 3000
const PORT = process.env.PORT || 3000;


// 使用環境變數來決定前端 URL
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;


// 啟用 CORS，允許來自指定前端的請求
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());


// ✅ 提供靜態資源 (前端打包後的 Vue 頁面)
app.use(express.static(path.resolve(__dirname, 'dist')));


// 測試 API
app.get('/api', (req, res) => {
    res.send('Express 伺服器運行中');
  });


// 刪除用戶 API 節點
// API URL : http://localhost:3000/delete-user/會員的ID

// app.delete('/delete-user/:uid', async (req, res) => {
app.delete('/api/delete-user/:uid', async (req, res) => {
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

// ✅ 捕捉所有非 API 的路由，並回傳 index.html (支援 Vue 的前端路由)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Express 伺服器運行在 ${BACKEND_URL || `http://localhost:${PORT}`}`);
  });