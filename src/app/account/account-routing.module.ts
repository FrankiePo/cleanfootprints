import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { FootprintComponent } from './footprint/footprint.component';
import { SubscribtionsComponent } from './subscribtions/subscribtions.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'footprint', pathMatch: 'full' },
      { path: 'footprint', component: FootprintComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'subscriptions', component: SubscribtionsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
