import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ReviewsService: ReviewsService,
    private _SnackbarService: SnackbarService
  ) {}

  subscription: any;
  imgDomain: string = '';
  product: any = {};
  id: string = '';
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 5;
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100),
    ]),
    rate: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductsService.imgDomain;
    this.loadProduct();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProduct() {
    this.subscription = this._ProductsService
      .getOneProduct(this.id)
      .subscribe((res) => {
        this.product = res.data;
        console.log(this.product);
        const rating = this.product.ratingAverage;
        this.fullStars = Math.floor(rating);
        this.halfStar = rating % 1 >= 0.5;
        this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
      });
  }
  addProductToWishlist() {
    this._WishlistService.addProductToWishlist(this.id).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product added to wishlist');
      },
      error: () => {
        this._SnackbarService.showSnackbar('Sign in first');
      },
    });
  }
  addProdutToCart() {
    this._CartService.addProductToCart(this.id).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product added to cart');
      },
      error: () => {
        this._SnackbarService.showSnackbar('Sign in first');
      },
    });
  }
  addReview(productId: string, formData: FormGroup) {
    console.log(formData);
    this._ReviewsService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Review added!');
        this.loadProduct();
      },
      error: (err) => {
        if (err.error.errors) {
          err.error.errors.map((error: any) => {
            if (error.path === 'product') {
              this.reviewError = error.msg;
            }
          });
        } else {
          this._SnackbarService.showSnackbar('Sign in first');
        }
      },
    });
  }
}
