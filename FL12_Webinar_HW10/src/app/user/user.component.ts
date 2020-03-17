import { Component, Input, Output, EventEmitter } from '@angular/core'
import { User } from './user.model'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user: User
  @Output() userDelete = new EventEmitter<User>();
  @Output() userChange = new EventEmitter<User>();

  delete(user: User) {
    this.userDelete.emit(user);
  }

  onChange(user: User) {
    this.userChange.emit(user)
  }
}