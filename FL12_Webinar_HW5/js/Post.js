class Post {
  template() {
    return `
        <h2>${this.post.title}</h2>
        <div>${this.post.body}</div>
        <div class="comments">
          <h3>Comments</h3>
          <div class="comments-list"></div>
        </div>
      `;
  }
  
  constructor(postJson) {
    this.post = postJson;
    this.post.body = this.post.body.replace("\n", "<br/>");
    this.node = document.createElement("section");
    this.node.classList.add("post");
    this.node.insertAdjacentHTML("afterbegin", this.template());
    this.loadComments();
  }

  commentsTemplate(comment) {
    return `<h4>${comment.name}</h4>
      <div>
        <a href="mailto:${comment.email}">${comment.email}</a>
      </div>
      <div>${comment.body.replace("\n", "<br/>")}</div>`;
  }

  async loadComments() {
    const commentsNode = this.node.querySelector(".comments-list");
    const comments = await executeWithSpinner(commentsNode)(async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.post.id}/comments`
      );
      return await response.json();
    });
    comments.forEach(comment => {
      const node = document.createElement("div");
      node.classList.add("comment");
      node.insertAdjacentHTML("afterbegin", this.commentsTemplate(comment));
      commentsNode.appendChild(node);
    });
  }
}
