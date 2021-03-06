import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieXSRFStrategy, HttpModule, XSRFStrategy } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CompareComponent } from './components/compare/compare.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NumbersComponent } from './components/numbers/numbers.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CleanFootprintComponent } from './components/clean-footprint/clean-footprint.component';
import { GraphService } from './shared/models/graph/graph.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './shared/models/user/user.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AccountModule } from './account/account.module';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { CalcFormComponent } from './components/calc-form/calc-form.component';

export function cookieStrategy() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}

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
    CleanFootprintComponent,
    SignUpComponent,
    RegisterComponent,
    LoginComponent,
    LoginPageComponent,
    CalculatorComponent,
    CalcFormComponent,
  ],
  imports: [
    BrowserModule,
    AccountModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: XSRFStrategy, useFactory: cookieStrategy },
    GraphService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
