function convert(...args) {
  const result = [];
  for (const argument of args) {
    if (typeof argument === 'number') {
      result.push(String(argument));
    } else {
      result.push(parseInt(argument));
    }
  }
  return result;
}
// I use separate block for tests because of magic numbers
// I want to use only a, d, c, d for identifiers, but not all alphabet
{
  const a = 2;
  const b = 3;
  console.log(convert('1', a, b, '4'));
}

function executeforEach(list, callback) {
  for (const element of list) {
    callback(element);
  }
}
{
  const a = 1;
  const b = 2;
  const c = 3;
  executeforEach([a, b, c], function(el) {
    console.log(el * b);
  });
}

function mapArray(list, callback) {
  const result = [];
  for (let element of list) {
    if (typeof element === 'string') {
      element = parseInt(element);
    }
    result.push(callback(element));
  }
  return result;
}
{
  const a = 2;
  const b = 8;
  const c = 3;
  console.log(
    mapArray([a, '5', b], function(el) {
      return el + c;
    })
  );
}

function filterArray(list, callback) {
  const result = [];
  executeforEach(list, element => {
    if (callback(element)) {
      result.push(element);
    }
  });
  return result;
}
{
  const a = 2;
  const b = 5;
  const c = 8;
  console.log(
    filterArray([a, b, c], function(el) {
      return el % a === 0;
    })
  );
}

function flipOver(input) {
  let result = '';
  for (let i = input.length - 1; i >= 0; i--) {
    result += input[i];
  }
  return result;
}
console.log(flipOver('hey world'));

function makeListFromRange(range) {
  const result = [];
  for (let i = range[0]; i <= range[1]; i++) {
    result.push(i);
  }
  return result;
}
{
  const a = 2;
  const b = 7;
  console.log(makeListFromRange([a, b]));
}

function getArrayOfKeys(objects, keyName) {
  const result = [];
  executeforEach(objects, object => result.push(object[keyName]));
  return result;
}
const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
console.log(getArrayOfKeys(actors, 'name'));

function substitute(numbers) {
  return mapArray(numbers, element => {
    const minimumValidValue = 30;
    return element < minimumValidValue ? '*' : element;
  });
}
{
  const a = 58;
  const b = 14;
  const c = 48;
  const d = 2;
  const e = 31;
  const f = 29;
  console.log(substitute([a, b, c, d, e, f]));
}

function getPastDay(date, daysSubstracted) {
  const substractedDate = new Date(date.getTime());
  substractedDate.setDate(substractedDate.getDate() - daysSubstracted);
  return substractedDate.getDate();
}
{
  const year = 2019;
  const day = 2;
  const date = new Date(year, 0, day);
  const a = 1;
  const c = 2;
  const d = 365;
  console.log(getPastDay(date, a));
  console.log(getPastDay(date, c));
  console.log(getPastDay(date, d));
}

function formatDate(inputDate) {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth();
  const dayOfMonth = inputDate.getDate();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const TWO_DIGITS_NUMBER = 10;
  return (
    `${year}/${month + 1}/${dayOfMonth} ` +
    `${hours < TWO_DIGITS_NUMBER ? '0' : ''}${hours}:` +
    `${minutes < TWO_DIGITS_NUMBER ? '0' : ''}${minutes}`
  );
}
console.log(formatDate(new Date('6/15/2018 09:15:00')));
console.log(formatDate(new Date()));
