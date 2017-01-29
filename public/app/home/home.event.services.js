"use strict";
var core_1 = require("@angular/core");
var HomeEventosService = (function () {
    function HomeEventosService() {
        this.navchange = new core_1.EventEmitter();
        /*emitir  activar los controles del menu principal */
        this.controlMenuComponentChange = new core_1.EventEmitter();
        this.titleComponentChange = new core_1.EventEmitter();
        /**
         * evento new boton nuevo
         */
        this.newComponentChange = new core_1.EventEmitter();
        /**
         * evento new boton editare
         */
        this.editComponentChange = new core_1.EventEmitter();
        /**
         * evento save boton salvare
         */
        this.saveComponentChange = new core_1.EventEmitter();
        /**
         * evento back boton indietro
         */
        this.backComponentChange = new core_1.EventEmitter();
    }
    HomeEventosService.prototype.emitNavChangeEvent = function (number) {
        this.navchange.emit(number);
    };
    HomeEventosService.prototype.getNavChangeEmitter = function () {
        return this.navchange;
    };
    HomeEventosService.prototype.emitControlMenuChangeEvent = function (controlMenu) {
        this.controlMenuComponentChange.emit(controlMenu);
    };
    HomeEventosService.prototype.getControlMenuChangeEmitter = function () {
        return this.controlMenuComponentChange;
    };
    HomeEventosService.prototype.emitTitleChangeEvent = function (title) {
        this.titleComponentChange.emit(title);
    };
    HomeEventosService.prototype.getTitleChangeEmitter = function () {
        return this.titleComponentChange;
    };
    /*recibir datos */
    HomeEventosService.prototype.emitNewChangeEvent = function (sw) {
        this.newComponentChange.emit(sw);
    };
    /*recibir  evento */
    HomeEventosService.prototype.getNewChangeEmitter = function () {
        return this.newComponentChange;
    };
    /*recibir datos */
    HomeEventosService.prototype.emitEditChangeEvent = function (sw) {
        this.editComponentChange.emit(sw);
    };
    /*recibir  evento */
    HomeEventosService.prototype.getEditChangeEmitter = function () {
        return this.editComponentChange;
    };
    /*recibir datos */
    HomeEventosService.prototype.emitSaveChangeEvent = function (sw) {
        this.saveComponentChange.emit(sw);
    };
    /*recibir  evento */
    HomeEventosService.prototype.getSaveChangeEmitter = function () {
        return this.saveComponentChange;
    };
    /*recibir datos */
    HomeEventosService.prototype.emitBackChangeEvent = function (sw) {
        this.backComponentChange.emit(sw);
    };
    /*recibir  evento */
    HomeEventosService.prototype.getBackChangeEmitter = function () {
        return this.backComponentChange;
    };
    return HomeEventosService;
}());
exports.HomeEventosService = HomeEventosService;
var ControlMenu = (function () {
    function ControlMenu() {
        this.view = false;
        this.add = false;
        this.edit = false;
        this.update = false;
        this.search = false;
        this.save = false;
        this.back = false;
    }
    return ControlMenu;
}());
exports.ControlMenu = ControlMenu;

//# sourceMappingURL=home.event.services.js.map
