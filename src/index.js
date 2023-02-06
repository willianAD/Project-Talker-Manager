const express = require('express');
const talkerUsers = require('.././middleware/talker');
const fs = require('fs').promises;

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
  const talker =  await talkerUsers.getAllTalker();

  res.status(HTTP_OK_STATUS).json( talker );
});
