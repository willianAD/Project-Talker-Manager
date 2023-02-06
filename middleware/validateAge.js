const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof !age === 'number') {
    res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (Number.isInteger(!age)) {
    res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (age < 18) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  return next();
};

module.exports = validateAge;
