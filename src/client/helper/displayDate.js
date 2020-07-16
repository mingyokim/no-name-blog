const displayDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat(undefined, options);
  return formatter.format(date);
};

export default displayDate;
