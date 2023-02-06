const express = require('express');
const talkerUsers = require('../middleware/talker');
const validateAge = require('../middleware/validateAge');
const validateLoginPassword = require('../middleware/validateLoginPassword');
const validateLoginEmail = require('../middleware/validateLoguinEmail');
const validateName = require('../middleware/validateName');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talker = await talkerUsers.getAllTalker();

  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await talkerUsers.getTalkerById(Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerId);
});

app.post('/login', validateLoginPassword, validateLoginEmail, async (_req, res) => {
  let createToken = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) {
        createToken += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

  return res.status(200).json({ token: createToken });
});

app.post('/talker', validateName, validateAge, async (req, res) => res.status(201).json(req.body));
