import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users/new', component: UserDetailsComponent },
  { path: '**', redirectTo:'/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
