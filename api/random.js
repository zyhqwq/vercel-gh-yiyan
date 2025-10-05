const yiyanData = require('../yiyan.json');

module.exports = (req, res) => {
  // 设置响应头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // 获取查询参数
    const { format, tag } = req.query;
    
    // 根据标签过滤数据（如果提供了tag参数）
    let filteredData = yiyanData;
    if (tag) {
      filteredData = yiyanData.filter(item => {
        // 检查item是否有tags数组，并且该数组包含查询的tag
        return item.tags && item.tags.includes(tag);
      });
      
      // 如果没有找到匹配的结果
      if (filteredData.length === 0) {
        if (format === 'json') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.status(404).json({ 
            error: '未找到匹配标签的一言',
            tag: tag
          });
        } else {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.status(404).send(`未找到标签为 "${tag}" 的一言`);
        }
      }
    }
    
    // 随机选择一条一言
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const randomItem = filteredData[randomIndex];
    
    // 根据format参数决定返回格式
    if (format === 'json') {
      // 返回完整的JSON对象
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(JSON.stringify(randomItem, null, 2));
    } else {
      // 返回纯文本格式（默认）
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      
      // 构建返回的文本格式
      let result = randomItem.content;
      
      // 如果有作者，添加作者信息
      if (randomItem.author) {
        result += ` —— ${randomItem.author}`;
      }
      
      // 返回纯文本格式的随机一言
      res.send(result);
    }
    
  } catch (error) {
    console.error('Error:', error);
    
    // 根据请求的格式返回错误信息
    if (req.query.format === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.status(500).json({ error: '服务器内部错误' });
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(500).send('服务器内部错误');
    }
  }
};