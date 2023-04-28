import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private toastrService: ToastrService
  ) {}
  registerForm: FormGroup = this.fb.group({
    "name" : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20), Validators.pattern(/^[A-Z]{1}[a-z]{0,19}$/)]),
    "email" : new FormControl(null , [Validators.required , Validators.email]),
    "password" : new FormControl(null , [Validators.required ]),
    "rePassword" : new FormControl(null , [Validators.required ]),
    "phone" : new FormControl(null ,  [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]),
  });
 

  // Sign Up Form
  setSignUpForm(obj: FormGroup): void {
    if (obj.valid)
      this._AuthService.signUpApi(obj.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            obj.reset();
            this.toastrService.success('SignUp Successfully', 'Success', {
              timeOut: 3000,
            });
            this._Router.navigate(['/auth/signin']);
          } else {
            this.toastrService.error(
              `${response.message.slice(response.message.indexOf(':') + 1)}`,
              'Error',
              {
                timeOut: 3000,
              }
            );
          }
        },
      });
  }
}
