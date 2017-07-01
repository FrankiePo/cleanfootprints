import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { FootprintComponent } from './footprint/footprint.component';
import { SubscribtionsComponent } from './subscribtions/subscribtions.component';
import { AccountComponent } from './account.component';
import { HistoryComponent } from './history/history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ProjectCardComponent } from './footprint/project-card/project-card.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
  ],
  declarations: [
    FootprintComponent,
    SubscribtionsComponent,
    AccountComponent,
    HistoryComponent,
    ProjectCardComponent
  ],
  bootstrap: [
    AccountComponent
  ]
})
export class AccountModule { }
