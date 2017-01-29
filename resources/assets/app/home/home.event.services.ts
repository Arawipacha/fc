import { EventEmitter } from '@angular/core';

export class HomeEventosService {



  constructor() { }
  navchange: EventEmitter<number> = new EventEmitter();



  emitNavChangeEvent(number) {
    this.navchange.emit(number);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }

/*emitir  activar los controles del menu principal */
  controlMenuComponentChange: EventEmitter<ControlMenu>= new EventEmitter();
  emitControlMenuChangeEvent(controlMenu:ControlMenu) {
    this.controlMenuComponentChange.emit(controlMenu);
  }
  getControlMenuChangeEmitter() {
    return this.controlMenuComponentChange;
  }



  titleComponentChange: EventEmitter<string>= new EventEmitter();

  emitTitleChangeEvent(title) {
    this.titleComponentChange.emit(title);
  }

  getTitleChangeEmitter() {
    return this.titleComponentChange;
  }

/**
 * evento new boton nuevo
 */
newComponentChange: EventEmitter<string> = new EventEmitter();
 /*recibir datos */
  emitNewChangeEvent(sw) {
    this.newComponentChange.emit(sw);
  }
/*recibir  evento */
  getNewChangeEmitter() {
    return this.newComponentChange;
  }


/**
 * evento new boton editare
 */
editComponentChange: EventEmitter<string> = new EventEmitter();
 /*recibir datos */
  emitEditChangeEvent(sw) {
    this.editComponentChange.emit(sw);
  }

/*recibir  evento */
  getEditChangeEmitter() {
    return this.editComponentChange;
  }


/**
 * evento save boton salvare
 */
saveComponentChange: EventEmitter<string> = new EventEmitter();
 /*recibir datos */
  emitSaveChangeEvent(sw) {
    this.saveComponentChange.emit(sw);
  }

/*recibir  evento */
  getSaveChangeEmitter() {
    return this.saveComponentChange;
  }



/**
 * evento back boton indietro
 */
backComponentChange: EventEmitter<string> = new EventEmitter();
 /*recibir datos */
  emitBackChangeEvent(sw) {
    this.backComponentChange.emit(sw);
  }

/*recibir  evento */
  getBackChangeEmitter() {
    return this.backComponentChange;
  }


}

export class ControlMenu{
  public view:boolean=false;
  public add:boolean=false;
  public edit:boolean=false;
  public update:boolean=false;
  public search:boolean=false;
  public save:boolean=false;
  public back:boolean=false;
  constructor(){   }
}