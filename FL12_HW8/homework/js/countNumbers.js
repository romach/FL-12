function makeNumber(line) {
  return [...line].reduce((accumulator, currentValue) => {
    const parsedLetter = parseInt(currentValue);
    return isNaN(parsedLetter) ? accumulator : accumulator + parsedLetter;
  }, '');
}
function countNumbers(line) {
  const lineWithNumbers = makeNumber(line);
  return [...lineWithNumbers].reduce((accumulator, currentValue) => {
    if (Object.prototype.hasOwnProperty.call(accumulator, currentValue)) {
      accumulator[currentValue]++;
    } else {
      accumulator[currentValue] = 1;
    }
    return accumulator;
  }, {});
}
console.log(countNumbers('erer384jj4444666888jfd123'));
console.log(countNumbers('jdjjka000466588kkkfs662555'));
