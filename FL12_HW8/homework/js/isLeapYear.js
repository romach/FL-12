function isLeapYear(input) {
  const date = new Date(input);
  if (isNaN(date)) {
    return 'Invalid Date';
  } else {
    const year = date.getFullYear();
    const leapYear = new Date(year, 1, 29).getDate() === 29;
    return `${year} is ${leapYear ? '' : 'not '}a leap year`;
  }
}
console.assert(isLeapYear('2020-01-01 00:00:00') === '2020 is a leap year');
console.assert(isLeapYear('2020-01-01 00:00:00777') === 'Invalid Date');
console.assert(isLeapYear('2021-01-15 13:00:00') === '2021 is not a leap year');
console.assert(isLeapYear('2200-01-15 13:00:00') === '2200 is not a leap year');
console.assert(
  isLeapYear(1213131313135465656654564646542132132131) === 'Invalid Date'
);
console.assert(isLeapYear(1213131313) === '1970 is not a leap year');
