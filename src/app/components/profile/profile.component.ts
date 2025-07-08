// profile.component.ts
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
  profileForm: FormGroup;
  loading = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.loading = false;
      }
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) return;
    const { username, firstName, lastName } = this.profileForm.getRawValue();

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
