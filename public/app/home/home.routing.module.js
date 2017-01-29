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
var percorso_list_component_1 = require("./../percorso/percorso.list.component");
var dipendente_component_1 = require("./../dipendente/dipendente-edit/dipendente.component");
var dipendente_list_component_1 = require("./../dipendente/dipendente.list.component");
var percorso_component_1 = require("./../percorso/percorso-edit/percorso.component");
var detalle_scheda_vettura_component_1 = require("./../scheda/detalle_scheda_vettura/detalle.scheda.vettura.component");
var scheda_vettura_list_component_1 = require("./../scheda/scheda.vettura.list.component");
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var core_1 = require("@angular/core");
var AuthGuard_1 = require("../services/AuthGuard");
var vettura_component_1 = require("../vettura/vettura.component");
var routes = [
    { path: 'office',
        component: home_component_1.HomeComponent, canActivate: [AuthGuard_1.AuthGuard],
        children: [
            { path: '', component: vettura_component_1.VetturaComponent },
            { path: 'vettura', component: vettura_component_1.VetturaComponent },
            { path: 'scheda-vettura', component: scheda_vettura_list_component_1.SchedaVetturaListComponent },
            { path: 'scheda-vettura/detalle/:id', component: detalle_scheda_vettura_component_1.DetalleSchedaVetturaComponent },
            { path: 'percorso', component: percorso_list_component_1.PercorsoListComponent },
            { path: 'percorso/edit/:id', component: percorso_component_1.PercorsoComponent },
            //dipendente
            { path: 'dipendente', component: dipendente_list_component_1.DipendenteListComponent },
            { path: 'dipendente/edit/:id', component: dipendente_component_1.DipendenteComponent },
        ]
    }
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    return HomeRoutingModule;
}());
HomeRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
        providers: [AuthGuard_1.AuthGuard]
    }),
    __metadata("design:paramtypes", [])
], HomeRoutingModule);
exports.HomeRoutingModule = HomeRoutingModule;

//# sourceMappingURL=home.routing.module.js.map
