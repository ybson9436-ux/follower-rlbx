document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const usernameInput = document.getElementById('username');
  const botCountInput = document.getElementById('botCount');
  const logBox = document.getElementById('log');
  const statusText = document.getElementById('statusText');
  const followCount = document.getElementById('followCount');
  const successCount = document.getElementById('successCount');
  const failCount = document.getElementById('failCount');

  let statusInterval = null;

  function addLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function updateStatus() {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        statusText.textContent = data.running ? '🟢 Em Andamento' : '🔴 Parado';
        followCount.textContent = data.totalFollows;
        successCount.textContent = data.successfulFollows;
        failCount.textContent = data.failedFollows;
      })
      .catch(err => console.error('Erro ao buscar status:', err));
  }

  startBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const botCount = parseInt(botCountInput.value);

    if (!username) {
      alert('Por favor, digite um username válido!');
      return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;
    logBox.innerHTML = '';

    addLog(`Iniciando automação para: ${username}`, 'info');
    addLog(`Usando ${botCount} bot(s)`, 'info');

    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          botAccounts: Array(botCount).fill(null)
        })
      });

      const result = await response.json();

      if (result.success) {
        addLog('✅ Automação iniciada com sucesso!', 'success');
        
        // Atualizar status a cada 2 segundos
        statusInterval = setInterval(updateStatus, 2000);
        updateStatus();
      } else {
        addLog(`❌ Erro: ${result.error}`, 'error');
      }
    } catch (error) {
      addLog(`❌ Erro ao conectar: ${error.message}`, 'error');
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });

  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(statusInterval);
    addLog('⏹️ Automação parada', 'info');
    statusText.textContent = '🔴 Parado';
  });

  // Atualizar status inicialmente
  updateStatus();
});
