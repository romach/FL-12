loadUsers();

function loadUsers() {
  const usersNode = document.querySelector(".users");
  executeWithSpinner(usersNode)(async () => {
    const users = await fetchUsers();
    users.forEach(user => usersNode.appendChild(user.node));
  });
}

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();
    return json.map(element => new User(element));
  } catch (error) {
    throw new Error("Unable to fetch users");
  }
}

async function loadPosts(userId, name) {
  document.body.textContent = "";
  const postsPageMarkup = `<div>
      <h1>Posts of user ${name}</h1>
      <div class="posts"></div>
    </div>`;
  document.body.insertAdjacentHTML("afterbegin", postsPageMarkup);
  const postsPatentNode = document.body.querySelector(".posts");
  const posts = await executeWithSpinner(postsPatentNode)(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return await response.json();
  });
  posts
    .map(post => new Post(post))
    .forEach(post => {
      postsPatentNode.appendChild(post.node);
    });
}
