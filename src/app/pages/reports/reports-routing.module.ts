import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { PoliticalPartiesComponent } from './political-parties/political-parties.component';
import { VoterTablesComponent } from './voter-tables/voter-tables.component';

const routes: Routes = [
  {
    path: 'mesas',
    component: VoterTablesComponent
  },
  {
    path: 'partidos',
    component: PoliticalPartiesComponent
  },
  {
    path: 'candidatos',
    component: CandidatesComponent
  },
  {
    path: 'general',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
