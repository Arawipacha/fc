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
var router_1 = require("@angular/router");
var percorso_api_1 = require("./../percorso.api");
var home_event_services_1 = require("./../../home/home.event.services");
var core_1 = require("@angular/core");
var PercorsoComponent = (function () {
    function PercorsoComponent(api, route, router, eventHomeService) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.eventHomeService = eventHomeService;
        this.model = new percorso_api_1.Percorso();
        this.title = "Percorso";
    }
    PercorsoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new percorso_api_1.Percorso();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            if (_this.id != undefined)
                if (_this.id != 'nuevo')
                    _this.getPercorso(_this.id);
        });
        this.subscription = this.eventHomeService.getBackChangeEmitter()
            .subscribe(function (item) { return _this.indietroDipendente(item); });
        this.subscription = this.eventHomeService.getSaveChangeEmitter()
            .subscribe(function (item) { return _this.salvarePercorso(); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //traer datos dal Observer
        //activar controlles
        var controlMenu = new home_event_services_1.ControlMenu();
        controlMenu.save = true;
        controlMenu.back = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
    };
    /**
     * obtenemos la informazione della web services del percorso id
     */
    PercorsoComponent.prototype.getPercorso = function (id) {
        var _this = this;
        this.api.setUrl('api/percorso');
        this.api.getData(id).subscribe(function (res) {
            if (res.status == 200) {
                _this.model = res.json()['data'];
            }
        });
    };
    PercorsoComponent.prototype.salvarePercorso = function () {
        var _this = this;
        console.log(JSON.stringify(this.model));
        /*if(this.model.id==0)
            this.api.setUrl("/api/vettura");
        else
            this.api.setUrl("/api/documento/update");
            */
        this.api.setUrl("/api/percorso");
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
    PercorsoComponent.prototype.indietroDipendente = function (item) {
        var link = ['/office/percorso'];
        this.router.navigate(link);
    };
    PercorsoComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return PercorsoComponent;
}());
PercorsoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'percorso',
        templateUrl: 'percorso.component.html',
        providers: [percorso_api_1.PercorsoApi]
    }),
    __metadata("design:paramtypes", [percorso_api_1.PercorsoApi, router_1.ActivatedRoute, router_1.Router, home_event_services_1.HomeEventosService])
], PercorsoComponent);
exports.PercorsoComponent = PercorsoComponent;

//# sourceMappingURL=percorso.component.js.map
