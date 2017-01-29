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
var core_1 = require("@angular/core");
var home_event_services_1 = require("./home.event.services");
var HomeComponent = (function () {
    function HomeComponent(eventHomeService) {
        this.eventHomeService = eventHomeService;
        this.title = 'Pagin home!';
        this.item = 1;
        this.controlMenu = new home_event_services_1.ControlMenu();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.eventHomeService.getTitleChangeEmitter()
            .subscribe(function (item) { return _this.getTitle(item); });
        this.subscription = this.eventHomeService.getControlMenuChangeEmitter()
            .subscribe(function (item) { return _this.getControlMenu(item); });
    };
    HomeComponent.prototype.getControlMenu = function (controlmenu) {
        this.controlMenu = controlmenu;
        //console.log(this.controlMenu);
    };
    HomeComponent.prototype.getTitle = function (title) {
        this.title = title;
    };
    HomeComponent.prototype.save = function (item) {
        //console.log('selected nav item ');
        this.eventHomeService.emitSaveChangeEvent(item);
    };
    HomeComponent.prototype.nuovo = function (sw) {
        if (sw) {
            this.eventHomeService.emitNewChangeEvent(sw);
        }
    };
    HomeComponent.prototype.back = function (item) {
        console.log('selected indietro back ');
        this.eventHomeService.emitBackChangeEvent(item);
    };
    HomeComponent.prototype.edit = function (item) {
        console.log('selected indietro edit ');
        this.eventHomeService.emitEditChangeEvent(item);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home',
        templateUrl: 'home.component.html',
    }),
    __metadata("design:paramtypes", [home_event_services_1.HomeEventosService])
], HomeComponent);
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
