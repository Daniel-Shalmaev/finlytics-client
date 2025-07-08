import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) { }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onLogout() {
    this.authService.logout();
  }
}
