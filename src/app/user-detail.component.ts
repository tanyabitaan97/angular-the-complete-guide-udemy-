import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <h2>User Detail</h2>
    <p>id: {{ id }}</p>
    <pre>User data: {{ userData | json }}</pre>

    <p>From snapshot: {{ snapshotId }}</p>
  `
})
export class UserDetailComponent implements OnInit {
  @Input() id!: number;

  userData: any;

  snapshotId!: string | null;

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.userData = this.route.snapshot.data['user'];
    this.snapshotId = this.route.snapshot.paramMap.get('id');
  }
}
