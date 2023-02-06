const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'src', 'talker.json');

const readTalker = async () => {
  try {
    const contentFile = await fs.readFile(talkerPath, 'utf8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalker = async () => {
  const talker = await readTalker();
  return talker;
};

const getTalkerById = async (id) => {
  const talker = await readTalker();
  return talker.find((e) => e.id === id);
};

module.exports = { getAllTalker, getTalkerById };
