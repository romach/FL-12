class ModalWindow {
  template() {
    return `<div class="modal-shadow">
      <section class="modal-window">
        <header class="modal-header">
          Edit user
        </header>
        <main class="modal-content">
          <form class="modal-form">
            <div class="form-section">
              <div class="form-section-title">Common info</div>
              <div class="group">
                <label for="id">Id</label>
                <input id="id" type="text" value="${this.user.id}"/>
              </div>
              <div class="group">
              <label for="name">Name</label>
              <input id="name" type="text" value="${this.user.name}"/>
            </div>
              <div class="group">
                <label for="username">User name</label>
                <input id="username" type="text" value="${this.user.username}" />
              </div>
              <div class="group">
                <label for="email">Email</label>
                <input id="email" type="text" value="${this.user.email}"/>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-title">Address</div>
              <div class="group">
                <label for="city">City</label>
                <input id="city" type="text" value="${this.user.address.city}"/>
              </div>
              <div class="group">
                <label for="street">Street</label>
                <input id="street" type="text" value="${this.user.address.street}"/>
              </div>
              <div class="group">
                <label for="suite">Suite</label>
                <input id="suite" type="text" value="${this.user.address.suite}"/>
              </div>
              <div class="group">
                <label for="zipcode">Zip code</label>
                <input id="zipcode" type="text" value="${this.user.address.zipcode}"/>
              </div>
              <div class="group">
                <label for="latitude">Latitude</label>
                <input id="latitude" type="text" value="${this.user.address.geo.lat}"/>
              </div>
              <div class="group">
                <label for="longitude">Longitude</label>
                <input id="longitude" type="text" value="${this.user.address.geo.lng}"/>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-title">Contacts</div>
              <div class="group">
                <label for="phone">Phone</label>
                <input id="phone" type="text" value="${this.user.phone}"/>
              </div>
              <div class="group">
                <label for="website">Website</label>
                <input id="website" type="text" value="${this.user.website}"/>
              </div>
            </div>
            <div class="form-section">
              <div class="form-section-title">Company</div>
              <div class="group">
                <label for="company-name">Name</label>
                <input id="company-name" type="text" value="${this.user.company.name}"/>
              </div>
              <div class="group">
                <label for="company-catch-phrase">Catch phrase</label>
                <input id="company-catch-phrase" type="text" value="${this.user.company.catchPhrase}"/>
              </div>
              <div class="group">
                <label for="company-slogan">Slogan</label>
                <input id="company-slogan" type="text" value="${this.user.company.bs}"/>
              </div>
            </div>
          </form>
        </main>
        <footer class="modal-footer">
          <button class="btn-save">Save</button>
          <button class="btn-cancel">Cancel</button>
        </footer>
      </section>
    </div>`;
  }

  constructor(user) {
    this.user = user;
    this.node = document.createElement("div");
    this.node.classList.add("modal");
    this.node.insertAdjacentHTML("afterbegin", this.template());
    document.body.appendChild(this.node);
    this.node.addEventListener("change", event => {
      const elementId = event.target.id;
      const value = event.target.value;
      const handlersMap = {
        id: () => (this.user.id = value),
        name: () => (this.user.name = value),
        username: () => (this.user.username = value),
        email: () => (this.user.email = value),
        city: () => (this.user.address.city = value),
        street: () => (this.user.address.street = value),
        suite: () => (this.user.address.suite = value),
        zipcode: () => (this.user.address.zipcode = value),
        latitude: () => (this.user.address.geo.lat = value),
        longitude: () => (this.user.address.geo.lng = value),
        phone: () => (this.user.phone = value),

        website: () => (this.user.website = value),
        "company-name": () => (this.user.company.name = value),
        "company-catch-phrase": () => (this.user.company.catchPhrase = value),
        "company-slogan": () => (this.user.company.bs = value)
      };
      const handler = handlersMap[elementId];
      if (handler !== undefined) {
        handler();
      }
    });
  }

  getUpdatedUserPromise() {
    return new Promise((resolve, reject) => {
      this.node.querySelector(".btn-cancel").addEventListener("click", () => {
        this.close();
        resolve(null);
      });
      this.node.querySelector(".btn-save").addEventListener("click", () => {
        this.close();
        resolve(this.user);
      });
    });
  }

  close() {
    this.node.remove();
  }
}
