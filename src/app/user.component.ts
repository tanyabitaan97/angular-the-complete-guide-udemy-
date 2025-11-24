import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
    <h2>Users</h2>
    <ul>
      <li *ngFor="let user of users">
        <a [routerLink]="[user.id]" routerLinkActive="active">
          {{ user.name }} (id: {{ user.id }})
        </a>
      </li>
    </ul>
  `
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Alice'  },
    { id: 2, name: 'Bob'    },
    { id: 3, name: 'Charlie'}
  ];
}
