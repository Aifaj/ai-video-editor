import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'dashbord', loadComponent: () => import('./components/dashbord/dashbord').then(m => m.Dashbord)},
    {path:'', redirectTo:'dashbord', pathMatch:'full'},

];
