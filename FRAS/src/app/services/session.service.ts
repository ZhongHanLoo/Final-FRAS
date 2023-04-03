import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Session } from '../models/session';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    private url = 'session';

    constructor(private http: HttpClient) {}

    public getAllSession(): Observable<any> {
      return this.http.get<any>(`${environment.apiUrl}/${this.url}`);
    }

    public getSession(session: Session): Observable<any> {
      return this.http.get<any>(
        `${environment.apiUrl}/${this.url}/${session._id}`
      );
    }

    public updateSession(session: Session): Observable<any> {
      return this.http.put<any>(
        `${environment.apiUrl}/${this.url}/${session._id}`,
        session
      );
    }

    public createSession(session: Session): Observable<any> {
      return this.http.post<any>(
        `${environment.apiUrl}/${this.url}`,
        session
      );
    }

    public deleteSession(session: Session): Observable<any> {
      return this.http.delete<any>(
        `${environment.apiUrl}/${this.url}/${session._id}`
      );
    }

  }
