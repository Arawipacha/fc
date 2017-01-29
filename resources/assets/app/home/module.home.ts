import { DipendenteComponent } from './../dipendente/dipendente-edit/dipendente.component';
import { PercorsoComponent } from './../percorso/percorso-edit/percorso.component';

import { PercorsoListComponent } from './../percorso/percorso.list.component';

import { DipendenteListComponent } from './../dipendente/dipendente.list.component';

import { DetalleSchedaVetturaComponent } from './../scheda/detalle_scheda_vettura/detalle.scheda.vettura.component';
import { SchedaVetturaListComponent } from './../scheda/scheda.vettura.list.component';
import { VetturaListComponent } from './../vettura/VetturaList/VetturaList.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { MenuComponent } from './../home/menu/menu.component';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeEventosService } from './home.event.services';
import { HttpModule } from '@angular/http';
import { VetturaComponent } from '../vettura/vettura.component';

export const HomeComponents = [HomeComponent,
    MenuComponent,

    VetturaComponent,
    VetturaListComponent,
    SchedaVetturaListComponent,
    DetalleSchedaVetturaComponent,
    PercorsoComponent,
    PercorsoListComponent,
    DipendenteListComponent,
    DipendenteComponent
]; //meteremos todos los componentes

@NgModule({
    imports: [
        SharedModule, HomeRoutingModule, HttpModule
    ],
    declarations: [
        ...HomeComponents,
        PolymerElement('paper-input'),
        PolymerElement('vaadin-combo-box'),
        PolymerElement('vaadin-grid'),
        PolymerElement('paper-textarea'),
        
        
    ],
    providers: [HomeEventosService],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }







//export const BackOfficeRouting: ModuleWithProviders = RouterModule.forChild(BackOfficeRoutes);