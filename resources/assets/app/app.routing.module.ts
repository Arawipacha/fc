import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/AuthGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'office', pathMatch: 'full'},
  //{ path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule' },
  //{path: 'login',component: LoginComponent},
  //{path: 'office', canActivate: [AuthGuard],  loadChildren :  './home/module.home#HomeModule'}
  //...routingComponents
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}