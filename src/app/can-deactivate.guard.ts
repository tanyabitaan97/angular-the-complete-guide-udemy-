import { CanDeactivateFn } from '@angular/router';
import { GuardedEditComponent } from './guarded-edit.component';

export const canDeactivateGuard: CanDeactivateFn<GuardedEditComponent> = (component) => {
  if (component.hasUnsavedChanges) {
    return confirm('You have unsaved changes. Really leave?');
  }
  return true;
};
