// Простая тестовая версия webhook для отладки
module.exports = function handler(req, res) {
  console.log('Webhook called with method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  // Простой ответ для всех запросов
  res.status(200).json({
    status: 'ok',
    message: 'Achieva webhook is working',
    method: req.method,
    timestamp: new Date().toISOString(),
    tokenExists: !!process.env.TELEGRAM_BOT_TOKEN
  });
};
