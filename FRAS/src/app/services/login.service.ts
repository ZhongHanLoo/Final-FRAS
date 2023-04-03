import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Class } from '../models/class';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = 'user';

  loggedIn = false;
  user: User = {
    _id: '642848da051cd72dedeb4bbb',
    userId: '',
    name: '',
    email: '',
    password: '',
    userType: '',
    class: [],
  };

  public login(userId: String, password: String) {
    const loginData = {userId, password}
    this.http.put<any>(
      `${environment.apiUrl}/${this.url}/Login`,
      loginData
    ).subscribe(result =>{
      if(result.message === 'Authentication failed'){
        return false
      }else{
        this.user = result.user
        return true
      }
    })
  }

  public getLoginUser(){
    return this.user
  }
}
