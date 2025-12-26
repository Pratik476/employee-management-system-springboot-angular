import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private userService: User,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ⭐ IMPORTANT
  ) {}

  login() {
    this.userService.loginUser(this.username, this.password).subscribe({
      next: () => {
        this.errorMessage = '';
        this.authService.loginSuccess();
        this.router.navigate(['/employees']);
      },
      error: err => {
        console.log('LOGIN FAILED FULL ERROR', err);

        // 🔴 BACKEND MESSAGE
        this.errorMessage =
          err.error?.Message ||    // 👈 capital M (backend)
          err.error?.message ||
          'Invalid Credentials';

        // ⭐ FORCE UI UPDATE
        this.cdr.detectChanges();
      }
    });
  }
}
