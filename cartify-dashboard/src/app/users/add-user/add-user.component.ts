import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _UserService: UserService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  createUserForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
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

  createUser(formData: FormGroup) {
    this._UserService.createUser(formData.value).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('User created successfully');
        this._Router.navigate(['/users']);
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') this.emailError = error.msg;
          if (error.path === 'password') this.passwordError = error.msg;
        });
      },
    });
  }
  ngOnInit(): void {
    this._AuthenticationService.checkToken();
  }
}
