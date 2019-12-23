// Your code goes here
'use strict'
const aInput = prompt('Enter a:')
const bInput = prompt('Enter b:')
const cInput = prompt('Enter c:')
if (
  aInput === '' ||
  aInput === undefined ||
  bInput === '' ||
  bInput === undefined ||
  cInput === '' ||
  cInput === undefined
) {
  alert('input values should be ONLY numbers')
}
const a = parseInt(aInput)
const b = parseInt(bInput)
const c = parseInt(cInput)

if (a === 0 || b === 0 || c === 0) {
  alert('A triangle must have 3 sides with a positive definite length')
} else if (a + b <= c || a + c <= b || b + c <= a) {
  alert("Triangle doesn't exist")
  console.log("Triangle doesn't exist")
} else {
  if (a === b && b === c) {
    console.log('Equilateral triangle')
  } else if (a === b || a === c || b === c) {
    console.log('Isosceles triangle')
  } else {
    console.log('Scalene triangle')
  }
}
