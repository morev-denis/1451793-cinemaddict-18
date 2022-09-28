const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export { getRandomInteger, getRandomItem, getRandomBoolean };
