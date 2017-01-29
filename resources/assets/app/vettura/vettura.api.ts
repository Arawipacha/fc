import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {Api} from './../services/api';

export class VetturaApi extends Api {

    setUrl(url: string) {
        super.setUrl(url);
    }
}
export class Vettura {

    //modificado:boolean;
    public id:number=0;
    public nome:string;
    public targa:string;
    public marchio:string;
    public modello:string;
    public tipologia:string='';
    //constructor(public id?,public documento?,public active?){
        constructor(){   }
 
}