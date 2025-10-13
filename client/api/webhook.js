export default function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  console.log('Webhook received, token exists');
  
  // Обработка POST запросов от Telegram
  if (req.method === 'POST') {
    const update = req.body;
    console.log('Received update:', update);
    
    // Простая заглушка для начала
    return res.status(200).json({ 
      status: 'ok', 
      message: 'Webhook processed successfully',
      updateId: update.update_id 
    });
  }
  
  // Обработка GET запросов (для проверки)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'ok', 
      message: 'Webhook endpoint is working',
      tokenExists: !!token 
    });
  }
  
  // Метод не поддерживается
  return res.status(405).json({ error: 'Method not allowed' });
}
