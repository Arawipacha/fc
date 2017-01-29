import { Router, ActivatedRoute, Params } from '@angular/router';
import { PercorsoApi,Percorso } from './../percorso.api';
import { HomeEventosService, ControlMenu } from './../../home/home.event.services';
import { Component, OnInit, ViewChild, ElementRef, Provider, OnDestroy } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'percorso',
    templateUrl: 'percorso.component.html',
    providers: [PercorsoApi]
})
export class PercorsoComponent implements OnInit, OnDestroy {
   model= new Percorso();


  constructor(private api: PercorsoApi,private route: ActivatedRoute, private router: Router, private eventHomeService: HomeEventosService) { }

   private sub: any;
    private id: string;


  subscription: any;
  title: string = "Percorso";

  ngOnInit() {
            this.model= new Percorso();
        this.sub = this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
            if (this.id != undefined)
                if (this.id != 'nuevo')
                    this.getPercorso(this.id);
        });


        this.subscription=this.eventHomeService.getBackChangeEmitter()
      .subscribe(item => this.indietroDipendente(item));

      this.subscription=this.eventHomeService.getSaveChangeEmitter()
      .subscribe(item => this.salvarePercorso());

    //enviar titulo
    this.eventHomeService.emitTitleChangeEvent(this.title);

    //traer datos dal Observer
     //activar controlles
    let controlMenu:ControlMenu= new ControlMenu();
    controlMenu.save=true;
    controlMenu.back=true;
    this.eventHomeService.emitControlMenuChangeEvent(controlMenu);
  }

  /**
   * obtenemos la informazione della web services del percorso id
   */

    getPercorso(id: string) {
        this.api.setUrl('api/percorso');
        this.api.getData(id).subscribe(res => {
            if (res.status == 200) {
                this.model = res.json()['data'];
            }
        });
    }


/**
 * funcion  dove si inviano le  informazione introdotte
 */
messagio:string;
salvarePercorso(){
     console.log(JSON.stringify(this.model));
    /*if(this.model.id==0)
        this.api.setUrl("/api/vettura");
    else
        this.api.setUrl("/api/documento/update");
        */

    this.api.setUrl("/api/percorso");
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
        let link = ['/office/percorso'];
        this.router.navigate(link);
    }

ngOnDestroy(){
this.subscription.unsubscribe();
}


}