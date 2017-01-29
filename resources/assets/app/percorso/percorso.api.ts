import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {Api} from './../services/api';

export class PercorsoApi extends Api {

    setUrl(url: string) {
        super.setUrl(url);
    }
}
export class Percorso {

    //modificado:boolean;
    public id:number=0;
    public nome:string;
    public partenza:string;
    public arrivo:string;
    public attive:string;
    //constructor(public id?,public documento?,public active?){
        constructor(){   }
 
}