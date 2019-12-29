function makeNumber(line) {
  return [...line].reduce((accumulator, currentValue) => {
    const parsedLetter = parseInt(currentValue);
    return isNaN(parsedLetter) ? accumulator : accumulator + parsedLetter;
  }, '');
}
console.assert(makeNumber('erer384jjjfd123') === '384123');
console.assert(makeNumber('123098h76gfdd') === '12309876');
console.assert(makeNumber('ijifjgdj') === '');
