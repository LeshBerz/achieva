module.exports = (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Achieva webhook working',
    timestamp: new Date().toISOString()
  });
};
