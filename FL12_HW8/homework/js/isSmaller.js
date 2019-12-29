function isBigger(first, second) {
  return first > second;
}
function isSmaller(first, second) {
  return isBigger(second, first);
}
console.assert(isSmaller(5, -1) === false);
