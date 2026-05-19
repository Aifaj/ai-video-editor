import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Stuclass {
  
  apiUrl ='http://localhost:5000/studentClass';

  constructor(private http:HttpClient) {}

  getAllStudent(url:any){
    return this.http.get(`${this.apiUrl}${url}`);
  }

  getStudentClassView(url:any){
    return this.http.get(`${this.apiUrl}${url}`);
  }

  getSCByProcedure(url:any){
    return this.http.get(`${this.apiUrl}${url}`);
  }


}
