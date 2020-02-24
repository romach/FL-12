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
