import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup; // Form group to hold profile form fields
  loading = true;         // Indicates whether the profile data is still loading

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize the form with validation rules
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Load the user's profile data on component initialization
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue(data); // Populate form with profile data
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.loading = false;
      }
    });
  }

  onSave(): void {
    // Prevent submission if the form is invalid
    if (this.profileForm.invalid) return;

    // Extract editable values from the form
    const { username, firstName, lastName } = this.profileForm.getRawValue();

    // Submit the updated profile to the backend
    this.authService.updateProfile({ username, firstName, lastName }).subscribe({
      next: () => {
        console.log('Profile updated successfully');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }
}
