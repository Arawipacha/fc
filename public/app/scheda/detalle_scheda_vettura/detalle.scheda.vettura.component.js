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
var home_event_services_1 = require("./../../home/home.event.services");
var scheda_vettura_api_1 = require("./../scheda.vettura.api");
var core_1 = require("@angular/core");
var DetalleSchedaVetturaComponent = (function () {
    function DetalleSchedaVetturaComponent(api, route, router, eventHomeService) {
        this.api = api;
        this.route = route;
        this.router = router;
        this.eventHomeService = eventHomeService;
        this.model = new scheda_vettura_api_1.DetalleSchedaVettura(); //elemento selezionato della scheda
        this.modelTemp = new scheda_vettura_api_1.DetalleSchedaVettura();
        this.title = "Elenco Detalle Schede Vetture";
        /**
         * obtenemos la informazione della web services del
         * detalle scheda vettura id
         */
        this.data = new scheda_vettura_api_1.SchedaVettura();
        /**model data dipendente  */
        this.dataDipendente = [];
    }
    /**
     * INIZIA LA  carga delle vaiabile e cattura del id  scheda vettura e tramite
     * questa ottiene  una lista di detalle scheda vettura
     */
    DetalleSchedaVetturaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.model = new scheda_vettura_api_1.DetalleSchedaVettura();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
            if (_this.id != undefined) {
                if (_this.id != 'nuevo') {
                    _this.getDataDetalleSchedaVettura(_this.id);
                    /**get data dipendente */
                    _this.getDataDipendenteComboBox();
                }
            }
            else {
                // se la variabile e undefined, ritorna a scheda vettura
                var link = ['/office/scheda-vettura'];
                _this.router.navigate(link);
            }
        });
        this.subscriptionNew = this.eventHomeService.getNewChangeEmitter()
            .subscribe(function (item) { return _this.nuovoDetalleSchedaVettura(item); });
        this.subscriptionEdit = this.eventHomeService.getEditChangeEmitter()
            .subscribe(function (item) { return _this.editarDetalleSchedaVettura(); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //activar controlles
        var controlMenu = new home_event_services_1.ControlMenu();
        controlMenu.add = true;
        controlMenu.edit = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
        //traer datos dal Observer
        // this.getData();
    };
    //data: SchedaVettura[] = [];
    DetalleSchedaVetturaComponent.prototype.getDataDetalleSchedaVettura = function (id) {
        var _this = this;
        this.api.setUrl('api/schedavettura/detalle');
        this.api.getData(id).subscribe(function (res) {
            if (res.status == 200) {
                if (res.json()['data'] != null)
                    _this.data = res.json()['data'];
            }
            if (res.status == 404) {
            }
        });
    };
    DetalleSchedaVetturaComponent.prototype.onGridReady = function (grid) {
        grid.columns[0].renderer = function (cell) {
            return cell.element.textContent = cell.row.index;
        };
        //grid.items = (params: any, callback: Function) =>
        //grid.items=(params: any, callback: Function)=> this._getJSON().subscribe(json => callback(json.json()['data'], json.json()['data'].size)) ;
        grid.cellClassGenerator = function (cell) {
            if (cell.index == 2) {
                return "activity-" + cell.data.toLowerCase();
            }
        };
    };
    DetalleSchedaVetturaComponent.prototype._getJSON = function () {
        this.api.setUrl('api/schedavettura/detalle');
        return this.api.getData(this.id);
        /*
            return this.http.get(url)
              .map((res: Response) => res.json())*/
    };
    DetalleSchedaVetturaComponent.prototype.getDataDipendenteComboBox = function () {
        var _this = this;
        this.api.setUrl('api/dipendentefullname');
        this.api.getData().subscribe(function (res) {
            if (res.status == 200) {
                if (res.json()['data'] != null)
                    _this.dataDipendente = res.json()['data'];
            }
            if (res.status == 404) {
            }
        });
    };
    /**selezionare detalle scheda vettura vaadin grid */
    //selectPersona: detalle scheda vettura;
    DetalleSchedaVetturaComponent.prototype.onSelectedItemsChanged = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            var mo = this.data.detalle_scheda_vettura[selectedIndex];
            this.modelTemp = this.data.detalle_scheda_vettura[selectedIndex];
            this.model = mo;
            this.asignForceDataForm();
            //aprire il paper-dialog
            //this.dialogEditVettura.nativeElement.open(event);
            console.log(this.model);
        }
    };
    DetalleSchedaVetturaComponent.prototype.change = function (event) {
        //$event.target.checked
        this.checkBox = event.target;
        this.model.lavorabile = event.target.checked;
    };
    //esto es un bug del checkBox, asi que se lefuerza a coger  su valor
    DetalleSchedaVetturaComponent.prototype.asignForceDataForm = function () {
        if (this.model.lavorabile)
            this.check.nativeElement.checked = true;
        else
            this.check.nativeElement.checked = false;
        console.log(this.check.nativeElement.checked);
    };
    DetalleSchedaVetturaComponent.prototype.nuovoDetalleSchedaVettura = function (item) {
        this.model = new scheda_vettura_api_1.DetalleSchedaVettura();
        this.model.scheda_vettura_id = this.id;
        this.model.nro_gg = this.data.detalle_scheda_vettura.length + 1;
        this.dialogEditDetalleSchedaVettura.nativeElement.open(event);
    };
    DetalleSchedaVetturaComponent.prototype.editarDetalleSchedaVettura = function () {
        this.dialogEditDetalleSchedaVettura.nativeElement.open(event);
        /*if (this.model) {
            let link = ['/office/scheda-vettura/detalle', this.model.id];
            this.router.navigate(link);
        }*/
    };
    /**select combobox dipendente */
    DetalleSchedaVetturaComponent.prototype.selectedItemDipendente = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model.dipendente_id = this.dataDipendente[selectedIndex].id;
            this.model.fullname_dipendente = this.dataDipendente[selectedIndex].full_name;
        }
    };
    DetalleSchedaVetturaComponent.prototype.salvaDetalleVettura = function () {
        var _this = this;
        if (this.validarDetalleSchedaVettura()) {
            this.message = 'Tutti i campi sevono essere selezionati';
            return;
        }
        console.log(this.validarDetalleSchedaVettura());
        //schedavettura/{id}/detalle
        this.api.setUrl("/api/schedavettura/detalleschedavettura");
        this.api.register(this.model)
            .subscribe(function (res) {
            //codigo 202 es de registro
            if (res.status == 200) {
                //console.log(res.json()['data']);
                _this.model = res.json()['data'];
                _this.message = res.json()['message'];
                var da = _this.data.detalle_scheda_vettura.find(function (item) { return item.id === _this.model.id; });
                if (da == undefined)
                    _this.data.detalle_scheda_vettura.push(_this.model);
                //console.log(da);
                _this.dialogEditDetalleSchedaVettura.nativeElement.close(event);
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    //[items]="data.detalle_scheda_vettura"
    DetalleSchedaVetturaComponent.prototype.closeDialog = function (event) {
        if (event.detail.confirmed == false)
            this.model = this.modelTemp;
        console.log(event);
    };
    DetalleSchedaVetturaComponent.prototype.validarDetalleSchedaVettura = function () {
        var sw = false;
        return sw;
    };
    /**cambia valor del km total */
    DetalleSchedaVetturaComponent.prototype.changeValueKmTotale = function (event) {
        if (event == undefined)
            event = 0;
        // this.model.km_ini=event;
        this.model.km_totale = this.model.km_fine - this.model.km_ini;
        //console.log(this.model.km_fine-this.model.km_ini);
        console.log(event);
    };
    DetalleSchedaVetturaComponent.prototype.changeValueKmFinale = function (event) {
        if (event == undefined)
            event = 0;
        this.model.km_totale = event;
        var total = this.model.km_ini + event;
        this.model.km_fine = total;
        //console.log(this.model.km_fine-this.model.km_ini);
        console.log(event);
    };
    DetalleSchedaVetturaComponent.prototype.ngOnDestroy = function () {
        this.subscriptionNew.unsubscribe();
        this.subscriptionEdit.unsubscribe();
    };
    return DetalleSchedaVetturaComponent;
}());
__decorate([
    core_1.ViewChild('check'),
    __metadata("design:type", Object)
], DetalleSchedaVetturaComponent.prototype, "check", void 0);
__decorate([
    core_1.ViewChild('opendetalleschedavettura'),
    __metadata("design:type", core_1.ElementRef)
], DetalleSchedaVetturaComponent.prototype, "dialogEditDetalleSchedaVettura", void 0);
DetalleSchedaVetturaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'detalle_scheda_vettura',
        templateUrl: 'detalle.scheda.vettura.component.html',
        providers: [scheda_vettura_api_1.SchedaVetturaApi]
    }),
    __metadata("design:paramtypes", [scheda_vettura_api_1.SchedaVetturaApi, router_1.ActivatedRoute, router_1.Router, home_event_services_1.HomeEventosService])
], DetalleSchedaVetturaComponent);
exports.DetalleSchedaVetturaComponent = DetalleSchedaVetturaComponent;

//# sourceMappingURL=detalle.scheda.vettura.component.js.map
