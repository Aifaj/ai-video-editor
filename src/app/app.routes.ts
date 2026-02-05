import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'dashbord', loadComponent: () => import('./components/dashbord/dashbord').then(m => m.Dashbord)},
    {path:'editor', loadComponent: () => import('./components/editor/editor').then(m => m.Editor)},
    {path:'giminiAiphoto', loadComponent: () => import('./components/gimini-aiphoto-component/gimini-aiphoto-component').then(m => m.GiminiAiphotoComponent)},
    {path:'', redirectTo:'dashbord', pathMatch:'full'},

];
