const convertMinutesToHours = (minutesDuration) => {
  const hours = Math.floor(minutesDuration / 60);
  const minutes = Math.floor(minutesDuration % 60);

  return hours < 1 ? `${minutes}m` : `${hours}h ${minutes}m`;
};

export { convertMinutesToHours };
