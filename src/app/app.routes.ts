import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'dashbord', loadComponent: () => import('./components/dashbord/dashbord').then(m => m.Dashbord)},
    {path:'editor', loadComponent: () => import('./components/editor/editor').then(m => m.Editor)},
    {path:'giminiAiphoto', loadComponent: () => import('./components/gimini-aiphoto-component/gimini-aiphoto-component').then(m => m.GiminiAiphotoComponent)},
    {path:'photoEditor', loadComponent:() => import('./components/photo-editor/photo-editor').then(m => m.PhotoEditor)},
    {path:'Studentclass', loadComponent: () => import('./components/studentclass/studentclass').then(m => m.Studentclass)},
    {path:'login', loadComponent: () => import('./components/login/login').then(m => m.Login)},

    // {path:'', redirectTo:'login', pathMatch:'full'},
     {path:'', redirectTo:'dashbord', pathMatch:'full'},
];
