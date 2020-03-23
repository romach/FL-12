import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private GET_USERS_URL = 'http://localhost:3000/users'
  userSubject$ = new Subject<User[]>()

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.GET_USERS_URL).subscribe((users: User[]) => this.userSubject$.next(users));
  }

  deleteUser(id: number) {
    this.httpClient.delete(`http://localhost:3000/users/${id}`).subscribe(() => {
      this.httpClient.get(this.GET_USERS_URL).subscribe((users: User[]) => this.userSubject$.next(users))
    })
  }
}
