import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IProject } from '../../shared/models/iproject';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  projectForm: FormGroup;
  @Input() project: IProject;
  donationTypes: Array<{label: string, value: string}> = [
    {
      label: '1 Раз',
      value: 'one',
    }, {
      label: 'Регулярно',
      value: 'temp',
    },
  ];
  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      donationType: 'temp'
    });
    this.projectForm.valueChanges.subscribe(aga => console.log(aga));
  }
  setBackground(project: IProject) {
    const withGradient = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.image})`;
    return this.sanitizer.bypassSecurityTrustStyle(withGradient);
  }
}
