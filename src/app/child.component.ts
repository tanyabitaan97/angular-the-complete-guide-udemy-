import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child',
  template: `
    <h3>Child Route</h3>
    <p>Child id from params: {{ childId }}</p>
    <p>Parent route data (parentInfo): {{ parentInfo }}</p>
  `
})
export class ChildComponent {
  private route = inject(ActivatedRoute);

  childId = this.route.snapshot.paramMap.get('childId');

  parentInfo = this.route.parent?.snapshot.data['parentInfo'];
}
