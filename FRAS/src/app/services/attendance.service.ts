import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AttendanceReport } from '../models/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private url = 'attendance';

  constructor(private http: HttpClient) {}

  public getAllAttendance(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}`);
  }

  public getAttendance(attendance: String): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.url}/${attendance}`
    );
  }

  public updateAttendance(attendance: AttendanceReport): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/${this.url}/${attendance._id}`,
      attendance
    );
  }

  public createAttendance(attendance: AttendanceReport): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}`,
      attendance
    );
  }

  public deleteAttendance(attendance: AttendanceReport): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.url}/${attendance._id}`
    );
  }
}
