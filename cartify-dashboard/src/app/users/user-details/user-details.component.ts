import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
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
    private _ActivatedRoute: ActivatedRoute,
    private _UserService: UserService,
    private _Router: Router,
    private _SnackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.userImage = this._UserService.userImg;
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUser = () => {
    this.subscription = this._UserService.getUser(this.id).subscribe({
      next: (res) => {
        this.user = res.data;
        this.name = this.user.name;
      }
    })
  }
  deleteUser = () => {
    this._UserService.deleteUser(this.id).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('User deleted successfully');
        this._Router.navigate(['/users']);
      }
    })
  }

  updateUser = () => {
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    this._UserService.updateUser(this.id, formData).subscribe({
      next: (res) => {
        this.loadUser();
        this._SnackbarService.showSnackbar('User updated successfully');
      },
    });
  }

  changeUserPassword = (formData: FormGroup) => {
    this.currentPasswordError = '';
    this.passwordError = '';
    this._UserService.updateUserPassword(this.id, formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        this._AuthenticationService.saveCurrentUser();
        this._SnackbarService.showSnackbar('Password changed successfully');
        this._AuthenticationService.logout();
        this._Router.navigate(['/signin']);
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
