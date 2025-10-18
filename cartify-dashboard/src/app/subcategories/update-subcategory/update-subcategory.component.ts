import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubcategoryService } from '../../services/subcategory.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss',
})
export class UpdateSubcategoryComponent implements OnInit, OnDestroy {
  subcategorySubscription: any;
  categorySubscription: any;
  id: string = '';
  categories: any[] = [];
  subcategory: any = {};
  subcategoryError: string = '';
  subcategoryForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ActivatedRoute: ActivatedRoute,
    private _SubcategoryService: SubcategoryService,
    private _CategoryService: CategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  loadSubcategory = () => {
    this.subcategorySubscription = this._SubcategoryService
      .getSubcategory(this.id)
      .subscribe({
        next: (res) => {
          this.subcategory = res.data;
        },
        error: (err) => {},
      });
  };

  getCategories = () => {
    this.categorySubscription = this._CategoryService
      .getCategories(200, undefined, 'name', '')
      .subscribe({
        next: (res) => {
          this.categories = res.data;
        },
      });
  };

  updateSubcategory = (formData: FormGroup) => {
    if (formData.value.name === null && formData.value.category === null) {
      this._Router.navigate(['/subcategories']);
    } else {
      if (formData.value.name === null) {
        formData.value.name = this.subcategory.name;
      }
      if (formData.value.category === null) {
        formData.value.category = this.subcategory.category._id;
      }
      this._SubcategoryService
        .updateSubcategory(this.id, formData.value)
        .subscribe({
          next: (res) => {
            this._SnackbarService.showSnackbar(
              'Subcategory updated successfully'
            );
            this._Router.navigate(['/subcategories']);
          },
          error: (err) => {
            // console.log(err);
            this.subcategory = err.error.errors[0].msg;
          },
        });
    }
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadSubcategory();
    this.getCategories();
  }
  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.subcategorySubscription.unsubscribe();
  }
}
