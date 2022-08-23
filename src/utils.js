const convertMinutesToHours = (minutesDuration) => {
  const hours = Math.floor(minutesDuration / 60);
  const minutes = Math.floor(minutesDuration % 60);

  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export { convertMinutesToHours, getRandomInteger };
