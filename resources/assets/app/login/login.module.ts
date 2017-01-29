import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { AuthService } from '../services/auth-service';

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [
    LoginComponent,
    //PolymerElement('app-layout'),
    PolymerElement('paper-card'),
    PolymerElement('paper-input'),
    PolymerElement('paper-button')
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //providers:    [ AuthService ]
})
export class LoginModule { }