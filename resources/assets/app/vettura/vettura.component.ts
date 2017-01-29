import { MetadataOverride } from '@angular/core/testing';
import { Observer } from './../../../../public/libs/rxjs/Observer.d';
import { VetturaApi, Vettura } from './vettura.api';
import { HomeEventosService } from './../home/home.event.services';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import { RowTemplate, HeaderTemplate, DetailsTemplate} from 'angular2-iron-data-table';
import { ControlMenu } from '../home/home.event.services';



@Component({
  moduleId: module.id,
  selector: 'vettura',
  templateUrl: 'vettura.component.html',
  providers: [VetturaApi]
  //viewProviders: [RowTemplate, HeaderTemplate, DetailsTemplate]
})

export class VetturaComponent implements OnInit {
  model = new Vettura();

  value = 'C';
  selectedItem: Object = {};
  tipologiaJson = [
    { tipologia: 'AUTOCARRO', abbr: 'AUTCAR' },
    { tipologia: 'FURGONE', abbr: 'FUR' },
    { tipologia: 'CASSONETO', abbr: 'CASS' },
    { tipologia: 'CAMION', abbr: 'CAM' }
  ];


  constructor(private api: VetturaApi, private eventHomeService: HomeEventosService) { }

  subscriptionNuovo: any;
  title: string = "Elenco Vetture";

  ngOnInit() {
    this.subscriptionNuovo = this.eventHomeService.getNewChangeEmitter()
      .subscribe(item => this.nuovaVettura(item));
    //enviar titulo
    this.eventHomeService.emitTitleChangeEvent(this.title);
    //activar controlles
    let controlMenu: ControlMenu = new ControlMenu();
    controlMenu.add=true;
    controlMenu.edit=true;
    this.eventHomeService.emitControlMenuChangeEvent(controlMenu);

    //traer datos dal Observer
    this.getData();
  }

  /**
   * obtenemos la informazione della web services
   */

  data: Vettura[];

  getData() {

    this.api.setUrl('api/vetture');
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

  salvare() {
    console.log(JSON.stringify(this.model));
    /*if(this.model.id==0)
        this.api.setUrl("/api/vettura");
    else
        this.api.setUrl("/api/documento/update");
        */

    this.api.setUrl("/api/vetture");
    this.api.register(this.model)
      .subscribe(
      res => {
        //codigo 202 es de registro
        if (res.status == 200) {
          //console.log(res.json()['data']);

          this.model = res.json()['data'];


          let da = this.data.find(item => item.id === this.model.id);
          if (da == undefined)
            this.data.push(this.model);
          //console.log(da);
          this.dialogEditVettura.nativeElement.close(event);

        }

        else
          console.log(JSON.stringify(res));
        return false;
      }
      );

  }


  /**selezionare vettura vaadin grid */

  //selectPersona: Vettura;
  onSelectedItemsChanged(event: any) {

    let selectedIndex: number = event.target.selection.selected()[0];
    if (selectedIndex !== undefined) {
      //this.onSelect(this.heroes[selectedIndex]);
      this.model = this.data[selectedIndex];
      //aprire il paper-dialog
      this.dialogEditVettura.nativeElement.open(event);
    }
  }

  /*referenza del componente paper-dialog */

  @ViewChild('openvettura') dialogEditVettura: ElementRef;

  nuovaVettura(item: boolean) {
    this.model = new Vettura();
    this.dialogEditVettura.nativeElement.open(event);
  }

  ngOnDestroy() {
    this.subscriptionNuovo.unsubscribe();
  }

}