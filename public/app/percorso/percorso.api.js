"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_1 = require("./../services/api");
var PercorsoApi = (function (_super) {
    __extends(PercorsoApi, _super);
    function PercorsoApi() {
        return _super.apply(this, arguments) || this;
    }
    PercorsoApi.prototype.setUrl = function (url) {
        _super.prototype.setUrl.call(this, url);
    };
    return PercorsoApi;
}(api_1.Api));
exports.PercorsoApi = PercorsoApi;
var Percorso = (function () {
    //constructor(public id?,public documento?,public active?){
    function Percorso() {
        //modificado:boolean;
        this.id = 0;
    }
    return Percorso;
}());
exports.Percorso = Percorso;

//# sourceMappingURL=percorso.api.js.map
