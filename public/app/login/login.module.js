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
var shared_module_1 = require("../shared/shared.module");
var login_routing_module_1 = require("./login.routing.module");
var login_component_1 = require("./login.component");
var core_1 = require("@angular/core");
var angular2_polymer_1 = require("@vaadin/angular2-polymer");
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, login_routing_module_1.LoginRoutingModule],
        declarations: [
            login_component_1.LoginComponent,
            //PolymerElement('app-layout'),
            angular2_polymer_1.PolymerElement('paper-card'),
            angular2_polymer_1.PolymerElement('paper-input'),
            angular2_polymer_1.PolymerElement('paper-button')
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
    }),
    __metadata("design:paramtypes", [])
], LoginModule);
exports.LoginModule = LoginModule;

//# sourceMappingURL=login.module.js.map
