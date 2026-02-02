import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'dashbord', loadComponent: () => import('./components/dashbord/dashbord').then(m => m.Dashbord)},
    {path:'editor', loadComponent: () => import('./components/editor/editor').then(m => m.Editor)},
    {path:'', redirectTo:'editor', pathMatch:'full'},

];
