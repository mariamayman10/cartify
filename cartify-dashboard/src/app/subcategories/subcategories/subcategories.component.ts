import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../interfaces/pagination';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-subSubcategories',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './Subcategories.component.html',
  styleUrl: './Subcategories.component.scss',
})
export class SubcategoriesComponent {
  subscription: any;
  subcategories: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _SubcategoryService: SubcategoryService,
    private _SnackbarService: SnackbarService
  ) {}

  searchSubcategories = (data: any) => {
    this.search = data;
    this.loadSubcategories();
  };

  loadSubcategories = () => {
    this.subscription = this._SubcategoryService
      .getSubcategories(undefined, this.page, undefined, this.search)
      .subscribe({
        next: (res) => {
          this.subcategories = res.data;
          this.pagination = res.pagination;
        },
      });
  };

  deleteSubcategory = (subcategoryId: string) => {
    this._SubcategoryService.deleteSubcategory(subcategoryId).subscribe({
      next: (res) => {
        this.loadSubcategories();
        this._SnackbarService.showSnackbar('Subcategory deleted successfully');
      },
    });
  };
  changePage = (page: number) => {
    this.page = page;
    this.loadSubcategories();
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.loadSubcategories();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
