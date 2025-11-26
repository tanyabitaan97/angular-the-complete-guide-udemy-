import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string, password: string) {
    localStorage.setItem('token', 'dummy-token');
  }

  signup(email: string, password: string) {
    localStorage.setItem('token', 'dummy-token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
