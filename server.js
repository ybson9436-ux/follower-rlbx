const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');
const botController = require('./controllers/botController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.render('index', { title: 'Roblox Follow Bot' });
});

app.post('/api/follow', botController.addFollow);
app.get('/api/status', botController.getStatus);
app.get('/api/followers', botController.getFollowers);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🤖 Bot rodando em http://localhost:${PORT}`);
});
