import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    
    {path: '' , component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent , canActivate: [authGuard] }, 
    {path: 'home' , component: HomeComponent},
    {path: 'user-page' , component: UserPageComponent},
      { 
        path: 'users', 
        loadComponent: () => import('./dashboard/user/user.component')
          .then(m => m.UserComponent) 
      },
      { 
        path: 'transactions', 
        loadComponent: () => import('./dashboard/transaction/transaction.component')
          .then(m => m.TransactionComponent) 
      }
    
];
