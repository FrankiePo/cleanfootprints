import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  template: `
    <app-clean-footprint></app-clean-footprint>
    <app-calculator></app-calculator>
  `,
})
export class AccountComponent {

  constructor() { }
}
