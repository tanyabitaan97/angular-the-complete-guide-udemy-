// src/app/auth/auth.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = signal(true);
   authForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
        this.authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }



  switchMode() {
    this.isLoginMode.update(v => !v);
  }

  submit() {
    const { email, password } = this.authForm.value;
    if (!email || !password) return;

    if (this.isLoginMode()) this.auth.login(email, password);
    else this.auth.signup(email, password);

    this.router.navigate(['/dashboard']);
  }
}
