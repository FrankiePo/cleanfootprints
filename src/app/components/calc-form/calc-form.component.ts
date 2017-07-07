import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/models/user/user.service';
import {
GraphWasteType,
GraphWasteTypeDefs
} from '../../shared/models/graph/graph-waste-type.enum';
import { GraphService } from '../../shared/models/graph/graph.service';
import {
  IGraphRequest,
  IRecycle
} from '../../shared/models/graph/igraph-request';

const range = (length, startsWith = 0) => Array(length).fill(0).map((v, i) => i + startsWith);

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.scss']
})
export class CalcFormComponent implements OnInit {
  calcForm: FormGroup;
  isLoggedIn: boolean;
  familyCountSelect = range(10, 1);
  familyCountArray = [0];
  lastHundredYears = Array(100)
    .fill(new Date().getFullYear())
    .map((y, i) => y - i);
  weights = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 40, 50];
  graphTypes = Object.values(GraphWasteType)
    .filter(v => typeof v === 'number')
    .slice(0, -1); // To remove TOTAL
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private graphService: GraphService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
    this.calcForm = this.fb.group({
      name: ['', []],
      email: ['', []],
      password: ['', []],
      familyCount: [1, []],
      birthdays: this.fb.group({
        0: '2017',
        1: '2017',
        2: '2017',
        3: '2017',
        4: '2017',
        5: '2017',
        6: '2017',
        7: '2017',
        8: '2017',
        9: '2017',
        10: '2017',
      }),
      // private_recycling
      recycling: this.fb.group({
        [GraphWasteType.PAPER]  : '0',
        [GraphWasteType.PLASTIC]: '0',
        [GraphWasteType.GLASS]  : '0',
        [GraphWasteType.METAL]  : '0',
        [GraphWasteType.TEXTILE]: '0',
        [GraphWasteType.FOOD]   : '0',
        [GraphWasteType.OTHER]  : '0',
      }),
      fromYear: '2017'
    });
    this.calcForm.get('familyCount').valueChanges
      .subscribe(val => this.familyCountArray = range(Number(val)));
    this.calcForm.valueChanges.subscribe(value => console.log('calcForm', this.calcForm));
  }
  getTitle(type: GraphWasteType): string {
    return GraphWasteTypeDefs[type];
  }
  serialize(form: FormGroup): IGraphRequest {
    const birthdays = Object
      .values(form.get('birthdays').value)
      .map(Number)
      .slice(0, Number(form.get('familyCount').value));
    const fromYear = Number(form.get('fromYear').value);
    const privateRecycling = Object
      .entries(form.get('recycling').value)
      .map(([key, value]) => ({
        fromYear: fromYear,
        type: Number(key),
        amountPerMonth: Number(value),
      }));
    return { birthdays, privateRecycling };
  }
  onSubmit(form: FormGroup) {
    const { value, valid } = form;
    const request = this.serialize(form);
    if (!this.isLoggedIn) {
      const { email, password } = value;
      this.userService.signUp(email, password).subscribe(success => {
        this.graphService.getGraphs(request).subscribe(_ => {
          this.router.navigate(['/account']);
        });
      });
    } else {
      this.graphService.getGraphs(request).subscribe(_ => {
        this.router.navigate(['/account']);
      });
    }
    // if (valid) {
    //   // const { email, password } = value;
    //   // this.userService.login(email, password).subscribe(res => {
    //   //   console.log('sub', res);
    //   // });
    // } else {
    //   const controls = ['name', 'email', 'familyCount', 'birthdays'];
    //   // TODO: mark as dirty
    //   // controls.forEach(ctrl => _);
    // }
  }
}
