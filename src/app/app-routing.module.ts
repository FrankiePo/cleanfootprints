import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ProjectsComponent } from './pages/projects.component';
import { AboutComponent } from './pages/about.component';
import { AccountComponent } from 'app/pages/account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   { path: '', redirectTo: 'overview', pathMatch: 'full' },
    //   { path: 'overview', component: Overview },
    //   { path: 'specs', component: Specs }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
