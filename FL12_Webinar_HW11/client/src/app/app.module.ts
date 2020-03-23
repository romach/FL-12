import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import {HttpClientModule} from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component'
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchPipe,
    UserFormComponent,
    UserDetailsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
