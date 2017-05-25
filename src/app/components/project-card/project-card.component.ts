import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  projectForm: FormGroup;
  donationTypes = [
    {
      label: '1 Раз',
      value: 'one',
    }, {
      label: 'Регулярно',
      value: 'temp',
    },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      donationType: 'temp'
    });
    this.projectForm.valueChanges.subscribe(aga => console.log(aga));
  }
}
