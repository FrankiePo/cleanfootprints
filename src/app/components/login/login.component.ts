import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/models/user/user.service';

export interface ILogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorData: {
    email?: string[],
    password?: string[],
  };
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.errorData = {};
    this.loginForm.get('email').valueChanges.subscribe((value) => {
      this.errorData.email = null;
    });
    this.loginForm.get('password').valueChanges.subscribe((value) => {
      this.errorData.password = null;
    });
  }
  private isSuccess(formField: AbstractControl): any {
    return formField.valid;
  }
  private isWarning(formField: AbstractControl): any {
    return formField.invalid && formField.dirty;
  }
  private isDanger(formField: AbstractControl): any {
    // TODO: remove
    return this.errorData && this.errorData.email && formField === this.loginForm.get('email');
  }
  inputClass(form: FormGroup, field: string): any {
    const formField = form.get(field);
    return {
      'form-control-success': this.isSuccess(formField),
      'form-control-warning': this.isWarning(formField),
      'form-control-danger' : this.isDanger(formField),
    };
  }
  formGroupClass(form: FormGroup, field: string) {
    const formField = form.get(field);
    return {
      'has-success': this.isSuccess(formField),
      'has-warning': this.isWarning(formField),
      'has-danger' : this.isDanger(formField),
    };
  }
  onSubmit({ value, valid }: { value: ILogin, valid: boolean }) {
    if (valid) {
      const { email, password } = value;
      this.userService.login(email, password).subscribe(
        successData => {
          this.router.navigate(['/account']);
          console.log('(LoginComponent) onSubmit: success:', successData);
        },
        errorData => {
          console.error('(LoginComponent) onSubmit: error:', errorData);
          this.errorData = errorData;
          // TODO: remove this shit
          Object.keys(errorData)
            .forEach(key => {
              const errorDict = errorData[key].reduce((prev, cur) =>
                Object.assign(prev, {[cur]: true}), {});
              this.loginForm.get(key).setErrors(errorDict)
            });
        });
    } else {
      this.loginForm.get('password').markAsDirty();
      this.loginForm.get('email').markAsDirty();
    }
  }
}
