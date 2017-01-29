import { HomeEventosService, ControlMenu } from './../home/home.event.services';
import { Router } from '@angular/router';
import {PercorsoApi, Percorso } from './percorso.api';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'percorso-list',
    templateUrl: 'percorso.list.component.html',
    providers: [PercorsoApi]
})
export class PercorsoListComponent implements OnInit {
   model= new Percorso();



  constructor(private router: Router, private api: PercorsoApi, private eventHomeService: HomeEventosService) { }

  subscriptionNew: any;
  subscriptionEdit: any;
  title: string = "Elenco Percorsi";

  ngOnInit() {
    this.subscriptionNew=this.eventHomeService.getNewChangeEmitter()
      .subscribe(item => this.nuovoPercorso(item));

      this.subscriptionEdit=this.eventHomeService.getEditChangeEmitter()
      .subscribe(item => this.editarPercorso());
      
    //enviar titulo
    this.eventHomeService.emitTitleChangeEvent(this.title);

   //activar controlles
    let controlMenu:ControlMenu= new ControlMenu();
    controlMenu.add=true;
    controlMenu.edit=true;
    this.eventHomeService.emitControlMenuChangeEvent(controlMenu);

    //traer datos dal Observer
    this.getData();
  }

  /**
   * obtenemos la informazione della web services
   */

  data: Percorso[];

  getData() {

    this.api.setUrl('api/percorso');
    this.api.getData()
      .subscribe(res => {
        // durante la suscripción se obtienen y transforman los datos
        this.data = res.json()['data'];
        console.log(this.data);
      }

      );

  }


/**
 * funcion  dove si inviano le  informazione introdotte
 */

salvare(){
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
        if (res.status ==200) {
          //console.log(res.json()['data']);

          this.model = res.json()['data'];
          let sw=true;
          let ind=this.data.forEach(element => {
            
            if(element.id==this.model.id){
              sw= false;
              //console.log(ind);
            }
          }
          );

          if(sw)
          this.data.push(this.model);
          console.log(sw);
 
          
        }
        
        else
          console.log(JSON.stringify(res));
        return false;
      }
      );

}


/**selezionare percorso veicolo vaadin grid */

   //selectPersona: percorso;
    onSelectedItemsChanged(event: any) {

        let selectedIndex: number = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
            //aprire il paper-dialog
            //this.dialogEditVettura.nativeElement.open(event);
            console.log(this.model);
        }
    }

  /*referenza del componente paper-dialog */


//  @ViewChild('openvettura') dialogEditVettura: ElementRef;

    nuovoPercorso(item: boolean) {
    //this.model= new Dipendente();
   // this.dialogEditVettura.nativeElement.open(event);
    let link = ['/office/percorso/edit', 'nuevo'];
        this.router.navigate(link);
  }

    editarPercorso() {
        if(this.model){
            let link = ['/office/percorso/edit', this.model.id];
            this.router.navigate(link);
        }
    }
ngOnDestroy(){
this.subscriptionNew.unsubscribe();
this.subscriptionEdit.unsubscribe();
//this.eventHomeService.getNewChangeEmitter().un
      

      //console.log(this.eventHomeService);
}
}