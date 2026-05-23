const noblox = require('noblox.js');

const botAccounts = [
  {
    username: process.env.BOT_USERNAME_1,
    password: process.env.BOT_PASSWORD_1
  },
  {
    username: process.env.BOT_USERNAME_2,
    password: process.env.BOT_PASSWORD_2
  }
  // Adicione mais contas conforme necessário
];

async function loginBot(account) {
  try {
    await noblox.login({
      username: account.username,
      password: account.password
    });
    return true;
  } catch (error) {
    console.error(`Erro ao fazer login em ${account.username}:`, error);
    return false;
  }
}

async function followUser(userId) {
  try {
    await noblox.followUser(userId);
    return { success: true, userId };
  } catch (error) {
    console.error(`Erro ao seguir usuário ${userId}:`, error);
    return { success: false, userId, error: error.message };
  }
}

async function startFollowing(username, customBotAccounts = null) {
  try {
    // Obter ID do usuário pelo username
    const userId = await noblox.getIdFromUsername(username);
    
    if (!userId) {
      throw new Error(`Usuário ${username} não encontrado`);
    }

    const accountsToUse = customBotAccounts || botAccounts;
    const results = [];

    for (const account of accountsToUse) {
      try {
        // Login com conta do bot
        const loggedIn = await loginBot(account);
        
        if (loggedIn) {
          // Seguir o usuário
          const result = await followUser(userId);
          results.push({
            botAccount: account.username,
            ...result
          });

          // Delay para evitar rate limit
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Erro com conta ${account.username}:`, error);
        results.push({
          botAccount: account.username,
          success: false,
          error: error.message
        });
      }
    }

    console.log('Resultados da automação:', results);
    return results;
  } catch (error) {
    console.error('Erro ao iniciar automação:', error);
    throw error;
  }
}

module.exports = {
  startFollowing,
  loginBot,
  followUser
};
