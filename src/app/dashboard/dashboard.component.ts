// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <h1>Dashboard</h1>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
