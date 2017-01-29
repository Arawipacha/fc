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
var percorso_api_1 = require("./percorso.api");
var home_event_services_1 = require("./../home/home.event.services");
var core_1 = require("@angular/core");
var PercorsoComponent = (function () {
    function PercorsoComponent(api, eventHomeService) {
        this.api = api;
        this.eventHomeService = eventHomeService;
        this.model = new percorso_api_1.Percorso();
        this.title = "Elenco Percorsi";
    }
    PercorsoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.eventHomeService.getNewChangeEmitter()
            .subscribe(function (item) { return _this.nuovoPercorso(item); });
        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);
        //traer datos dal Observer
        this.getData();
    };
    PercorsoComponent.prototype.getData = function () {
        var _this = this;
        this.api.setUrl('/api/percorso');
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
    PercorsoComponent.prototype.salvare = function () {
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
                var sw_1 = true;
                var ind = _this.data.forEach(function (element) {
                    if (element.id == _this.model.id) {
                        sw_1 = false;
                    }
                });
                if (sw_1)
                    _this.data.push(_this.model);
                console.log(sw_1);
                _this.dialogEdit.nativeElement.close(event);
            }
            else
                console.log(JSON.stringify(res));
            return false;
        });
    };
    /**selezionare vettura vaadin grid */
    //selectPersona: Vettura;
    PercorsoComponent.prototype.onSelectedItemsChanged = function (event) {
        var selectedIndex = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
            //aprire il paper-dialog
            this.dialogEdit.nativeElement.open(event);
        }
    };
    PercorsoComponent.prototype.nuovoPercorso = function (item) {
        this.model = new percorso_api_1.Percorso();
        this.dialogEdit.nativeElement.open(event);
    };
    PercorsoComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return PercorsoComponent;
}());
__decorate([
    core_1.ViewChild('opendialog'),
    __metadata("design:type", core_1.ElementRef)
], PercorsoComponent.prototype, "dialogEdit", void 0);
PercorsoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'percorso',
        templateUrl: 'percorso.component.html',
        providers: [percorso_api_1.PercorsoApi]
    }),
    __metadata("design:paramtypes", [percorso_api_1.PercorsoApi, home_event_services_1.HomeEventosService])
], PercorsoComponent);
exports.PercorsoComponent = PercorsoComponent;

//# sourceMappingURL=percorso.component.js.map
