import { HomeEventosService, ControlMenu } from './../../home/home.event.services';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DipendenteApi, Dipendente } from './../dipendente.api';
import { Component, OnInit, Provider } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dipendente',
    templateUrl: 'dipendente.component.html',
    providers:[DipendenteApi]
})
export class DipendenteComponent implements OnInit {
    constructor(private api: DipendenteApi, private route: ActivatedRoute, private router: Router,private eventHomeService: HomeEventosService) { }

    model: Dipendente ;
    private sub: any;
    private id: string;

    subscriptionIndietro: any;
    subscriptionSalvare: any;
    title: string = "Elenco Dipendente";
    ngOnInit() {
        this.model= new Dipendente();
        this.sub = this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
            if (this.id != undefined)
                if (this.id != 'nuevo')
                    this.getDipendente(this.id);
            
        });



        this.subscriptionIndietro=this.eventHomeService.getBackChangeEmitter()
      .subscribe(item => this.indietroDipendente(item));

      this.subscriptionSalvare=this.eventHomeService.getSaveChangeEmitter()
      .subscribe(item => this.salvareDipendente());
      
    //enviar titulo
    this.eventHomeService.emitTitleChangeEvent(this.title);

   //activar controlles
    let controlMenu:ControlMenu= new ControlMenu();
    controlMenu.save=true;
    controlMenu.back=true;
    this.eventHomeService.emitControlMenuChangeEvent(controlMenu);


    }

    getDipendente(idpersona: string) {
        this.api.setUrl('api/dipendente');
        this.api.getData(idpersona).subscribe(res => {
            if (res.status == 200) {
                this.model = res.json()['data'];
            }
        });
    }


messagio:string;
salvareDipendente(){
     console.log(JSON.stringify(this.model));
    /*if(this.model.id==0)
        this.api.setUrl("/api/vettura");
    else
        this.api.setUrl("/api/documento/update");
        */

    this.api.setUrl("/api/dipendente");
    this.api.register(this.model)
      .subscribe(
      res => {
        //codigo 202 es de registro
        if (res.status == 200) {
          //console.log(res.json()['data']);

          this.model = res.json()['data'];
        this.messagio=res.json()['message'];;
          
        }
        
        else
          console.log(JSON.stringify(res));
        return false;
      }
      );
}
    indietroDipendente(item){
        let link = ['/office/dipendente'];
        this.router.navigate(link);
    }

    ngOnDestroy(){

    this.subscriptionIndietro.unsubscribe();
    this.subscriptionSalvare.unsubscribe();
}
}