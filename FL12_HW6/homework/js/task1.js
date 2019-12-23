// Your code goes here
'use strict'
const a = prompt('Input a: ')
const b = prompt('Input b: ')
const c = prompt('Input c: ')
if (
  isNaN(isFinite(a) && a !== null && a.trim().length > 0 ? Number(a) : NaN) ||
  a === 0 ||
  isNaN(isFinite(b) && b !== null && b.trim().length > 0 ? Number(b) : NaN) ||
  isNaN(isFinite(c) && c !== null && c.trim().length > 0 ? Number(c) : NaN)
) {
  console.log('Invalid input data')
} else {
  const FOUR = 4
  const TWO = 2
  const discriminant = b * b - FOUR * (a * c)
  if (discriminant === 0) {
    const singleAnswer = Math.round(-(b / (TWO * a)))
    console.log(`x1 = x2 = ${singleAnswer}`)
  } else if (discriminant > 0) {
    const firstAnswer = Math.round((-b + Math.sqrt(discriminant)) / (TWO * a))
    const secondAnswer = Math.round((-b - Math.sqrt(discriminant)) / (TWO * a))
    console.log(`x1 = ${firstAnswer} and x2 = ${secondAnswer}`)
  } else {
    console.log('no solution')
  }
}
