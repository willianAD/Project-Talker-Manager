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

const writeTalker = async (content) => {
  try {
    const contentFile = await fs.writeFile(talkerPath, JSON.stringify(content), 'utf8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getTalkerNewId = async () => {
  const talker = await readTalker();
  return talker[talker.length - 1].id + 1;
};

const getAllTalker = async () => {
  const talker = await readTalker();
  return talker;
};

const getTalkerById = async (id) => {
  const talker = await readTalker();
  return talker.find((e) => e.id === id);
};

const findTalkerByName = async (query) => {
  const talker = await readTalker();
  return talker.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()));
};

// const updateTalker = async (id, update) => {
//   const talker = await readTalker();
//   const talkerUpdate = talker.find((e) => e.id === id);
//   if (talkerUpdate) {
//   }
// }

// const deleteTalker = async (id) => {
//   const talker = await readTalker();
//   const deleteId = talker.filter((e) => e.id === id);

//   return await writeTalker(deleteId);
// }

module.exports = { writeTalker, getAllTalker, getTalkerById, getTalkerNewId, findTalkerByName };
