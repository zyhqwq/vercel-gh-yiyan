const yiyanData = require('../yiyan.json');

module.exports = (req, res) => {
  // 设置响应头，允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // 获取查询参数
    const { format, tag } = req.query;

    // 随机选择一条一言
    const randomIndex = Math.floor(Math.random() * yiyanData.length);
    const randomItem = yiyanData[randomIndex];

    // 根据format参数决定返回格式
    if (format === 'json') {
      // 返回完整的JSON对象
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.send(JSON.stringify({ content: randomItem }, null, 2)); // 返回一个包含content字段的JSON对象
    } else {
      // 返回纯文本格式（默认）
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(randomItem); // 直接返回字符串
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