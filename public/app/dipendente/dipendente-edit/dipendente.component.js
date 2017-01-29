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
var home_event_services_1 = require("./../../home/home.event.services");
var router_1 = require("@angular/router");
var dipendente_api_1 = require("./../dipendente.api");
var core_1 = require("@angular/core");
var DipendenteComponent = (function () {
    function DipendenteComponent(api, route, router, eventHomeService) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.eventHomeService = eventHomeService;
        this.title = "Elenco Dipendente";
    }
    DipendenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new dipendente_api_1.Dipendente();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            if (_this.id != undefined)
                if (_this.id != 'nuevo')
                    _this.getDipendente(_this.id);
        });
        this.subscriptionIndietro = this.eventHomeService.getBackChangeEmitter()
            .subscribe(function (item) { return _this.indietroDipendente(item); });
        this.subscriptionSalvare = this.eventHomeService.getSaveChangeEmitter()
            .subscribe(function (item) { return _this.salvareDipendente(); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //activar controlles
        var controlMenu = new home_event_services_1.ControlMenu();
        controlMenu.save = true;
        controlMenu.back = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
    };
    DipendenteComponent.prototype.getDipendente = function (idpersona) {
        var _this = this;
        this.api.setUrl('api/dipendente');
        this.api.getData(idpersona).subscribe(function (res) {
            if (res.status == 200) {
                _this.model = res.json()['data'];
            }
        });
    };
    DipendenteComponent.prototype.salvareDipendente = function () {
        var _this = this;
        console.log(JSON.stringify(this.model));
        /*if(this.model.id==0)
            this.api.setUrl("/api/vettura");
        else
            this.api.setUrl("/api/documento/update");
            */
        this.api.setUrl("/api/dipendente");
        this.api.register(this.model)
            .subscribe(function (res) {
            //codigo 202 es de registro
            if (res.status == 200) {
                //console.log(res.json()['data']);
                _this.model = res.json()['data'];
                _this.messagio = res.json()['message'];
                ;
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    DipendenteComponent.prototype.indietroDipendente = function (item) {
        var link = ['/office/dipendente'];
        this.router.navigate(link);
    };
    DipendenteComponent.prototype.ngOnDestroy = function () {
        this.subscriptionIndietro.unsubscribe();
        this.subscriptionSalvare.unsubscribe();
    };
    return DipendenteComponent;
}());
DipendenteComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dipendente',
        templateUrl: 'dipendente.component.html',
        providers: [dipendente_api_1.DipendenteApi]
    }),
    __metadata("design:paramtypes", [dipendente_api_1.DipendenteApi, router_1.ActivatedRoute, router_1.Router, home_event_services_1.HomeEventosService])
], DipendenteComponent);
exports.DipendenteComponent = DipendenteComponent;

//# sourceMappingURL=dipendente.component.js.map
