function maxElement(array) {
  return Math.max(...array);
}

function copyArray(array) {
  return [...array];
}

function addUniqueId(object) {
  return { ...object, id: Symbol() };
}

function regroupObject({ name, details: { id, age, university } }) {
  return { university, user: { age, firstName: name, id } };
}

function findUniqueElements(array) {
  return Array.from(new Set(array));
}

function hideNumber(phoneNumber) {
  return phoneNumber.slice(-4).padStart(phoneNumber.length, "*");
}

function required() {
  throw Error("Missing property");
}
function add(a = required(), b = required()) {
  return a + b;
}

function fetchWithPromise() {
  fetch("https://api.github.com/users/romach/repos")
    .then(response => response.json())
    .then(repos =>{
      repos = repos.map(repo => repo.name);
      repos.sort((a, b) => a[0].toLowerCase().charCodeAt(0) - b[0].toLowerCase().charCodeAt(0));
      console.log(repos);
    });
}

async function fetchWithAsyncAwait() {
  const response = await fetch("https://api.github.com/users/romach/repos");
  const repos = await response.json();
  const names = repos.map(repo => repo.name);
  names.sort((a, b) => a[0].toLowerCase().charCodeAt(0) - b[0].toLowerCase().charCodeAt(0));
  console.log(names);
}

//todo: delete lines below
console.log(maxElement([1, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2])); //?

const array = [1, 2, 3];
const copiedArray = copyArray(array);
console.log(array, copiedArray);
console.log(array === copiedArray);

const firstEnhancedObject = addUniqueId({ name: 123 }); //?
const secondEnhancedObject = addUniqueId({ name: 123 }); //?
console.log(firstEnhancedObject === secondEnhancedObject);
console.log(firstEnhancedObject.id === secondEnhancedObject.id);

const oldObj = {
  name: "Someone",
  details: { id: 1, age: 11, university: "UNI" }
};
console.log(regroupObject(oldObj));

{
  const array = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
  console.log(findUniqueElements(array));
}

const phoneNumber = "0123456789";
console.log(hideNumber(phoneNumber));

add(1, 3); //?
// add(1);

fetchWithPromise(); //?
fetchWithAsyncAwait();