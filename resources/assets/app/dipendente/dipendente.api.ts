import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {Api} from './../services/api';

export class DipendenteApi extends Api {

    setUrl(url: string) {
        super.setUrl(url);
    }
}
export class Dipendente {

    //modificado:boolean;
    public id:number;
    public nome:string;
    public cognome:string;
    public cod_fiscale:string;
    public indirizzo:string;
    public telefono:string;
    //public obs:string;
    //constructor(public id?,public documento?,public active?){
        constructor(){   }
 
}