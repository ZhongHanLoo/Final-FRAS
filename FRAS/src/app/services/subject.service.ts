import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private url = 'subject';

  constructor(private http: HttpClient) {}

  public getAllSubject(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}`);
  }

  public getSubject(subject: Subject): Observable<Subject> {
    return this.http.get<Subject>(
      `${environment.apiUrl}/${this.url}/${subject._id}`
    );
  }

  public updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(
      `${environment.apiUrl}/${this.url}/${subject._id}`,
      subject
    );
  }

  public createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(
      `${environment.apiUrl}/${this.url}`,
      subject
    );
  }

  public deleteSubject(subject: Subject): Observable<Subject> {
    return this.http.delete<Subject>(
      `${environment.apiUrl}/${this.url}/${subject._id}`
    );
  }

  // public deleteSubject(subject: Subject): Observable<Subject> {
  //   const options = { body: subject };
  //   return this.http.delete<Subject>(
  //     `${environment.apiUrl}/${this.url}/deleteSubject`,
  //     options
  //   );
  // }

}
