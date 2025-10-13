export default function handler(req, res) {
  // Устанавливаем CORS заголовки для работы с Telegram
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обработка preflight запросов
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  // Обработка POST запросов от Telegram
  if (req.method === 'POST') {
    const update = req.body;
    console.log('Received Telegram update:', JSON.stringify(update, null, 2));
    
    // Простая заглушка для начала
    return res.status(200).json({ 
      status: 'ok', 
      message: 'Webhook processed successfully',
      updateId: update.update_id,
      tokenExists: !!token
    });
  }
  
  // Обработка GET запросов (для проверки)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'ok', 
      message: 'Achieva Webhook endpoint is working',
      tokenExists: !!token,
      timestamp: new Date().toISOString(),
      project: 'Achieva - Telegram Mini App'
    });
  }
  
  // Метод не поддерживается
  return res.status(405).json({ error: 'Method not allowed' });
}
