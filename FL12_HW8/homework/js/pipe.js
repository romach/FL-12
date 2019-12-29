function addOne(x) {
  return x + 1;
}
function pipe(argument, ...functions) {
  return functions.reduce(
    (accumulator, currentFunction) => currentFunction(accumulator),
    argument
  );
}
console.assert(pipe(1, addOne) === 2);
console.assert(pipe(1, addOne, addOne) === 3);
