import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  categoryError: string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CategoryService: CategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  createCategory = (formData: FormGroup) => {
    this._CategoryService.createCategory(formData.value).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Category created successfully');
        this._Router.navigate(['/categories']);
      },
      error: (err) => {
        this.categoryError = err.error.errors[0].msg;
      },
    });
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
  }
}
