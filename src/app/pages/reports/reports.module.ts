import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PoliticalPartiesComponent } from './political-parties/political-parties.component';
import { VoterTablesComponent } from './voter-tables/voter-tables.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    CandidatesComponent,
    DashboardComponent,
    PoliticalPartiesComponent,
    VoterTablesComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbCardModule,
    FormsModule,

  ]
})
export class ReportsModule { }
