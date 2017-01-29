import { Component, OnInit } from '@angular/core';
import { HomeEventosService, ControlMenu } from './home.event.services';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Pagin home!';
  item = 1;
  subscription: any;
  controlMenu:ControlMenu= new ControlMenu();
  constructor(private eventHomeService: HomeEventosService) { }

  ngOnInit() {
    this.subscription = this.eventHomeService.getTitleChangeEmitter()
      .subscribe(item => this.getTitle(item));


    this.subscription = this.eventHomeService.getControlMenuChangeEmitter()
      .subscribe(item => this.getControlMenu(item));

  }

  getControlMenu(controlmenu){
    this.controlMenu=controlmenu;
    //console.log(this.controlMenu);
  }
  getTitle(title) {
    this.title = title;
  }

  save(item: number) {
    //console.log('selected nav item ');
    this.eventHomeService.emitSaveChangeEvent(item);
  }

  nuovo(sw){
    if(sw){
      this.eventHomeService.emitNewChangeEvent(sw);
    }
  }
  back(item: number) {
    console.log('selected indietro back ');
    this.eventHomeService.emitBackChangeEvent(item);
  }

    edit(item: number) {
    console.log('selected indietro edit ');
    this.eventHomeService.emitEditChangeEvent(item);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
