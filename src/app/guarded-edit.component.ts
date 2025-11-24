import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guarded-edit',
  template: `
    <h2>Guarded Edit</h2>
    <textarea [(ngModel)]="text"></textarea>
    <p>Unsaved changes: {{ hasUnsavedChanges }}</p>
  `
})
export class GuardedEditComponent {
  text = '';
  get hasUnsavedChanges(): boolean {
    return this.text.trim().length > 0;
  }
}
