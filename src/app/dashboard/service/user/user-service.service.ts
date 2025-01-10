import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly API_URL = 'http://localhost:8080/api/v1/admin/user'
  constructor(private http: HttpClient) { }

  public addUser(userForm: FormGroup): void{
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
    });
      this.http.post(this.API_URL + "/new" , userForm , {
        headers,
        withCredentials: true
      }).subscribe({
        next: (response) => {
          console.log("add successful: " + response);
        }, 
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
  }

  public getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
   
    return this.http.get(this.API_URL + "/get", { headers })
   }
}
