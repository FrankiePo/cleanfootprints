import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-numbers></app-numbers>
    <app-about-us></app-about-us>
    <app-compare></app-compare>
  `,
})
export class HomeComponent {

  constructor() { }
}
