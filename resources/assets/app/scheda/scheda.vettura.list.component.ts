import { Router } from '@angular/router';
import { HomeEventosService, ControlMenu } from './../home/home.event.services';
import { SchedaVettura, SchedaVetturaApi, PercorsoVettura, DipendenteVettura, TargaVettura } from './scheda.vettura.api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'scheda-vettura',
    templateUrl: 'scheda.vettura.list.component.html',
    providers: [SchedaVetturaApi]
})
export class SchedaVetturaListComponent implements OnInit {
model= new SchedaVettura();

message:string; // messagio del inserimento

  value = 'C';
  selectedItemMese: Object = {};
  dataMese = [
    { nome_mese: 'GENNAIO', id: '1' },
    { nome_mese: 'FEBBRAIO', id: '2' },
    { nome_mese: 'MARZO', id: '3' },
    { nome_mese: 'APRILE', id: '4' },
    { nome_mese: 'MAGGIO', id: '5' },
    { nome_mese: 'JIUGNO', id: '6' },
    { nome_mese: 'LUGLIO', id: '7' },
    { nome_mese: 'AGOSTO', id: '8' },
    { nome_mese: 'SETTEMBRE', id: '9' },
    { nome_mese: 'OTTOBRE', id: '10' },
    { nome_mese: 'NOVEMBRE', id: '11' },
    { nome_mese: 'DICEMBRE', id: '12' }

  ];

selectedItemPercorso: Object = {};
dataPercorso:PercorsoVettura[]=[];//[{nome: 'torino-firenze', id: '12'}];

selectedItemDipendente: Object = {};
dataDipendente:DipendenteVettura[]=[];

selectedItemTarga:Object = {};
dataTarga:TargaVettura[]=[];

  constructor(private router: Router,private api: SchedaVetturaApi, private eventHomeService: HomeEventosService) { }

  subscription: any; //emit evento nuovo
  subscriptionEditar: any; //emit evento editar
  title: string = "Elenco Scheda Vetture";

  ngOnInit() {
     this.subscription=this.eventHomeService.getNewChangeEmitter()
      .subscribe(item => this.nuovaSchedaVettura(item));

this.subscriptionEditar=this.eventHomeService.getEditChangeEmitter()
      .subscribe(item => this.editarDetalleSchedaVettura());

    //enviar titulo
    this.eventHomeService.emitTitleChangeEvent(this.title);
    //activar controlles
    let controlMenu:ControlMenu= new ControlMenu();
    controlMenu.add=true;
    controlMenu.edit=true;
    
    this.eventHomeService.emitControlMenuChangeEvent(controlMenu);

    //traer datos dal Observer
    this.getData();
    this.getDataComboBoxs();
  }

 getDataComboBoxs() {
    this.api.setUrl('api/schedavetturadatacombobox');
    this.api.getData().subscribe(res => {
      if(res.status==200){
      //this.documentos = res.json()['data'];

        this.dataTarga= res.json()['data']['vettura'];
        this.dataPercorso=res.json()['data']['percorso'];
        this.dataDipendente=res.json()['data']['dipendente'];
        console.log(this.dataPercorso);
       }
    });

  }

  /**
   * obtenemos la informazione della web services
   */

  data: SchedaVettura[];

  getData() {

    this.api.setUrl('api/schedavettura');
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
  //console.log(JSON.stringify(this.model));
    /*if(this.model.id==0)
        this.api.setUrl("/api/vettura");
    else
        this.api.setUrl("/api/documento/update");
        */
        //console.log(this.model);
        if(this.validarSchedaVettura()){

        this.message='Tutti i campi sevono essere selezionati';
          return;
          }
        console.log(this.validarSchedaVettura());
        


    this.api.setUrl("/api/schedavettura");
    this.api.register(this.model)
      .subscribe(
      res => {
        //codigo 202 es de registro
        if (res.status ==200) {
          //console.log(res.json()['data']);
          
          this.model = res.json()['data'];
          this.message=res.json()['message'];

          let da=this.data.find(item=>item.id===this.model.id);
          if(da==undefined)
            this.data.push(this.model);
          //console.log(da);
          this.dialogEditSchedaVettura.nativeElement.close(event);
          
        }
        
        else
          console.log(JSON.stringify(res));
        return false;
      }
      );

}


validarSchedaVettura():boolean{
let sw=true;
if(this.model.percorso_id==undefined || this.model.percorso_id=="")
  sw=false;
if(this.model.vettura_id==undefined || this.model.vettura_id=="")
  sw=false;
if (this.model.dipendente_id==undefined || this.model.dipendente_id=="")
  sw=false;
if(this.model.mese==undefined || this.model.mese=="")
  sw=false;
return sw;
}

/**selezionare vettura vaadin grid */

   //selectPersona: Vettura;
    onSelectedItemsChanged(event: any) {
        let selectedIndex: number = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            this.model = this.data[selectedIndex];
            //aprire il paper-dialog
            //this.dialogEditSchedaVettura.nativeElement.open(event);
        }
    }

  /*referenza del componente paper-dialog */

  @ViewChild('openschedavettura') dialogEditSchedaVettura: ElementRef;

  nuovaSchedaVettura(item: boolean) {
    this.model= new SchedaVettura();
    this.dialogEditSchedaVettura.nativeElement.open(event);
  }
    editarDetalleSchedaVettura() {
        if(this.model){
            let link = ['/office/scheda-vettura/detalle', this.model.id];
            this.router.navigate(link);
        }
    }

   ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEditar.unsubscribe();
  }

}