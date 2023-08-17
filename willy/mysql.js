// 引入所需的模块
const express = require('express');
const mysql = require('mysql');

// 创建Express应用
const app = express();

// MySQL数据库连接配置
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败：', err.stack);
    return;
  }
  console.log('数据库连接成功，连接ID：', connection.threadId);
});

// 创建路由，处理对根路径的请求
app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    const solution = results[0].solution;
    res.send(`The solution is: ${solution}`);
  });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`服务器正在运行于 http://localhost:${port}`);
});
