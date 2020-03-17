import { Component } from '@angular/core';
import { User } from './user/user.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [
    { name: "John", email: "john@example.com", phone: "111-111-111", isEditing: false },
    { name: "Bob", email: "bob@example.com", phone: "222-222-222", isEditing: false }
  ];
  newUser: User = null;
  searchQuery: string = ""

  onUserDelete(deletedUser: User) {
    this.users = this.users.filter(user => user !== deletedUser)
  }

  onUserCreate(event) {
    this.users = [event, ...this.users]
    this.newUser = null;
  }

  onUserUpdate(index: number, createdUser: User) {
    this.users = this.users.map((user, i) => i === index ? createdUser : user);
  }

  addUser() {
    this.newUser = { name: null, email: null, phone: null, isEditing: true }
  }
}
