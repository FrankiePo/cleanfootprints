import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalValidator } from '../../shared/validators/equal.validator';

interface IReg {
  name: string;
  tel: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    //   checkPass: ['', [
    //     Validators.required,
    //     Validators.minLength(6)
    //   ]],
    // }, {
    //   validator: equalValidator('password', 'checkPass')
    });
    this.registerForm.statusChanges.subscribe(val => console.log(this.registerForm.errors));
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
  onSubmit({ value, valid }: { value: IReg, valid: boolean }) {
    console.log(value, valid);
  }
}
