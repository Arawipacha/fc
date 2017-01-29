"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_1 = require("./../services/api");
var SchedaVetturaApi = (function (_super) {
    __extends(SchedaVetturaApi, _super);
    function SchedaVetturaApi() {
        return _super.apply(this, arguments) || this;
    }
    SchedaVetturaApi.prototype.setUrl = function (url) {
        _super.prototype.setUrl.call(this, url);
    };
    return SchedaVetturaApi;
}(api_1.Api));
exports.SchedaVetturaApi = SchedaVetturaApi;
var SchedaVettura = (function () {
    //constructor(public id?,public documento?,public active?){
    function SchedaVettura() {
        this.detalle_scheda_vettura = [];
    }
    return SchedaVettura;
}());
exports.SchedaVettura = SchedaVettura;
var PercorsoVettura = (function () {
    function PercorsoVettura() {
    }
    return PercorsoVettura;
}());
exports.PercorsoVettura = PercorsoVettura;
var DipendenteVettura = (function () {
    function DipendenteVettura() {
    }
    return DipendenteVettura;
}());
exports.DipendenteVettura = DipendenteVettura;
var TargaVettura = (function () {
    function TargaVettura() {
    }
    return TargaVettura;
}());
exports.TargaVettura = TargaVettura;
/**clase del detalle scheda vettura */
var DetalleSchedaVettura = (function () {
    function DetalleSchedaVettura() {
        this.km_ini = 0;
        this.km_fine = 0;
        this.km_totale = 0;
        this.lavorabile = true;
        this.detalle_spesa = [];
    }
    return DetalleSchedaVettura;
}());
exports.DetalleSchedaVettura = DetalleSchedaVettura;
var Dipendente = (function () {
    function Dipendente() {
    }
    return Dipendente;
}());
exports.Dipendente = Dipendente;
var SpesaSchedaDetalle = (function () {
    function SpesaSchedaDetalle() {
    }
    return SpesaSchedaDetalle;
}());
exports.SpesaSchedaDetalle = SpesaSchedaDetalle;

//# sourceMappingURL=scheda.vettura.api.js.map
