import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  category: any = {};
  categoryError: string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  loadCategory = () => {
    this.subscription = this._CategoryService.getCategory(this.id).subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {},
    });
  };

  updateCategory = (formData: FormGroup) => {
    if (formData.value.name !== null) {
      this._CategoryService.updateCategory(this.id, formData.value).subscribe({
        next: (res) => {
          this._SnackbarService.showSnackbar('Category updated successfully');
          this._Router.navigate(['/categories']);
        },
        error: (err) => {
          this.categoryError = err.error.errors[0].msg;
        },
      });
    }
    else this._Router.navigate(['/categories']);
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadCategory();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
