import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Class } from '../models/class';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private url = 'class';

  constructor(private http: HttpClient) {}

  public getAllClass(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}`);
  }

  public getClass(theClass: Class): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.url}/${theClass._id}`
    );
  }

  public updateClass(theClass: Class): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/${this.url}/${theClass._id}`,
      theClass
    );
  }

  public createClass(theClass: Class): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}`,
      theClass
    );
  }

  public deleteClass(theClass: Class): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.url}/${theClass._id}`
    );
  }

  public getClassByLecturer(lecturer: User): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}GetClassByLecturer/${lecturer._id}`);
  }
}
