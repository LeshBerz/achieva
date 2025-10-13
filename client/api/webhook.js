module.exports = (req, res) => {
  console.log('Webhook called');
  res.status(200).json({ 
    status: 'ok', 
    message: 'Achieva webhook working',
    timestamp: new Date().toISOString()
  });
};
