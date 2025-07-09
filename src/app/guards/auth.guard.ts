import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'  // Makes the guard available app-wide without needing to register in providers
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  // Determines whether the user can access a protected route
  canActivate(): boolean {
    // Check for authentication token (or user identifier)
    const token = localStorage.getItem('userId');

    if (token) {
      // Token exists, allow access to the route
      return true;
    } else {
      // No token: redirect to the auth (login/register) page
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
