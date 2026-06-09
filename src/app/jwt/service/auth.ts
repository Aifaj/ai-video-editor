import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) { }

  register(url: any, data: any) {
    return this.http.post(`${this.apiUrl}/${url}`, data);
  }

  login(data: {
    email: string;
    password: string;
  }): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  refreshToken(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/refreshToken`,
      {}
    );
  }

  logout(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    );
  }

  getAdminuser(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/admins`
    );
  }

  getNormalUser(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/users`,
      // {
      //   withCredentials: true // use to send cookie to server
      // }
    );
  }
}
