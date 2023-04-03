import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'user';

  constructor(private http: HttpClient) {}

  public getAllUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}`);
  }

  public getUser(user: User): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.url}/${user._id}`
    );
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/${this.url}/${user._id}`,
      user
    );
  }

  public createUser(user: User): Observable<any> {
    user.password = '123qwe';
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}`,
      user
    );
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.url}/${user._id}`
    );
  }

  public getAllStudent(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}GetAllStudent`);
  }

  public getAllLecturer(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}GetAllLecturer`);
  }
}
