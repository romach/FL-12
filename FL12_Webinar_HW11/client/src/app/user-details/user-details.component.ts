import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User
  userForm: FormGroup
  type: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const isNewUser: boolean = this.route.snapshot.url[1].path === "new";
    if (isNewUser) {
      this.type = 'CREATE'
      this.user = { id: null, name: null, email: null, phone: null, address: { street: null }, website: null };
      this.userForm = this.fb.group({
        name: [null, Validators.required],
        email: [null, Validators.required],
        phone: [null, Validators.required],
        address: [null],
        website: [null]
      })
    } else {
      this.type = 'UPDATE'
      const id = this.route.snapshot.params['id'];
      this.userService.getUser(id)
        .subscribe((user: User) => {
          this.user = user
          this.userForm = this.fb.group({
            name: [user.name, Validators.required],
            email: [user.email, Validators.required],
            phone: [user.phone, Validators.required],
            address: [user.address.street],
            website: [user.website]
          })
        })
    }
  }

  submit() {
    const formResult = this.userForm.value;
    const user: User = {
      ...this.user,
      id: this.user.id || null,
      name: formResult.name,
      email: formResult.email,
      phone: formResult.phone,
      address: { street: formResult.address },
      website: formResult.website
    };
    if (this.type === 'CREATE') {
      this.userService.createUser(user)
        .subscribe(() => this.router.navigate(["/"]))
    } else {
      this.userService.updateUser(user)
        .subscribe(() => this.router.navigate(["/"]))
    }
  }
}
