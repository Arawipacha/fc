"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var dipendente_component_1 = require("./../dipendente/dipendente-edit/dipendente.component");
var percorso_component_1 = require("./../percorso/percorso-edit/percorso.component");
var percorso_list_component_1 = require("./../percorso/percorso.list.component");
var dipendente_list_component_1 = require("./../dipendente/dipendente.list.component");
var detalle_scheda_vettura_component_1 = require("./../scheda/detalle_scheda_vettura/detalle.scheda.vettura.component");
var scheda_vettura_list_component_1 = require("./../scheda/scheda.vettura.list.component");
var VetturaList_component_1 = require("./../vettura/VetturaList/VetturaList.component");
var core_1 = require("@angular/core");
var home_component_1 = require("./home.component");
var menu_component_1 = require("./../home/menu/menu.component");
var angular2_polymer_1 = require("@vaadin/angular2-polymer");
var shared_module_1 = require("../shared/shared.module");
var home_routing_module_1 = require("./home.routing.module");
var home_event_services_1 = require("./home.event.services");
var http_1 = require("@angular/http");
var vettura_component_1 = require("../vettura/vettura.component");
exports.HomeComponents = [home_component_1.HomeComponent,
    menu_component_1.MenuComponent,
    vettura_component_1.VetturaComponent,
    VetturaList_component_1.VetturaListComponent,
    scheda_vettura_list_component_1.SchedaVetturaListComponent,
    detalle_scheda_vettura_component_1.DetalleSchedaVetturaComponent,
    percorso_component_1.PercorsoComponent,
    percorso_list_component_1.PercorsoListComponent,
    dipendente_list_component_1.DipendenteListComponent,
    dipendente_component_1.DipendenteComponent
]; //meteremos todos los componentes
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule, home_routing_module_1.HomeRoutingModule, http_1.HttpModule
        ],
        declarations: exports.HomeComponents.concat([
            angular2_polymer_1.PolymerElement('paper-input'),
            angular2_polymer_1.PolymerElement('vaadin-combo-box'),
            angular2_polymer_1.PolymerElement('vaadin-grid'),
            angular2_polymer_1.PolymerElement('paper-textarea'),
        ]),
        providers: [home_event_services_1.HomeEventosService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    }),
    __metadata("design:paramtypes", [])
], HomeModule);
exports.HomeModule = HomeModule;
//export const BackOfficeRouting: ModuleWithProviders = RouterModule.forChild(BackOfficeRoutes); 

//# sourceMappingURL=module.home.js.map
