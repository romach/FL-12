function getMin() {
  return [...arguments].reduce((accumulator, currentValue) =>
    accumulator < currentValue ? accumulator : currentValue
  );
}
console.assert(getMin(3, 0, -3) === -3);
