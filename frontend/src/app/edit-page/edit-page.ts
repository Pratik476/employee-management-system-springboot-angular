import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-page.html',
  styleUrls: ['./edit-page.css']
})
export class EditPage implements OnInit {

  empId!: number;

  employee = {
    name: '',
    email: '',
    salary: '',
    address: '',
    gender: '',
    dep: ''
  };

  constructor(
    private route: ActivatedRoute,
    private userService: User,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.empId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getEmpById(this.empId).subscribe({
      next: (res: any) => {
        this.employee = { ...res };   // ✅ SAFE ASSIGN
        this.cdr.detectChanges();     // ✅ AUTO REFRESH
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateEmployee(): void {
    this.userService.updateEmp(this.empId, this.employee).subscribe({
      next: () => {
        alert('Employee Updated Successfully ✅');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


deleteEmployee(): void {
  if (confirm('Are you sure you want to delete this employee? ❌')) {
    this.userService.deleteEmp(this.empId).subscribe({
      next: () => {
        alert('Employee Deleted Successfully ✅');

        // 🔁 Force change detection before navigation
        this.cdr.detectChanges();

        // navigate as-is (तू सांगितल्याप्रमाणे बदल नाही)
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        alert('Delete Failed ❌');
      }
    });
  }
}



}
