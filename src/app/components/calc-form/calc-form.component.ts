import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.scss']
})
export class CalcFormComponent implements OnInit {
  calcForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.calcForm = this.fb.group({
      name: ['', []],
      password: ['', []],
    });

  }

  inputClass(form: FormGroup, field: string): any {
    const formField = form.get(field);
    return {
      'form-control-success': formField.valid,
      'form-control-warning': formField.invalid && !formField.pristine
    };
  }
  formGroupClass(form: FormGroup, field: string) {
    const formField = form.get(field);
    return {
      'has-success': formField.valid,
      'has-warning': formField.invalid && !formField.pristine
    };
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      // const { email, password } = value;
      // this.userService.login(email, password).subscribe(res => {
      //   console.log('sub', res);
      // });
    }
  }
}
