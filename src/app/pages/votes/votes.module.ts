import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotesRoutingModule } from './votes-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    VotesRoutingModule,
    NbCardModule,
    FormsModule,
  ]
})
export class VotesModule { }
