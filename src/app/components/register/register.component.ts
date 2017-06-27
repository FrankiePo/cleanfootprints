import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalValidator } from '../../shared/validators/equal.validator';
import { UserService } from '../../shared/models/user/user.service';

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
  constructor(private formBuilder: FormBuilder, public userService: UserService) {}

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
    this.loginForm.statusChanges.subscribe(val => console.log(this.loginForm.errors));
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
    if (valid) {
      const { name, email, password } = value;
      this.userService.signUp(name, email, password).subscribe(res => console.log('sub', res));
    }
  }
}
