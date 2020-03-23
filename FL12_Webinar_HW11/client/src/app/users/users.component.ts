import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = null;
  searchQuery: string = ""

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.userSubject$.subscribe((users: User[]) => {
      this.users = users;
    })
    this.userService.getUsers()
  }

  onUserDelete(id: number) {
    this.userService.deleteUser(id)
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
    // this.newUser = { id: null, name: null, email: null, phone: null, isEditing: true }
  }

}
