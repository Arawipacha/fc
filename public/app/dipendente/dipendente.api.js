"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_1 = require("./../services/api");
var DipendenteApi = (function (_super) {
    __extends(DipendenteApi, _super);
    function DipendenteApi() {
        return _super.apply(this, arguments) || this;
    }
    DipendenteApi.prototype.setUrl = function (url) {
        _super.prototype.setUrl.call(this, url);
    };
    return DipendenteApi;
}(api_1.Api));
exports.DipendenteApi = DipendenteApi;
var Dipendente = (function () {
    //public obs:string;
    //constructor(public id?,public documento?,public active?){
    function Dipendente() {
    }
    return Dipendente;
}());
exports.Dipendente = Dipendente;

//# sourceMappingURL=dipendente.api.js.map
