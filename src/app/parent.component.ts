import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parent',
  template: `
    <h2>Parent Route</h2>
    <p>Parent static data: {{ parentInfo }}</p>

    <ul>
      <li><a [routerLink]="['child', 1]">Child 1</a></li>
      <li><a [routerLink]="['child', 2]">Child 2</a></li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class ParentComponent {
  private route = inject(ActivatedRoute);
  parentInfo = this.route.snapshot.data['parentInfo'];
}
