import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy{
  subscription: any;
  infoError: string = '';
  currentPasswordError: string = '';
  passwordError: string = '';
  user: any = {};
  userImage: string = '';
  name: string = '';
  imageFile: any;

  getName(name: string) {
    this.name = name;
  }
  getFile(event: any) {
    const image = event.target.files[0];
    if (image) {
      this.imageFile = image;
    }
  }

  passwordForm = new FormGroup({
    currentPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ProfileService: ProfileService,
    private _Router: Router,
    private _SnackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.userImage = this._ProfileService.userImage;
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUser() {
    this.subscription = this._ProfileService.getSignedInUser().subscribe({
      next: (res) => {
        this.user = res.data;
        this.name = this.user.name;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateUser() {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    this._ProfileService.updateSignedInUser(formData).subscribe({
      next: (res) => {
        this.loadUser();
        this._SnackbarService.showSnackbar('User updated successfully')
      },
    });
  }

  changeUserPassword(formData: FormGroup) {
    this.currentPasswordError = '';
    this.passwordError = '';
    this._ProfileService.updateSignedInUserPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        this._AuthenticationService.saveCurrentUser();
        this._SnackbarService.showSnackbar('Password changed successfully');
        this._AuthenticationService.logout();
        this._Router.navigate(['/signin'])
      },
      error: (err) => {
        console.log(err);
        err.error.errors.map((error: any) => {
          if (error.path === 'currentPassword') {
            this.currentPasswordError = error.msg;
          } else if (error.path === 'confirmPassword') {
            this.passwordError = error.msg;
          }
        });
      },
    });
  }
}
