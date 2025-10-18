import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  signupForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  emailError: string = '';
  passwordError: string = '';

  signUp(formData: FormGroup){
    this._AuthenticationService.signUp(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._AuthenticationService.saveCurrentUser();
        }
        this._Router.navigate(['/home']);
      },
      (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') this.emailError = error.msg;
          if (error.path === 'password') this.passwordError = error.msg;
        });
      }
    );
  }
}
