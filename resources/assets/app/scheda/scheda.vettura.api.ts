import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {Api} from './../services/api';

export class SchedaVetturaApi extends Api {

    setUrl(url: string) {
        super.setUrl(url);
    }
}
export class SchedaVettura {

    //modificado:boolean;
    public id:number;
    public mese:string;
    public gg_totale:number;
    public km_totale:number;
    public spesa:number;
    public percorso_id:string;
    public vettura_id:string;
    public dipendente_id:string;

    //variabile di consulta che sono create  nell 
    //controller dal cotroller
    public fullname_dipendente:string;
    public nome_percorso:string;
    public nome_vettura:string;
    public detalle_scheda_vettura:DetalleSchedaVettura[]=[];
    //constructor(public id?,public documento?,public active?){
        constructor(){   }
}

export class PercorsoVettura{
    public id:number;
    public nome:string;
    public partenza:string;
    public arrivo:string;
    constructor(){}
}

export class DipendenteVettura{
    public id:number;
    public fullname:string;
    constructor(){}
}

export class TargaVettura{
    public id:number;
    public nome:string;
    constructor(){}
}

/**clase del detalle scheda vettura */

export class DetalleSchedaVettura{
    public id:number;
    public scheda_vettura_id:string;
    public dipendente_id:string;
    public nro_gg:number;
    public km_ini:number=0;
    public km_fine:number=0;
    public km_totale:number=0;
    public spesa:number;
    public consegne:number;
    public ritiri:number;
    public lavorabile:boolean=true;

    public detalle_spesa:SpesaSchedaDetalle[]=[];
    //variabile di consulta che sono create  nell 
    //controller dal cotroller
    public fullname_dipendente:string;

    constructor(){}
}

export class Dipendente{
    public id:string;
    public full_name:string;
}

export class SpesaSchedaDetalle{
    public id:string;
    public nome:string;
    public tipologia:string;
    public spesa:number;
    public paga_ditta:boolean;
    public nota:string;
    public detalle_scheda_vettura_id:string;
    constructor(){}
}