import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
    private baseUrl = 'https://qr-code-steps.vercel.app';
  
    constructor(private http: HttpClient) {}
  
    getNotLoggedInUsers(): Observable<any> {
      return this.http.get(`${this.baseUrl}/notloggedinusers`);
    }
  
    getLoggedInUsers(): Observable<any> {
      return this.http.get(`${this.baseUrl}/loggedusers`);
    }
  
    logUserIn(userId: number): Observable<any> {
      return this.http.post(`${this.baseUrl}/log_user/${userId}`, {});
    }
  
    getUserByEmail(email: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/user`, { params: { email } });
    }
  
    getAllUsers(): Observable<any> {
      return this.http.get(`${this.baseUrl}/users`);
    }
  
    addUser(user: { firstName: string; lastName: string; email: string }): Observable<any> {
      return this.http.post(`${this.baseUrl}/user`, user);
    }
  }
  