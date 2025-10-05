// 引入本地的数据文件
const yiyanData = require('./yiyan.json');

module.exports = (req, res) => {
  // 设置响应头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // 将字符串按逗号分割成数组
  const quotesArray = yiyanData.split(',');
  // 随机选择一条
  const randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
  
  // 返回随机一言
  res.send(randomQuote);
};