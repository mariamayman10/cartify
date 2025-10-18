import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  products: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  imgDomain: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ProductsService: ProductsService,
    private _SnackbarService: SnackbarService
  ) {}

  searchProducts = (data: any) => {
    this.search = data;
    this.loadProducts();
  };

  loadProducts = () => {
    this.subscription = this._ProductsService
      .getProducts(undefined, this.page, undefined, this.search)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
        },
      });
  };

  deleteProduct = (productId: string) => {
    this._ProductsService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        this._SnackbarService.showSnackbar('Product deleted successfully');
      },
    });
  };
  changePage = (page: number) => {
    this.page = page;
    this.loadProducts();
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._ProductsService.productImg;
    this.loadProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
