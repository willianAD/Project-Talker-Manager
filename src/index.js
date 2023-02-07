const express = require('express');
const talkerUsers = require('../middleware/talker');
const validateLoginPassword = require('../middleware/validateLoginPassword');
const validateLoginEmail = require('../middleware/validateLoguinEmail');
const validateToken = require('../middleware/validateToken');
const validateName = require('../middleware/validateName');
const validateAge = require('../middleware/validateAge');
const { validateTalk, validateTalkWatchedAt,
  validateTalkRate } = require('../middleware/validateTalk');

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

app.get('/talker/search', validateToken, async (req, res) => {
  const talker = await talkerUsers.getAllTalker();
  const { q } = req.query;
  const talkerName = await talkerUsers.findTalkerByName(q);

  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talker);
  }
  return res.status(HTTP_OK_STATUS).json(talkerName);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await talkerUsers.getTalkerById(Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.get('/talker', async (_req, res) => {
  const talker = await talkerUsers.getAllTalker();

  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateLoginPassword, validateLoginEmail, async (_req, res) => {
  let createToken = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) {
        createToken += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

  return res.status(HTTP_OK_STATUS).json({ token: createToken });
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk,
  validateTalkWatchedAt, validateTalkRate, async (req, res) => {
  const talkers = await talkerUsers.getAllTalker();
  const { name, age, talk } = req.body;

  const newId = await talkerUsers.getTalkerNewId();
  const newTalker = { id: newId, name, age, talk };

  talkers.push(newTalker);

  await talkerUsers.writeTalker(talkers);

  return res.status(201).json(newTalker);
});

// app.put('/talker/:id', async (req, res) => {
//   const { id } = req.params;
//   const talkerId = await talkerUsers.getTalkerById(Number(id), req.body);
//   res.status(201).json(talkerId);
// });

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await talkerUsers.deleteTalker(Number(id));

  return res.status(204).end();
});
