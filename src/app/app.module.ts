import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CompareComponent } from './components/compare/compare.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NumbersComponent } from './components/numbers/numbers.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ProjectsComponent } from './pages/projects.component';
import { AccountComponent } from './pages/account.component';
import { CleanFootprintComponent } from './components/clean-footprint/clean-footprint.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    CompareComponent,
    AboutUsComponent,
    NumbersComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    AccountComponent,
    CleanFootprintComponent,
    CalculatorComponent,
    ProjectCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
