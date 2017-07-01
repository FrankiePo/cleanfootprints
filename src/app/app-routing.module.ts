import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'calculator', component: CalculatorComponent },
  {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule',
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
