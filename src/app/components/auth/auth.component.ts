import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode: boolean = true; // Controls whether the form is in login or registration mode
  errorMessage: string = '';   // Stores error messages to show in the template

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with required fields and validators
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  // Toggle between login and register modes
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  // Handle form submission for both login and registration
  onSubmit(): void {
    if (this.authForm.invalid) return;

    const { email, password, confirmPassword } = this.authForm.value;

    // Validate password confirmation in registration mode
    if (!this.isLoginMode && password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Decide which API call to use: login or register
    const request$ = this.isLoginMode
      ? this.authService.login({ email, password })
      : this.authService.register({ email, password, confirmPassword });

    // Handle the response from the backend
    request$.subscribe({
      next: (res) => {
        this.authService.setToken(res.token);           // Save token to local storage/service
         this.authService.setFirstName(res.firstName);  // Store user's first name for later use (e.g., greeting in header)
        const redirectTo = this.isLoginMode ? '/dashboard' : '/profile';
        this.router.navigate([redirectTo]);
      },
    });

  }
}
