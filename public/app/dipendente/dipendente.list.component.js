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
var dipendente_api_1 = require("./dipendente.api");
var home_event_services_1 = require("./../home/home.event.services");
var core_1 = require("@angular/core");
var DipendenteListComponent = (function () {
    function DipendenteListComponent(router, api, eventHomeService) {
        this.router = router;
        this.api = api;
        this.eventHomeService = eventHomeService;
        this.model = new dipendente_api_1.Dipendente();
        this.title = "Elenco Dipendente";
    }
    DipendenteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionNuovo = this.eventHomeService.getNewChangeEmitter()
            .subscribe(function (item) { return _this.nuovoDipendente(item); });
        this.subscriptionEditar = this.eventHomeService.getEditChangeEmitter()
            .subscribe(function (item) { return _this.editarDipendente(); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //activar controlles
        var controlMenu = new home_event_services_1.ControlMenu();
        controlMenu.add = true;
        controlMenu.edit = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
        //traer datos dal Observer
        this.getData();
    };
    DipendenteListComponent.prototype.getData = function () {
        var _this = this;
        this.api.setUrl('api/dipendente');
        this.api.getData()
            .subscribe(function (res) {
            // durante la suscripción se obtienen y transforman los datos
            _this.data = res.json()['data'];
            console.log(_this.data);
        });
    };
    /**
     * funcion  dove si inviano le  informazione introdotte
     */
    DipendenteListComponent.prototype.salvare = function () {
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
                var sw_1 = true;
                var ind = _this.data.forEach(function (element) {
                    if (element.id == _this.model.id) {
                        sw_1 = false;
                    }
                });
                if (sw_1)
                    _this.data.push(_this.model);
                console.log(sw_1);
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    /**selezionare dipendente vaadin grid */
    //selectPersona: Dipendente;
    DipendenteListComponent.prototype.onSelectedItemsChanged = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
            //aprire il paper-dialog
            //this.dialogEditVettura.nativeElement.open(event);
            console.log(this.model);
        }
    };
    /*referenza del componente paper-dialog */
    //  @ViewChild('openvettura') dialogEditVettura: ElementRef;
    DipendenteListComponent.prototype.nuovoDipendente = function (item) {
        //this.model= new Dipendente();
        // this.dialogEditVettura.nativeElement.open(event);
        var link = ['/office/dipendente/edit', 'nuevo'];
        this.router.navigate(link);
    };
    DipendenteListComponent.prototype.editarDipendente = function () {
        if (this.model) {
            var link = ['/office/dipendente/edit', this.model.id];
            this.router.navigate(link);
        }
    };
    DipendenteListComponent.prototype.ngOnDestroy = function () {
        this.subscriptionNuovo.unsubscribe();
        this.subscriptionEditar.unsubscribe();
    };
    return DipendenteListComponent;
}());
DipendenteListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dipendente-list',
        templateUrl: 'dipendente.list.component.html',
        providers: [dipendente_api_1.DipendenteApi]
    }),
    __metadata("design:paramtypes", [router_1.Router, dipendente_api_1.DipendenteApi, home_event_services_1.HomeEventosService])
], DipendenteListComponent);
exports.DipendenteListComponent = DipendenteListComponent;

//# sourceMappingURL=dipendente.list.component.js.map
