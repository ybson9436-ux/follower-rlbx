# 🎮 Roblox Follow Bot

Bot automatizado para adicionar seguidores em contas Roblox usando múltiplas contas de bot.

## 🚀 Características

- ✅ Dashboard web intuitivo
- ✅ Automação de follows com múltiplas contas
- ✅ Status em tempo real
- ✅ Log de atividades
- ✅ Interface responsiva
- ✅ API RESTful

## 🛠️ Stack Tecnológico

- **Backend:** Node.js + Express.js
- **Frontend:** HTML + CSS + Handlebars
- **Automação:** noblox.js
- **API:** REST

## 📋 Pré-requisitos

- Node.js v14+
- npm ou yarn
- Contas Roblox para os bots

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/ybson9436-ux/follower-rlbx.git
cd follower-rlbx
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```
BOT_USERNAME_1=seu_usuario
BOT_PASSWORD_1=sua_senha
```

4. **Inicie o servidor:**
```bash
npm start
```

Ou para desenvolvimento:
```bash
npm run dev
```

## 📖 Como Usar

1. Abra `http://localhost:3000` no navegador
2. Digite o nome de usuário Roblox da conta que deseja seguir
3. Selecione quantos bots deseja usar
4. Clique em "Iniciar Automação"
5. Monitore o status em tempo real no dashboard

## 📁 Estrutura do Projeto

```
follower-rlbx/
├── server.js              # Arquivo principal
├── controllers/
│   └── botController.js   # Lógica dos endpoints
├── services/
│   └── botService.js      # Lógica de automação
├── views/
│   ├── layouts/
│   │   └── main.hbs       # Layout principal
│   └── index.hbs          # Página principal
├── public/
│   ├── css/
│   │   └── style.css      # Estilos
│   └── js/
│       └── main.js        # JavaScript frontend
├── .env.example           # Exemplo de variáveis
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### POST `/api/follow`
Inicia a automação de follows

**Request:**
```json
{
  "username": "usuario_roblox",
  "botAccounts": [1, 2, 3]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Iniciando automação...",
  "status": {
    "running": true,
    "totalFollows": 3
  }
}
```

### GET `/api/status`
Obtém o status atual

**Response:**
```json
{
  "running": true,
  "totalFollows": 3,
  "successfulFollows": 2,
  "failedFollows": 0,
  "followers": []
}
```

### GET `/api/followers`
Lista todos os seguidores adicionados

**Response:**
```json
{
  "followers": [...],
  "total": 0
}
```

## ⚠️ Aviso Legal

Este bot é para fins educacionais. Ao usar, você concorda em:
- Respeitar os Termos de Serviço da Roblox
- Usar apenas contas que você possui
- Não infringir regras de automação

## 📝 Licença

MIT License

## 👨‍💻 Autor

**ybson9436-ux**

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.
