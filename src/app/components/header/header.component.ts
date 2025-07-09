import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  firstName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to first name changes (login/logout)
    this.authService.firstName$.subscribe(name => {
      this.firstName = name;
    });
  }

  // Navigates to the dashboard page when the user clicks the app logo or a nav link
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Logs the user out and clears auth state (token/session/etc.)
  onLogout() {
    this.authService.logout();
  }
}
