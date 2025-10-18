import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
  ) {}

  sendMailError: string = '';
  verifyCodeError: string = '';
  resetPasswordError: string = '';
  sendMailFlag: boolean = false;
  verifyCodeFlag: boolean = false;

  sendMailForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCodeForm = new FormGroup({
    d1: new FormControl(null, [Validators.required]),
    d2: new FormControl(null, [Validators.required]),
    d3: new FormControl(null, [Validators.required]),
    d4: new FormControl(null, [Validators.required]),
    d5: new FormControl(null, [Validators.required]),
    d6: new FormControl(null, [Validators.required]),
  });
  resetPasswordForm = new FormGroup({
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

  sendMail = (formData: FormGroup) => {
    this._AuthenticationService.sendMail(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('verifyAdmin', res.resetToken);
        this.sendMailFlag = true;
      },
      error: (err) => {
        this.sendMailError = err.error.message;
      },
    });
  };
  verifyCode = (formData: FormGroup) => {
    const code: string =
      formData.get('d1')?.value.toString() +
      formData.get('d2')?.value.toString() +
      formData.get('d3')?.value.toString() +
      formData.get('d4')?.value.toString() +
      formData.get('d5')?.value.toString() +
      formData.get('d6')?.value.toString();
    this._AuthenticationService.verifyCode({ resetCode: code }).subscribe({
      next: (res) => {
        this.verifyCodeFlag = true;
      },
      error: (err) => {
        this.verifyCodeError = err.error.message;
      },
    });
  };
  resetPassword = (formData: FormGroup) => {
    this._AuthenticationService.resetPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.removeItem('verifyAdmin');
        this.sendMailFlag = false;
        this.verifyCodeFlag = false;
        this._Router.navigate(['/signin']);
      },
      error: (err) => {
        this.resetPasswordError = err.error.errors[0].msg;
      },
    });
  };

  onInput(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (value.length > 1) {
      inputElement.value = value.slice(0, 1);
    }
    if (value && index < 5) {
      const nextInput = document.querySelectorAll('.vc-input')[
        index + 1
      ] as HTMLInputElement;
      nextInput.focus();
    }
  }
  onKeyDown(event: KeyboardEvent, index: number) {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !inputElement.value && index > 0) {
      const prevInput = document.querySelectorAll('.vc-input')[
        index - 1
      ] as HTMLInputElement;
      prevInput.focus();
    }
  }
}
