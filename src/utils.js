import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const formatISOStringToDate = (ISOString) => dayjs(ISOString).format('DD MMMM YYYY');

const formatISOStringToDateWithTime = (ISOString) => dayjs(ISOString).format('YYYY/MM/DD HH:MM');

const formatISOStringToYear = (ISOString) => dayjs(ISOString).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export {
  convertMinutesToHours,
  getRandomInteger,
  getRandomItem,
  formatISOStringToDate,
  formatISOStringToYear,
  formatMinutesToTime,
  formatISOStringToDateWithTime,
};
