import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],

      password: ['', Validators.required],

      role: ['General User', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.loading = false;

          const role =
            this.authService.getRole();

          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },

        error: () => {
          this.loading = false;

          alert('Invalid Credentials');
        },
      });
  }
}