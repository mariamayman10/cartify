import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  invalidSignIn: string = '';

  signIn(formData: FormGroup) {
    this.authService.signIn(formData.value).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem('adminToken', res.token);
          this.authService.saveCurrentUser();
        }
        this.router.navigate(['/home']);
      },
      (err) => {
        this.invalidSignIn = err.error.message;
      }
    );
  }
}
