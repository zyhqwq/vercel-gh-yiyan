const yiyanData = require('../yiyan.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  const randomIndex = Math.floor(Math.random() * yiyanData.length);
  const randomQuote = yiyanData[randomIndex];
  
  res.send(randomQuote);
};