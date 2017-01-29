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
var vettura_api_1 = require("./vettura.api");
var home_event_services_1 = require("./../home/home.event.services");
var core_1 = require("@angular/core");
//import { RowTemplate, HeaderTemplate, DetailsTemplate} from 'angular2-iron-data-table';
var home_event_services_2 = require("../home/home.event.services");
var VetturaComponent = (function () {
    function VetturaComponent(api, eventHomeService) {
        this.api = api;
        this.eventHomeService = eventHomeService;
        this.model = new vettura_api_1.Vettura();
        this.value = 'C';
        this.selectedItem = {};
        this.tipologiaJson = [
            { tipologia: 'AUTOCARRO', abbr: 'AUTCAR' },
            { tipologia: 'FURGONE', abbr: 'FUR' },
            { tipologia: 'CASSONETO', abbr: 'CASS' },
            { tipologia: 'CAMION', abbr: 'CAM' }
        ];
        this.title = "Elenco Vetture";
    }
    VetturaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionNuovo = this.eventHomeService.getNewChangeEmitter()
            .subscribe(function (item) { return _this.nuovaVettura(item); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //activar controlles
        var controlMenu = new home_event_services_2.ControlMenu();
        controlMenu.add = true;
        controlMenu.edit = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
        //traer datos dal Observer
        this.getData();
    };
    VetturaComponent.prototype.getData = function () {
        var _this = this;
        this.api.setUrl('api/vetture');
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
    VetturaComponent.prototype.salvare = function () {
        var _this = this;
        console.log(JSON.stringify(this.model));
        /*if(this.model.id==0)
            this.api.setUrl("/api/vettura");
        else
            this.api.setUrl("/api/documento/update");
            */
        this.api.setUrl("/api/vetture");
        this.api.register(this.model)
            .subscribe(function (res) {
            //codigo 202 es de registro
            if (res.status == 200) {
                //console.log(res.json()['data']);
                _this.model = res.json()['data'];
                var da = _this.data.find(function (item) { return item.id === _this.model.id; });
                if (da == undefined)
                    _this.data.push(_this.model);
                //console.log(da);
                _this.dialogEditVettura.nativeElement.close(event);
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    /**selezionare vettura vaadin grid */
    //selectPersona: Vettura;
    VetturaComponent.prototype.onSelectedItemsChanged = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
            //aprire il paper-dialog
            this.dialogEditVettura.nativeElement.open(event);
        }
    };
    VetturaComponent.prototype.nuovaVettura = function (item) {
        this.model = new vettura_api_1.Vettura();
        this.dialogEditVettura.nativeElement.open(event);
    };
    VetturaComponent.prototype.ngOnDestroy = function () {
        this.subscriptionNuovo.unsubscribe();
    };
    return VetturaComponent;
}());
__decorate([
    core_1.ViewChild('openvettura'),
    __metadata("design:type", core_1.ElementRef)
], VetturaComponent.prototype, "dialogEditVettura", void 0);
VetturaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vettura',
        templateUrl: 'vettura.component.html',
        providers: [vettura_api_1.VetturaApi]
    }),
    __metadata("design:paramtypes", [vettura_api_1.VetturaApi, home_event_services_1.HomeEventosService])
], VetturaComponent);
exports.VetturaComponent = VetturaComponent;

//# sourceMappingURL=vettura.component.js.map
