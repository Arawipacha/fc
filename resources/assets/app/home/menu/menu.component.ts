import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  //styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedTab = "1";
  constructor() {}
  ngOnInit() {
   
  }
 
 	onSelectTab(event) {
		this.selectedTab = event.target.selected;
	}

}
