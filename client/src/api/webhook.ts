export const handleWebhook = (_req: any, res: any) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    return res.status(500).json({ error: 'Internal server error' });
  }
  console.log('Webhook received, token exists');
  res.status(200).json({ status: 'ok', tokenExists: !!token });
};