import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoryService } from '../../services/category.service';
import { Pagination } from '../../interfaces/pagination';
import { SubcategoryService } from '../../services/subcategory.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  subcategoriesCount: { [key: string]: number } = {};

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CategoryService: CategoryService,
    private _SubcategoryService: SubcategoryService,
    private _SnackbarService: SnackbarService
  ) {}

  searchCategories = (data: any) => {
    this.search = data;
    this.loadCategories();
  }

  loadCategories = () => {
    this.subscription = this._CategoryService
      .getCategories(undefined, this.page, undefined, this.search)
      .subscribe({
        next: (res) => {
          this.categories = res.data;
          this.pagination = res.pagination;
          this.categories.forEach((category) => {
            this.getSpecificSubcategories(category._id);
          });
        },
      });
  };

  getSpecificSubcategories(categoryId: string): void {
    this._SubcategoryService
      .getSubcategories(300, 1, '', '', categoryId)
      .subscribe({
        next: (res) => {
          this.subcategoriesCount[categoryId] = res.length;
        },
      });
  }

  deleteCategory = (categoryId: string) => {
    this._CategoryService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        this._SnackbarService.showSnackbar('Category deleted successfully');
      },
    });
  };
  changePage = (page: number) => {
    this.page = page;
    this.loadCategories();
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.loadCategories();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
