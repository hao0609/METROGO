const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk');


// 初始化 Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  module.exports = admin;