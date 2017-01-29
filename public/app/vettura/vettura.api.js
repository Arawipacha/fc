"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_1 = require("./../services/api");
var VetturaApi = (function (_super) {
    __extends(VetturaApi, _super);
    function VetturaApi() {
        return _super.apply(this, arguments) || this;
    }
    VetturaApi.prototype.setUrl = function (url) {
        _super.prototype.setUrl.call(this, url);
    };
    return VetturaApi;
}(api_1.Api));
exports.VetturaApi = VetturaApi;
var Vettura = (function () {
    //constructor(public id?,public documento?,public active?){
    function Vettura() {
        //modificado:boolean;
        this.id = 0;
        this.tipologia = '';
    }
    return Vettura;
}());
exports.Vettura = Vettura;

//# sourceMappingURL=vettura.api.js.map
