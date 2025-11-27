import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { HostDemoComponent } from './host-demo/host-demo.component';
import { ContentViewDemoComponent } from './content-view-demo/content-view-demo.component';
import { LOGGING_TOKEN } from './logging.token';
import { ConsoleLoggingService } from './logging.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UsersComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';
import { GuardedEditComponent } from './guarded-edit.component';
import { userResolver } from './user.resolver';
import { titleResolver } from './title.resolver';
import { authGuard } from './auth.guard';
import { canDeactivateGuard } from './can-deactivate.guard';
import { AnimDemoComponent } from './anim-demo/anim-demo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProductComponent } from './product/product.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CounterSignalComponent } from './counter-signal/counter-signal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
    title: 'Home',
    data: { description: 'Welcome page', staticValue: 42 },
  },

  {
    path: 'users',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user.component').then((m) => m.UsersComponent),
        title: 'Users',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./user-detail.component').then(
            (m) => m.UserDetailComponent
          ),
        title: titleResolver,
        resolve: { user: userResolver },
        runGuardsAndResolvers: 'paramsChange',
      },
    ],
  },

  {
    path: 'parent',
    loadComponent: () =>
      import('./parent.component').then((m) => m.ParentComponent),
    data: { parentInfo: 'This is parent route static data' },
    children: [
      {
        path: 'child/:childId',
        loadComponent: () =>
          import('./child.component').then((m) => m.ChildComponent),
        title: 'Child',
      },
    ],
  },

  {
    path: 'guarded',
    canActivate: [authGuard],
    children: [
      {
        path: 'edit',
        loadComponent: () =>
          import('./guarded-edit.component').then(
            (m) => m.GuardedEditComponent
          ),
        canDeactivate: [canDeactivateGuard],
        title: 'Guarded Edit',
      },
    ],
  },

  { path: '**', redirectTo: 'home' },
];



@NgModule({
  declarations: [CustomInputComponent, HostDemoComponent, AnimDemoComponent,
    ContentViewDemoComponent, AppComponent, HomeComponent, UsersComponent, UserDetailComponent,
    ParentComponent, ChildComponent, GuardedEditComponent, ProductComponent,AuthComponent, DashboardComponent,
    CounterSignalComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }), HttpClientModule, CommonModule, ReactiveFormsModule, BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })],
  providers: [
    { provide: LOGGING_TOKEN, useClass: ConsoleLoggingService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }