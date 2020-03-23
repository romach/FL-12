import { Component } from '@angular/core';
import { User } from './user/user.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: "John", email: "john@example.com", phone: "111-111-111", isEditing: false },
    { id: 2, name: "Bob", email: "bob@example.com", phone: "222-222-222", isEditing: false }
  ];
  newUser: User = null;
  searchQuery: string = ""

  onUserDelete(id: number) {
    this.users = this.users.filter(user => user.id !== id)
  }

  onUserCreate(newUser: User) {
    const id = Math.max(...this.users.map(user => user.id)) + 1
    this.users = [{ ...newUser, id }, ...this.users]
    this.newUser = null;
  }

  onUserUpdate(updatedUser: User) {
    this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
  }

  addUser() {
    this.newUser = { id: null, name: null, email: null, phone: null, isEditing: true }
  }
}
