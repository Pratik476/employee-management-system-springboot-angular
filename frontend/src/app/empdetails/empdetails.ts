import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empdetails.html',
  styleUrls: ['./empdetails.css']
})
export class Employees implements OnInit {

  employees: any[] = [];
  loading = true;

  constructor(
    private userService: User,
    private cdr: ChangeDetectorRef,
       private router:Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllEmp().subscribe({
      next: (res: any[]) => {
        console.log('EMP DATA 👉', res);
        this.employees = res;
        this.loading = false;

        this.cdr.detectChanges();   // ⭐ IMPORTANT
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  edit(id:number)
  {
    this.router.navigate(['/edit-page',id])
  }

  delete(id: number): void {
  if (confirm('Are you sure you want to delete this employee? ❌')) {
    this.userService.deleteEmp(id).subscribe({
      next: () => {
        alert('Employee Deleted Successfully ✅');

        // 🔥 NET REFRESH (NO ROUTER, NO OTHER FILE)
        this.employees = this.employees.filter(emp => emp.id !== id);

        this.cdr.detectChanges(); // ⭐ force UI update
      },
      error: () => alert('Delete Failed ❌')
    });
  }
}



}
