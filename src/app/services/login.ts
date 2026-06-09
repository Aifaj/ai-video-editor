import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

   apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  login(email: string, password: string) {
  return this.http.get(
    `http://localhost:3000/posts?email=${email}&password=${password}`
  );
}

  register(user: any) {
    return this.http.post(this.apiUrl, user);
  }
  
}
