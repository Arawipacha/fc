import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './components/comp1/app.component';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { HttpModule}    from '@angular/http';

import { FormsModule } from '@angular/forms';


import {MainRouterOutlet} from './main.outlet';
import {routing} from './app.routes';


@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule ,
    FormsModule,
    routing,

  
  ],
  declarations: [ 
    LoginForm,
  ],

  bootstrap:    [ 

    MainRouterOutlet 
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }