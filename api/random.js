const yiyanData = require('../yiyan.json');

module.exports = (req, res) => {
  // 设置响应头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  try {
    // 随机选择一条一言
    const randomIndex = Math.floor(Math.random() * yiyanData.length);
    const randomItem = yiyanData[randomIndex];
    
    // 构建返回的文本格式
    let result = randomItem.content;
    
    // 如果有作者，添加作者信息
    if (randomItem.author) {
      result += ` —— ${randomItem.author}`;
    }
    
    // 如果有出处，添加出处信息（可选，根据您的需求）
    // if (randomItem.from) {
    //   result += `《${randomItem.from}》`;
    // }
    
    // 返回纯文本格式的随机一言
    res.send(result);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('服务器内部错误');
  }
};