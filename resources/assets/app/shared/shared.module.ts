import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { PolymerElement } from '@vaadin/angular2-polymer';

@NgModule({
  imports:      [ CommonModule ,FormsModule],
  declarations: [
    
],
  exports:      [ 
                  CommonModule, FormsModule ],
  
})
export class SharedModule { }
