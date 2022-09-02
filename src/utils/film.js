import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const convertMinutesToHours = (minutesDuration) => {
  const hours = Math.floor(minutesDuration / 60);
  const minutes = Math.floor(minutesDuration % 60);

  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

const formatISOStringToDate = (ISOString) => dayjs(ISOString).format('DD MMMM YYYY');

const formatISOStringToDateWithTime = (ISOString) => dayjs(ISOString).format('YYYY/MM/DD HH:MM');

const formatISOStringToYear = (ISOString) => dayjs(ISOString).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

const getFilteredFilmsCount = (filters, name) =>
  filters.find((filter) => filter.name === name).count;

export {
  convertMinutesToHours,
  formatISOStringToDate,
  formatISOStringToYear,
  formatMinutesToTime,
  formatISOStringToDateWithTime,
  getFilteredFilmsCount,
};
