
// import { Component, Signal } from '@angular/core';
// import { ApiService } from './services/api.service';
// import { Post } from './models/post.model';

// @Component({
//   selector: 'app-root',
//   template: `
//     <h2>Search Posts</h2>
//     <input type="text" placeholder="Type to search..." (input)="onSearch($event)" />

//     <h3>Search Results</h3>
//     <div *ngFor="let post of searchResults()">{{ post.title }}</div>

//     <hr />
//     <button (click)="loadMerged()">Load Merged Posts</button>
//     <div *ngFor="let post of posts()">{{ post.title }}</div>
//   `
// })
// export class AppComponent {
//   posts!: Signal<Post[]>;   
//   searchResults!: Signal<Post[]>;  
//   constructor(private apiService: ApiService) {}
//     ngOnInit(): void {
//     this.posts = this.apiService.postsSignal;
//     this.searchResults = this.apiService.searchResultsSignal;
//   }
//   onSearch(e: any) { this.apiService.searchPosts(e.target.value); }
//   loadMerged() { this.apiService.getPosts(); }
// }
/*
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserService } from './services/user.service';

import { passwordMatchValidator,
  atLeastOnePhoneValidator,
  forbiddenUsernameValidator,
  usernameAvailableValidator } 
  from './shared/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.profileForm = this.fb.group(
      {
        account: this.fb.group({
          username: [
            '',
            {
              validators: [
                Validators.required,
                Validators.minLength(3),
                forbiddenUsernameValidator('admin')
              ],
              asyncValidators: [usernameAvailableValidator(this.userService)],
              updateOn: 'blur'
            }
          ],
          email: ['', [Validators.required, Validators.email]],

          passwordGroup: this.fb.group(
            {
              password: ['', [Validators.required, Validators.minLength(6)]],
              confirmPassword: ['', [Validators.required]]
            },
            {
              validators: [passwordMatchValidator]
            }
          )
        }),

        contact: this.fb.group(
          {
            phones: this.fb.array([this.buildPhone()]),
            addresses: this.fb.array([this.buildAddress()])
          },
          {
            validators: [atLeastOnePhoneValidator]
          }
        ),

        termsAccepted: [false, [Validators.requiredTrue]]
      }
    );
  }


  private buildPhone(): FormGroup {
    return this.fb.group({
      type: ['mobile', Validators.required],
      number: ['', Validators.maxLength(15)]
    });
  }

  private buildAddress(): FormGroup {
    return this.fb.group({
      line1: ['', Validators.required],
      line2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }


  get account(): FormGroup {
    return this.profileForm.get('account') as FormGroup;
  }

  get passwordGroup(): FormGroup {
    return this.account.get('passwordGroup') as FormGroup;
  }

  get contact(): FormGroup {
    return this.profileForm.get('contact') as FormGroup;
  }

  get phones(): FormArray {
    return this.contact.get('phones') as FormArray;
  }

  get addresses(): FormArray {
    return this.contact.get('addresses') as FormArray;
  }

  get username(): AbstractControl | null {
    return this.account.get('username');
  }


  addPhone(): void {
    this.phones.push(this.buildPhone());
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  submit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    console.log('Form value:', this.profileForm.value);
    console.log('Form raw value:', this.profileForm.getRawValue());
  }
}
*/

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular 17+ Router Demo</h1>

    <h1>Angular 17 Animation with AppModule</h1>
    <app-anim-demo></app-anim-demo>

    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        Home
      </a>
      <a routerLink="/users" routerLinkActive="active">Users</a>
      <a routerLink="/parent" routerLinkActive="active">Nested</a>
      <a routerLink="/guarded/edit" routerLinkActive="active">Guarded Edit</a>
    </nav>

    <hr />

    <router-outlet></router-outlet>
  `,
  styles: [`
    nav a { margin-right: 1rem; }
    .active { font-weight: bold; text-decoration: underline; }
  `]
})
export class AppComponent {}


