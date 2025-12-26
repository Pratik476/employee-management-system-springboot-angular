import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user'; // ✅ SAME SERVICE

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  showPopup = false;
  popupTimer: any;
  serverErrors: any = {};
  isSubmitting = false; // 🔹 Prevent double submit

  constructor(
    private userService: User,   // ✅ VALID
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  register(form: NgForm) {

    if (this.isSubmitting) return; // 🔹 Already submitting
    this.isSubmitting = true;

    this.serverErrors = {};
    console.log('FULL FORM 👉', form.value);
    console.log('PASSWORD 👉', form.value.password);

    this.userService.saveEmployee(form.value).subscribe({
      next: (res: any) => {
        this.showPopup = true;
        this.isSubmitting = false;

        if (this.popupTimer) {
          clearTimeout(this.popupTimer);
        }

        this.popupTimer = setTimeout(() => {
          this.showPopup = false;
          this.cdr.detectChanges();
          this.router.navigate(['/employees']);
        }, 3000);

        form.resetForm();
      },
      error: (err) => {
        console.error('API ERROR', err);
        this.isSubmitting = false;

        if (err.status === 400) {
          this.serverErrors = err.error;
        } else if (err.status === 409) {
          this.serverErrors = { message: 'Employee already exists!' };
        } else {
          this.serverErrors = { message: 'Something went wrong. Try again!' };
        }
      }
    });
  }
}
