export const handleWebhook = (req: any, res: any) => {
  const token = process.env.TELEGRAM_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error('Telegram Bot Token is missing');
    return res.status(500).json({ error: 'Internal server error' });
  }
  console.log('Webhook received, token exists');
  res.status(200).json({ status: 'ok' }); // Mock-ответ
};