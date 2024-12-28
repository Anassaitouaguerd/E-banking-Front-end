import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent }, 
    {path: 'home' , component: HomeComponent},
    {path: 'user-page' , component: UserPageComponent}
    
];
