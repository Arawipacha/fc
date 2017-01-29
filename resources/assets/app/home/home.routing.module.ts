import { PercorsoListComponent } from './../percorso/percorso.list.component';
import { DipendenteComponent } from './../dipendente/dipendente-edit/dipendente.component';
import { DipendenteListComponent } from './../dipendente/dipendente.list.component';
import { PercorsoComponent } from './../percorso/percorso-edit/percorso.component';
import { DetalleSchedaVetturaComponent } from './../scheda/detalle_scheda_vettura/detalle.scheda.vettura.component';
import { SchedaVetturaListComponent } from './../scheda/scheda.vettura.list.component';
import { VetturaListComponent } from './../vettura/VetturaList/VetturaList.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from '../services/AuthGuard';
import { VetturaComponent } from '../vettura/vettura.component';


const routes: Routes = [
  { path: 'office',
    component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: VetturaComponent },//este componente se administra da solo insert edit  y list
      { path: 'vettura', component: VetturaComponent },//este componente se administra da solo insert edit  y list
      { path: 'scheda-vettura', component: SchedaVetturaListComponent },
      { path: 'scheda-vettura/detalle/:id', component: DetalleSchedaVetturaComponent },
      { path: 'percorso', component: PercorsoListComponent },
      { path: 'percorso/edit/:id', component: PercorsoComponent },

      //dipendente
      { path: 'dipendente', component: DipendenteListComponent },
      { path: 'dipendente/edit/:id', component: DipendenteComponent },
      
      //{ path: ':id', component: HeroDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class HomeRoutingModule {}