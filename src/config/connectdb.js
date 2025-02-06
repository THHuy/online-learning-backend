// config/db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'backend_online_learning'
});
connection.connect((err) => {
    if (err) {
        console.error('Lỗi 1 nối database: ' + err.stack);
        return;
    }
    console.log('Kết nối database thành công với ID là: ' + connection.threadId);
});
module.exports = connection;