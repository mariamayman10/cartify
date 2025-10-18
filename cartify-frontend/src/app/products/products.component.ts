import { Component } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _Router: Router,
    private _SnackbarService: SnackbarService
  ) {}

  subscription: any;
  categories: any[] = [];
  imgDomain: string = '';
  products: any[] = [];
  pagination: Pagination = {};
  search: string = '';
  page: number = 1;

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts() {
    this.imgDomain = this._ProductsService.imgDomain;
    this.subscription = this._ProductsService
      .getProducts(16, this.page, undefined, this.search)
      .subscribe((res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      });
  }

  addProductToWishlist(product: string) {
    this._WishlistService.addProductToWishlist(product).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product added to wishlist');
      },
      error: () => {
        this._SnackbarService.showSnackbar('Sign in first');
      },
    });
  }
  addProductToCart(product: string) {
    this._CartService.addProductToCart(product).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product added to cart');
      },
      error: () => {
        this._SnackbarService.showSnackbar('Sign in first');
      },
    });
  }
  viewProductDetails(product: string) {
    this._Router.navigate([`/products/${product}`]);
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }
}
