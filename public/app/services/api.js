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
var core_1 = require("@angular/core");
//importar objetos de la libreria http
var http_1 = require("@angular/http");
//importar la clase Observable delalibreria Reactive Extensions
var Observable_1 = require("rxjs/Observable");
//import {User} from "./../user.class";
var headers_1 = require("./headers");
var Api = (function () {
    //reclamar la dependencia sobre http
    //se registra en la raiz, pues se le supone un uso comùn a varios objetos
    function Api(http) {
        this.http = http;
        //debemos acostumbranos a que  el api no este junto a los ficheros
        this.urlBase = '/api/vetture';
        this.options = new http_1.RequestOptions({ headers: headers_1.contentHeaders });
    }
    Api.prototype.setUrl = function (url) {
        this.urlBase = url;
    };
    Api.prototype.getUrl = function () {
        return this.urlBase;
    };
    Api.prototype.register = function (model) {
        var body = JSON.stringify(model);
        //let options= new RequestOptions({headers: contentHeaders});
        return this.http
            .post("" + this.urlBase, body, this.options);
        //.map(this.model= new Profile();
        //   .catch(this.handleError);
        //return this.http.post(this.urlBase+'register',body,options);
    };
    Api.prototype.getData = function (id) {
        //let body = JSON.stringify(model)
        //let options= new RequestOptions({headers: contentHeaders});
        if (id !== undefined)
            this.setUrl(this.urlBase + '/' + id);
        return this.http
            .get("" + this.urlBase);
    };
    Api.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    Api.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return Api;
}());
Api = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], Api);
exports.Api = Api;

//# sourceMappingURL=api.js.map
