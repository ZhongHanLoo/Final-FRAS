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
  private loggedin = new BehaviorSubject<boolean>(false);

  private url = 'user';

  user = new BehaviorSubject<User>({
    _id: '',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  });

  public login(userId: String, password: String): Observable<any> {
    const authData = { userId, password };
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}Login`,
      authData
    );
  }

  public getUser() {
    return this.user.asObservable();
  }

  public setEmployee(data: User) {
    this.user.next(data);
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedin.asObservable();
  }

  setLoggedIn(loggedInValue: boolean) {
    this.loggedin.next(loggedInValue);
  }

  logout() {
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
