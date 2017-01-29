import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PolymerElement } from '@vaadin/angular2-polymer';
import { AppComponent }  from './app.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/module.home';

@NgModule({
  imports:      [ 
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    HomeModule
     ],
  declarations: [ AppComponent
  ],
  bootstrap:    [ AppComponent ],
  
  providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
    ]
})
export class AppModule { }
