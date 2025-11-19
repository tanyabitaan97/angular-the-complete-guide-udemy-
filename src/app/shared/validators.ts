
import {
    AbstractControl,
    AsyncValidatorFn,
    FormArray,
    FormGroup,
    ValidationErrors,
    ValidatorFn
  } from '@angular/forms';
  import { Observable, of, timer } from 'rxjs';
  import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

  export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    if (!password || !confirmPassword) {
      return null;
    }
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  

  export function atLeastOnePhoneValidator(control: AbstractControl): ValidationErrors | null {
    const phones = control.get('phones') as FormArray | null;
    if (!phones || phones.length === 0) {
      return { noPhones: true };
    }
  
    const hasValue = phones.controls.some(c => !!c.get('number')?.value);
    return hasValue ? null : { noPhones: true };
  }
  

  export function forbiddenUsernameValidator(forbidden: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase?.();
      if (!value) return null;
      return value === forbidden.toLowerCase() ? { forbiddenUsername: { value } } : null;
    };
  }
  
 
  export function usernameAvailableValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
  
      return timer(300).pipe(
        switchMap(() => userService.isUsernameTaken(control.value)),
        map(isTaken => (isTaken ? { usernameTaken: true } : null))
      );
    };
  }
  