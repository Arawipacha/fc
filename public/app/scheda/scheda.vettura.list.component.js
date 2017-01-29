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
var home_event_services_1 = require("./../home/home.event.services");
var scheda_vettura_api_1 = require("./scheda.vettura.api");
var core_1 = require("@angular/core");
var SchedaVetturaListComponent = (function () {
    function SchedaVetturaListComponent(router, api, eventHomeService) {
        this.router = router;
        this.api = api;
        this.eventHomeService = eventHomeService;
        this.model = new scheda_vettura_api_1.SchedaVettura();
        this.value = 'C';
        this.selectedItemMese = {};
        this.dataMese = [
            { nome_mese: 'GENNAIO', id: '1' },
            { nome_mese: 'FEBBRAIO', id: '2' },
            { nome_mese: 'MARZO', id: '3' },
            { nome_mese: 'APRILE', id: '4' },
            { nome_mese: 'MAGGIO', id: '5' },
            { nome_mese: 'JIUGNO', id: '6' },
            { nome_mese: 'LUGLIO', id: '7' },
            { nome_mese: 'AGOSTO', id: '8' },
            { nome_mese: 'SETTEMBRE', id: '9' },
            { nome_mese: 'OTTOBRE', id: '10' },
            { nome_mese: 'NOVEMBRE', id: '11' },
            { nome_mese: 'DICEMBRE', id: '12' }
        ];
        this.selectedItemPercorso = {};
        this.dataPercorso = []; //[{nome: 'torino-firenze', id: '12'}];
        this.selectedItemDipendente = {};
        this.dataDipendente = [];
        this.selectedItemTarga = {};
        this.dataTarga = [];
        this.title = "Elenco Scheda Vetture";
    }
    SchedaVetturaListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.eventHomeService.getNewChangeEmitter()
            .subscribe(function (item) { return _this.nuovaSchedaVettura(item); });
        this.subscriptionEditar = this.eventHomeService.getEditChangeEmitter()
            .subscribe(function (item) { return _this.editarDetalleSchedaVettura(); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //activar controlles
        var controlMenu = new home_event_services_1.ControlMenu();
        controlMenu.add = true;
        controlMenu.edit = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
        //traer datos dal Observer
        this.getData();
        this.getDataComboBoxs();
    };
    SchedaVetturaListComponent.prototype.getDataComboBoxs = function () {
        var _this = this;
        this.api.setUrl('api/schedavetturadatacombobox');
        this.api.getData().subscribe(function (res) {
            if (res.status == 200) {
                //this.documentos = res.json()['data'];
                _this.dataTarga = res.json()['data']['vettura'];
                _this.dataPercorso = res.json()['data']['percorso'];
                _this.dataDipendente = res.json()['data']['dipendente'];
                console.log(_this.dataPercorso);
            }
        });
    };
    SchedaVetturaListComponent.prototype.getData = function () {
        var _this = this;
        this.api.setUrl('api/schedavettura');
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
    SchedaVetturaListComponent.prototype.salvare = function () {
        var _this = this;
        //console.log(JSON.stringify(this.model));
        /*if(this.model.id==0)
            this.api.setUrl("/api/vettura");
        else
            this.api.setUrl("/api/documento/update");
            */
        //console.log(this.model);
        if (this.validarSchedaVettura()) {
            this.message = 'Tutti i campi sevono essere selezionati';
            return;
        }
        console.log(this.validarSchedaVettura());
        this.api.setUrl("/api/schedavettura");
        this.api.register(this.model)
            .subscribe(function (res) {
            //codigo 202 es de registro
            if (res.status == 200) {
                //console.log(res.json()['data']);
                _this.model = res.json()['data'];
                _this.message = res.json()['message'];
                var da = _this.data.find(function (item) { return item.id === _this.model.id; });
                if (da == undefined)
                    _this.data.push(_this.model);
                //console.log(da);
                _this.dialogEditSchedaVettura.nativeElement.close(event);
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    SchedaVetturaListComponent.prototype.validarSchedaVettura = function () {
        var sw = true;
        if (this.model.percorso_id == undefined || this.model.percorso_id == "")
            sw = false;
        if (this.model.vettura_id == undefined || this.model.vettura_id == "")
            sw = false;
        if (this.model.dipendente_id == undefined || this.model.dipendente_id == "")
            sw = false;
        if (this.model.mese == undefined || this.model.mese == "")
            sw = false;
        return sw;
    };
    /**selezionare vettura vaadin grid */
    //selectPersona: Vettura;
    SchedaVetturaListComponent.prototype.onSelectedItemsChanged = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
        }
    };
    SchedaVetturaListComponent.prototype.nuovaSchedaVettura = function (item) {
        this.model = new scheda_vettura_api_1.SchedaVettura();
        this.dialogEditSchedaVettura.nativeElement.open(event);
    };
    SchedaVetturaListComponent.prototype.editarDetalleSchedaVettura = function () {
        if (this.model) {
            var link = ['/office/scheda-vettura/detalle', this.model.id];
            this.router.navigate(link);
        }
    };
    SchedaVetturaListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.subscriptionEditar.unsubscribe();
    };
    return SchedaVetturaListComponent;
}());
__decorate([
    core_1.ViewChild('openschedavettura'),
    __metadata("design:type", core_1.ElementRef)
], SchedaVetturaListComponent.prototype, "dialogEditSchedaVettura", void 0);
SchedaVetturaListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'scheda-vettura',
        templateUrl: 'scheda.vettura.list.component.html',
        providers: [scheda_vettura_api_1.SchedaVetturaApi]
    }),
    __metadata("design:paramtypes", [router_1.Router, scheda_vettura_api_1.SchedaVetturaApi, home_event_services_1.HomeEventosService])
], SchedaVetturaListComponent);
exports.SchedaVetturaListComponent = SchedaVetturaListComponent;

//# sourceMappingURL=scheda.vettura.list.component.js.map
