import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginForm } from './module/authentication/form-login-component';
import { FormUser } from './module/authentication/form-user-component';
import {BackOffice} from './module/backoffice/back-office-component';


export const appRoutes: Routes=[
{path:  'login',  component:  LoginForm},
{path:  '',   redirectTo:'/login',pathMatch: 'full'},
{path:  'register',   component:  FormUser},
/*{path: 'home', component: BackOffice,
children:[
    {path: '', component: BackOffice}
]
}*/
{path:  'home',   loadChildren :  './build/app/module/backoffice/back-office-module#BackOfficeModule'}


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
//,{ useHash: true }
