import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClassComponent } from './components/createClass/createClass.component';
import { HomeComponent } from './components/home/home.component';
import { LecturerClassComponent } from './components/lecturer-class/lecturer-class.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SubjectComponent } from './components/subject/subject.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'createClass', component: CreateClassComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'lecturerClass', component: LecturerClassComponent },



  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
