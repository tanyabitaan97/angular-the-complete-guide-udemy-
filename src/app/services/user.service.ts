import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private takenUsernames = ['admin', 'test', 'superuser'];

  isUsernameTaken(username: string): Observable<boolean> {
    const isTaken = this.takenUsernames
      .map(u => u.toLowerCase())
      .includes(username.toLowerCase());
    return of(isTaken).pipe(delay(500));
  }
}
