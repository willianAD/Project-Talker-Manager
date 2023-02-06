const fs = require('fs').promises;
const { join } = require('path');
const path = '/talker.json';

const readTalker = async () => {
  const path = '/talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalker = async () => {
  const talker = await readTalker();
  return talker.talker;
};

module.exports = { getAllTalker };
