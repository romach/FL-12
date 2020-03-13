const cloneDate = date => new Date(date.valueOf());

const templates = {
  CALENDAR: ({ d, m, y }) => `${d}/${m}/${y}`,
  COURSES_LIST: ({ d, m, y }) => `${d}.${m}.${y.slice(2)}`,
  MODEL: ({ d, m, y }) => `${y}-${m}-${d}`
};

const dateToString = date => {
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const month = (date
    .getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year = date.getFullYear().toString();
  return template => template({ d: day, m: month, y: year });
};

export { templates, dateToString, cloneDate };
