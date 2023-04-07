import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Class } from '../models/class';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private url = 'user';

  loggedIn = false;
  private userNav = new BehaviorSubject<User>({
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  });

  user: User = {
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  };

  public login(userId: String, password: String): Observable<any> {

    return this.http
      .get<any>(`${environment.apiUrl}/${this.url}Login/${userId}`)
      .pipe(
        map((result) => {
          if (result.user.password != password) {
            return false;
          } else {
            this.user = result.user;
            this.setLoginUserNav(result.user);
            this.loggedIn = true;
            console.log(this.user);
            return { success: true, user: this.userNav };
          }
        })
      );
  }

  setLoginUserNav(data: User){
    this.userNav.next(data);
  }

  public getLoginUserNav() {
    return this.userNav.asObservable();
  }

  public getLoginUser() {
    return this.user;
  }

  public logout(){
    const userNav: User = {
      _id: '',
      userId: '',
      name: '',
      email: '',
      password: '',
      userType: '',
      class: [],
    };
    this.userNav.next(userNav);
    this.router.navigate(['/login']);
  }


}
