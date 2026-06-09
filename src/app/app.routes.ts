import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'dashbord', loadComponent: () => import('./components/dashbord/dashbord').then(m => m.Dashbord)},
    {path:'editor', loadComponent: () => import('./components/editor/editor').then(m => m.Editor)},
    {path:'giminiAiphoto', loadComponent: () => import('./components/gimini-aiphoto-component/gimini-aiphoto-component').then(m => m.GiminiAiphotoComponent)},
    {path:'photoEditor', loadComponent:() => import('./components/photo-editor/photo-editor').then(m => m.PhotoEditor)},
    {path:'Studentclass', loadComponent: () => import('./components/studentclass/studentclass').then(m => m.Studentclass)},
    {path:'login', loadComponent: () => import('./components/login/login').then(m => m.Login)},

    // for jwt security
    {path:"jwtLogin", loadComponent:() => import('./jwt/component/jwt-login/jwt-login').then(m => m.JwtLogin)},
    {path:'jwtAdmin', loadComponent: () => import('./jwt/component/admin-dash/admin-dash').then(m => m.AdminDash)},
    {path:'jwtUser', loadComponent: () => import('./jwt/component/user-dash/user-dash').then(m => m.UserDash)},
    {path:'', redirectTo:'jwtLogin', pathMatch:'full'},


    // {path:'', redirectTo:'login', pathMatch:'full'},
     //{path:'', redirectTo:'dashbord', pathMatch:'full'},
];
