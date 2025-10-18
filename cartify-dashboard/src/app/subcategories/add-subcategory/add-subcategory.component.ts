import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss',
})
export class AddSubcategoryComponent implements OnInit, OnDestroy{
  subscription: any;
  subcategoryError: string = '';
  categories: any[] = [];
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _SubcategoryService: SubcategoryService,
    private _CategoryService: CategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  getCategories = () => {
    this.subscription =  this._CategoryService.getCategories(200, undefined, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  };

  createSubcategory = (formData: FormGroup) => {
    this._SubcategoryService.createSubcategory(formData.value).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Subcategory created successfully');
        this._Router.navigate(['/subcategories']);
      },
      error: (err) => {
        this.subcategoryError = err.error.errors[0].msg;
      },
    });
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.getCategories();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
