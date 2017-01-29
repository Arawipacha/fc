import { Router, ActivatedRoute, Params } from '@angular/router';
import { HomeEventosService, ControlMenu } from './../../home/home.event.services';
import { SchedaVetturaApi, SchedaVettura, DetalleSchedaVettura } from './../scheda.vettura.api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dipendente, SpesaSchedaDetalle } from '../scheda.vettura.api';
import { Observable } from 'rxjs/Observable';
import { ajaxGetJSON } from '../../../../../public/libs/rxjs/src/observable/dom/AjaxObservable';

@Component({
    moduleId: module.id,
    selector: 'detalle_scheda_vettura',
    templateUrl: 'detalle.scheda.vettura.component.html',
    providers: [SchedaVetturaApi]
})
export class DetalleSchedaVetturaComponent implements OnInit {
    model = new DetalleSchedaVettura(); //elemento selezionato della scheda
    modelTemp = new DetalleSchedaVettura();
    private sub: any;
    private id: string;

    title: string = "Elenco Detalle Schede Vetture";
    constructor(private api: SchedaVetturaApi, private route: ActivatedRoute, private router: Router, private eventHomeService: HomeEventosService) { }

    subscriptionNew: any;
    subscriptionEdit: any;


    /**
     * INIZIA LA  carga delle vaiabile e cattura del id  scheda vettura e tramite
     * questa ottiene  una lista di detalle scheda vettura
     */
    ngOnInit() {
        this.model = new DetalleSchedaVettura();
        this.sub = this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            console.log(this.id);
            if (this.id != undefined) {
                if (this.id != 'nuevo') {
                    this.getDataDetalleSchedaVettura(this.id);
                    /**get data dipendente */
                    this.getDataDipendenteComboBox();
                }
            } else {
                // se la variabile e undefined, ritorna a scheda vettura
                let link = ['/office/scheda-vettura'];
                this.router.navigate(link);

            }

        });


        this.subscriptionNew = this.eventHomeService.getNewChangeEmitter()
            .subscribe(item => this.nuovoDetalleSchedaVettura(item));

        this.subscriptionEdit = this.eventHomeService.getEditChangeEmitter()
            .subscribe(item => this.editarDetalleSchedaVettura());

        //enviar titulo
        this.eventHomeService.emitTitleChangeEvent(this.title);

        //activar controlles
        let controlMenu: ControlMenu = new ControlMenu();
        controlMenu.add = true;
        controlMenu.edit = true;
        this.eventHomeService.emitControlMenuChangeEvent(controlMenu);

        //traer datos dal Observer
        // this.getData();
    }

    /**
     * obtenemos la informazione della web services del 
     * detalle scheda vettura id
     */
    data: SchedaVettura = new SchedaVettura();
    //data: SchedaVettura[] = [];
    getDataDetalleSchedaVettura(id: string) {
        this.api.setUrl('api/schedavettura/detalle');
        this.api.getData(id).subscribe(res => {
            if (res.status == 200) {
                if (res.json()['data'] != null)
                    this.data = res.json()['data'];
            }
            if (res.status == 404) {
                //this.data = [];
            }
        });
    }

 onGridReady(grid: any) {
    grid.columns[0].renderer = cell =>
        cell.element.textContent = cell.row.index;
        
    //grid.items = (params: any, callback: Function) =>
    //grid.items=(params: any, callback: Function)=> this._getJSON().subscribe(json => callback(json.json()['data'], json.json()['data'].size)) ;
grid.cellClassGenerator = function(cell) {
  if (cell.index == 2) {
     return "activity-" + cell.data.toLowerCase();
   }
 };
  }

    _getJSON(): Observable<any> {
        
        this.api.setUrl('api/schedavettura/detalle');
        return this.api.getData(this.id);
       
/*
    return this.http.get(url)
      .map((res: Response) => res.json())*/
  }



    /**model data dipendente  */
    dataDipendente: Dipendente[] = [];

    getDataDipendenteComboBox() {
        this.api.setUrl('api/dipendentefullname');
        this.api.getData().subscribe(res => {
            if (res.status == 200) {
                if (res.json()['data'] != null)
                    this.dataDipendente = res.json()['data'];
            }
            if (res.status == 404) {
                //this.data = [];
            }
        });
    }



    /**selezionare detalle scheda vettura vaadin grid */

    //selectPersona: detalle scheda vettura;
    onSelectedItemsChanged(event: any) {

        let selectedIndex: number = event.target.selection.selected()[0];
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            let mo=this.data.detalle_scheda_vettura[selectedIndex];
            this.modelTemp=this.data.detalle_scheda_vettura[selectedIndex];
            this.model =mo;
            this.asignForceDataForm();
            //aprire il paper-dialog
            //this.dialogEditVettura.nativeElement.open(event);
            console.log(this.model);
            //this.dialogEditDetalleSchedaVettura.nativeElement.open(event);
        }
    }

    @ViewChild('check') check: any;
    checkBox: any;
    change(event: any) {
        //$event.target.checked
        this.checkBox = event.target;
        this.model.lavorabile = event.target.checked;
    }



    //esto es un bug del checkBox, asi que se lefuerza a coger  su valor
    asignForceDataForm() {
        if (this.model.lavorabile)
            this.check.nativeElement.checked = true;
        else
            this.check.nativeElement.checked = false;

        console.log(this.check.nativeElement.checked);
    }

    /*referenza del componente paper-dialog */

    @ViewChild('opendetalleschedavettura') dialogEditDetalleSchedaVettura: ElementRef;



    nuovoDetalleSchedaVettura(item) {
        this.model = new DetalleSchedaVettura();
        this.model.scheda_vettura_id = this.id;
        this.model.nro_gg = this.data.detalle_scheda_vettura.length + 1;

        this.dialogEditDetalleSchedaVettura.nativeElement.open(event);
    }


    editarDetalleSchedaVettura() {
        this.dialogEditDetalleSchedaVettura.nativeElement.open(event);
        /*if (this.model) {
            let link = ['/office/scheda-vettura/detalle', this.model.id];
            this.router.navigate(link);
        }*/
    }

    /**select combobox dipendente */

    selectedItemDipendente(event: any) {
        let selectedIndex: number = event.target.selection.selected()[0];
       
        if (selectedIndex !== undefined) {
            //this.onSelect(this.heroes[selectedIndex]);
            
            this.model.dipendente_id = this.dataDipendente[selectedIndex].id;
            this.model.fullname_dipendente = this.dataDipendente[selectedIndex].full_name;
            //aprire il paper-dialog
            //this.dialogEditSchedaVettura.nativeElement.open(event);
        }
    }

    /**salvare detalle scheda vettura  */
    message: string;
    salvaDetalleVettura() {
        if (this.validarDetalleSchedaVettura()) {

            this.message = 'Tutti i campi sevono essere selezionati';
            return;
        }
        console.log(this.validarDetalleSchedaVettura());

        //schedavettura/{id}/detalle
        this.api.setUrl("/api/schedavettura/detalleschedavettura");
        this.api.register(this.model)
            .subscribe(
            res => {
                //codigo 202 es de registro
                if (res.status == 200) {
                    //console.log(res.json()['data']);

                    this.model = res.json()['data'];
                    this.message = res.json()['message'];

                    let da = this.data.detalle_scheda_vettura.find(item => item.id === this.model.id);
                    if (da == undefined)
                        this.data.detalle_scheda_vettura.push(this.model);
                    //console.log(da);
                    this.dialogEditDetalleSchedaVettura.nativeElement.close(event);

                }

                else
                    console.log(JSON.stringify(res));
                return false;
            }
            );
    }
//[items]="data.detalle_scheda_vettura"
    closeDialog(event:any){
        if(event.detail.confirmed==false)
            this.model=this.modelTemp;
        console.log(event);
    }


    validarDetalleSchedaVettura(): boolean {
        let sw = false;
        return sw;
    }

/**cambia valor del km total */


    changeValueKmTotale(event: any){
        if(event==undefined)
            event=0;
       // this.model.km_ini=event;
        this.model.km_totale=this.model.km_fine-this.model.km_ini;
        //console.log(this.model.km_fine-this.model.km_ini);
        console.log(event);
    }

changeValueKmFinale(event: any){
        if(event==undefined)
            event=0;
        this.model.km_totale=event;
        let total:number=this.model.km_ini + event;
        this.model.km_fine=total;
        //console.log(this.model.km_fine-this.model.km_ini);
        console.log(event);
        
    }


    ngOnDestroy() {
        this.subscriptionNew.unsubscribe();
        this.subscriptionEdit.unsubscribe();
    }

}