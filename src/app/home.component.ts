import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <h2>Home</h2>
    <p>Static data from route: {{ description }} (value: {{ staticValue }})</p>
    <button (click)="reloadPage()">
      Reload this page (router)
    </button>
  `
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  description = this.route.snapshot.data['description'];
  staticValue = this.route.snapshot.data['staticValue'];

  reloadPage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { timestamp: Date.now() },
      queryParamsHandling: 'merge'
    });
  }
}
