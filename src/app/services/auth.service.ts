import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'userId';
  private apiBaseUrl = `${environment.apiBaseUrl}/user`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/login`, credentials);
  }

  register(data: { email: string; password: string; confirmPassword: string }) {
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/register`, data);
  }


  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth']);
  }

  getProfile() {
    return this.http.get<{
      username: string;
      firstName: string;
      lastName: string;
      email: string;
    }>(`${this.apiBaseUrl}/profile`);
  }

  updateProfile(data: { username: string; firstName: string; lastName: string }) {
    return this.http.put(`${environment.apiBaseUrl}/user/profile`, data);
  }

}
