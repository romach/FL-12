import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user.service';
import { Subject, interval } from 'rxjs';
import { debounce, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  search: string;
  searchInput: Subject<string> = new Subject();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => { this.users = users })
    this.searchInput
      .pipe(
        debounce(() => interval(500)),
        switchMap((value: string) => {
          return value === "" ? this.userService.getUsers() : this.userService.searchUsersByName(value);
        }))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngModelChange(event) {
    this.searchInput.next(event);
  }

  onUserDelete(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.userService.getUsers().subscribe((users: User[]) => { this.users = users })
    })
  }
}
