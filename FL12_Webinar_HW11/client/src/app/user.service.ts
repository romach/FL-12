import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  USERS_URL = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.USERS_URL)
  }

  searchUsersByName(name: string) {
    return this.httpClient.get(`${this.USERS_URL}?name=${name}`)
  }

  getUser(id: number) {
    return this.httpClient.get(this.USERS_URL + "/" + id)
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.USERS_URL}/${id}`)
  }

  createUser(user: User) {
    return this.httpClient.post(this.USERS_URL, user)
  }

  updateUser(user: User) {
    return this.httpClient.put(this.USERS_URL + "/" + user.id, user)
  }
}
