class User {
  template() {
    return `<div class="common-info">
      <div class="photo"></div>
      <div class="name">
        <a href="#">${this.user.name}</a>
      </div>
      <div class="username">
        ${this.user.username}
      </div>
      <div class="email">
        <a href="mailto:${this.user.email}">${this.user.email}</a>
      </div>
    </div>
    <div class="company">
      <div class="name">${this.user.company.name}</div>
      <div class="catchPhrase">${this.user.company.catchPhrase}</div>
      <div class="slogan">${this.user.company.bs}</div>
    </div>
    <div class="address">
      <div class="city">${this.user.address.city}</div>
      <div>${this.user.address.street},</div>
      <div>${this.user.address.suite},</div>
      <div>${this.user.address.zipcode}</div>
      <a
        href="http://www.google.com/maps/place/${this.user.address.geo.lat},${this.user.address.geo.lng}"
        target="_blank"
        >Map</a
      >
      <div class="contacts">
        <div class="phone">${this.user.phone}</div>
        <div class="website"><a href="http://${this.user.website}">${this.user.website}</a></div>
      </div>
    </div>
    <footer class="footer">
      <button class="btn-delete">Delete</button>
      <button class="btn-edit">Edit</button>
    </footer>`;
  }

  constructor(userJson) {
    this.user = userJson;
    this.node = document.createElement("section");
    this.node.classList.add("user");
    this.buildDomNode();
  }

  buildDomNode() {
    this.node.insertAdjacentHTML("afterbegin", this.template());
    this.loadPhoto();
    this.node
      .querySelector(".btn-delete")
      .addEventListener("click", () => this.delete());
    this.node
      .querySelector(".btn-edit")
      .addEventListener("click", () => this.edit());
    this.node.querySelector(".name").addEventListener("click", event => {
      event.preventDefault();
      loadPosts(this.user.id, this.user.name);
    });
  }

  delete() {
    const userSection = this.node;
    executeWithSpinner(userSection)(async () => {
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/users/${this.user.id}`,
        {
          method: "DELETE"
        }
      );
      this.node.remove();
      return result;
    });
  }

  async edit() {
    const modal = new ModalWindow(this.clone());
    const updatedUser = await modal.getUpdatedUserPromise();
    if (updatedUser !== null) {
      const userFromResponse = await executeWithSpinner(this.node)(async () => {
        const updateResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${this.user.id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }
        );
        const responseUser = await updateResponse.json();
        return responseUser;
      });
      this.user = userFromResponse;
      this.node.textContent = "";
      this.buildDomNode();
    }
  }

  async loadPhoto() {
    const photo = this.node.querySelector(".photo");
    const url = await executeWithSpinner(photo)(async () => {
      const randomPhotoRequest = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg,png"
      );
      const [{ url }] = await randomPhotoRequest.json();
      return url;
    });
    const logoImage = `<img class="image" src="${url}" alt="${this.user.name} photo"/>`;
    photo.insertAdjacentHTML("afterbegin", logoImage);
  }

  clone() {
    return JSON.parse(JSON.stringify(this.user));
  }
}
