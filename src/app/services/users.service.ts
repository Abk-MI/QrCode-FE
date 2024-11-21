import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://qr-code-steps.vercel.app';
  // private baseUrl = 'http://localhost:3000';

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

  addUser(
    user: {
      firstName: string;
      lastName: string;
      email: string;
    },
    qrcode: any
  ): Observable<any> {
    console.log(qrcode.toString());
    console.log(qrcode);

    const data = { ...user, qrcode: qrcode.toString() };
    return this.http.post(`${this.baseUrl}/user`, data);
  }

  generateQrCodeLink(email: string) {
    return `${this.baseUrl}/loguserinfo?email=${email}`;
  }
}
