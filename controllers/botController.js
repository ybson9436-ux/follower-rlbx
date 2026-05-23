const noblox = require('noblox.js');
const botService = require('../services/botService');

let botStatus = {
  running: false,
  totalFollows: 0,
  successfulFollows: 0,
  failedFollows: 0,
  followers: []
};

exports.addFollow = async (req, res) => {
  try {
    const { username, botAccounts } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    botStatus.running = true;
    botStatus.totalFollows = botAccounts ? botAccounts.length : 1;

    // Iniciar automação em background
    botService.startFollowing(username, botAccounts).catch(err => {
      console.error('Erro na automação:', err);
      botStatus.running = false;
    });

    res.json({
      success: true,
      message: `Iniciando automação para ${username}`,
      status: botStatus
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStatus = (req, res) => {
  res.json(botStatus);
};

exports.getFollowers = (req, res) => {
  res.json({
    followers: botStatus.followers,
    total: botStatus.followers.length
  });
};
