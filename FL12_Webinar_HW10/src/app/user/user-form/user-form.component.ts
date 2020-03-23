import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user: User
  userForm: FormGroup
  @Output() userChange = new EventEmitter<User>()
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const { name, email, phone } = this.user
    this.userForm = this.fb.group({
      name: [name, Validators.required],
      email: [email, Validators.required],
      phone: [phone, Validators.required]
    })
  }

  save() {
    this.userChange.emit({ ...this.user, ...this.userForm.value, isEditing: false })
  }
}
