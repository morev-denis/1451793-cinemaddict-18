import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const convertMinutesToHours = (minutesDuration) => {
  const hours = Math.floor(minutesDuration / 60);
  const minutes = Math.floor(minutesDuration % 60);

  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

const formatISOStringToDate = (ISOString) => dayjs(ISOString).format('DD MMMM YYYY');

const formatISOStringToRelativeTime = (ISOString) => dayjs().to(dayjs(ISOString));

const formatISOStringToYear = (ISOString) => dayjs(ISOString).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

const getFilteredFilmsCount = (filters, name) =>
  filters.find((filter) => filter.name === name).count;

const sortByDate = (dateA, dateB) => dayjs(dateA).diff(dayjs(dateB));

export {
  convertMinutesToHours,
  formatISOStringToDate,
  formatISOStringToYear,
  formatMinutesToTime,
  formatISOStringToRelativeTime,
  getFilteredFilmsCount,
  sortByDate,
};
