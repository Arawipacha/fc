import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/AuthGuard';
import { AuthService } from '../services/auth-service';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent }
  ])],
  exports: [RouterModule],
  providers: [ AuthGuard,
    AuthService]
})
export class LoginRoutingModule {}