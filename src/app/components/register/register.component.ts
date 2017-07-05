import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { equalValidator } from '../../shared/validators/equal.validator';
import { UserService } from '../../shared/models/user/user.service';
import { Router } from '@angular/router';

interface IReg {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  errorData: {
    name?: string[],
    email?: string[],
    password?: string[],
  };
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    this.loginForm.get('name').valueChanges.subscribe((value) => {
      this.errorData.name = null;
    });
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
  onSubmit({ value, valid }: { value: IReg, valid: boolean }) {
    if (valid) {
      const { email, password } = value;
      this.userService.signUp(email, password).subscribe(
        successData => {
          console.log('(onSubmit) success:', successData);
          this.router.navigate(['/account']);
        },
        errorData => {
          console.error('(onSubmit) error:', errorData);
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
      this.loginForm.get('name').markAsDirty();
      this.loginForm.get('password').markAsDirty();
      this.loginForm.get('email').markAsDirty();
    }
  }
}
