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
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    data: { description: 'Welcome page', staticValue: 42 }
  },

  {
    path: 'users',
    component: UsersComponent,
    title: 'Users'
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    title: titleResolver,
    resolve: { user: userResolver },
    runGuardsAndResolvers: 'paramsChange'
  },

  {
    path: 'parent',
    component: ParentComponent,
    title: 'Parent',
    data: { parentInfo: 'This is parent route static data' },
    children: [
      {
        path: 'child/:childId',
        component: ChildComponent,
        title: 'Child'
      }
    ]
  },

  {
    path: 'guarded',
    canActivate: [authGuard],
    children: [
      {
        path: 'edit',
        component: GuardedEditComponent,
        canDeactivate: [canDeactivateGuard],
        title: 'Guarded Edit'
      }
    ]
  },

  { path: '**', redirectTo: 'home' }
];
