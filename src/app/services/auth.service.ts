import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Makes this service globally available throughout the app
})
export class AuthService {
  private tokenKey = 'userId'; // Key for storing token in localStorage
  private nameKey = 'firstName'; // Key for storing user's first name

  private apiBaseUrl = `${environment.apiBaseUrl}/user`; // API endpoint prefix

  // Subject to hold the current first name reactively
  private firstNameSubject = new BehaviorSubject<string>(this.getFirstNameFromStorage());

  // Observable exposed to components for reacting to changes
  public firstName$ = this.firstNameSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Sends login request to the backend, expects token + first name
  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string; firstName: string }>(`${this.apiBaseUrl}/login`, credentials);
  }

  // Sends registration request to the backend, expects token + first name
  register(data: { email: string; password: string; confirmPassword: string }) {
    return this.http.post<{ token: string; firstName: string }>(`${this.apiBaseUrl}/register`, data);
  }

  // Save token to local storage
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Retrieve first name from local storage (used as fallback on app load)
  private getFirstNameFromStorage(): string {
    return localStorage.getItem(this.nameKey) || '';
  }

  // Save first name to local storage and notify subscribers
  setFirstName(name: string) {
    localStorage.setItem(this.nameKey, name);
    this.firstNameSubject.next(name); // Notify all components of the change
  }

  // Get current value of first name (synchronously)
  getFirstName(): string {
    return this.firstNameSubject.value;
  }

  // Check if user is currently logged in (based on token existence)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Clear user session (token + name) and redirect to login page
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.nameKey);
    this.firstNameSubject.next(''); // Clear reactive name on logout
    this.router.navigate(['/auth']);
  }

  // Retrieve user profile from backend
  getProfile() {
    return this.http.get<{
      username: string;
      firstName: string;
      lastName: string;
      email: string;
    }>(`${this.apiBaseUrl}/profile`);
  }

  // Send updated profile information to backend
  updateProfile(data: { username: string; firstName: string; lastName: string }) {
    return this.http.put(`${this.apiBaseUrl}/profile`, data);
  }
}
