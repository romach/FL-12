import { Component, Input, Output, EventEmitter } from '@angular/core'
import { User } from './user.model'
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User
  @Output() userChange = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  onDelete(id: number) {
    this.userService.deleteUser(id);
  }

  onChange(user: User) {
    this.userChange.emit(user)
  }
}