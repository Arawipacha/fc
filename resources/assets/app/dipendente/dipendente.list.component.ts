import { Router } from '@angular/router';
import { Dipendente,DipendenteApi } from './dipendente.api';
import { HomeEventosService, ControlMenu } from './../home/home.event.services';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dipendente-list',
    templateUrl: 'dipendente.list.component.html',
    providers:[DipendenteApi]
})
export class DipendenteListComponent implements OnInit {
model= new Dipendente();



  constructor(private router: Router, private api: DipendenteApi, private eventHomeService: HomeEventosService) { }

  subscriptionNuovo: any;
  subscriptionEditar: any;
  title: string = "Elenco Dipendente";

  ngOnInit() {
    this.subscriptionNuovo=this.eventHomeService.getNewChangeEmitter()
      .subscribe(item => this.nuovoDipendente(item));

      this.subscriptionEditar=this.eventHomeService.getEditChangeEmitter()
      .subscribe(item => this.editarDipendente());
      
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

  data: Dipendente[];

  getData() {

    this.api.setUrl('api/dipendente');
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

    this.api.setUrl("/api/dipendente");
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


/**selezionare dipendente vaadin grid */

   //selectPersona: Dipendente;
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

    nuovoDipendente(item: boolean) {
    //this.model= new Dipendente();
   // this.dialogEditVettura.nativeElement.open(event);
    let link = ['/office/dipendente/edit', 'nuevo'];
        this.router.navigate(link);
  }

    editarDipendente() {
        if(this.model){
            let link = ['/office/dipendente/edit', this.model.id];
            this.router.navigate(link);
        }
    }

ngOnDestroy(){

  this.subscriptionNuovo.unsubscribe();
  this.subscriptionEditar.unsubscribe();
}

}