import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';
import { CurrencyPipe } from '@angular/common';
import { GlobalService } from '../services/global.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApplyCoupon } from '../interfaces/cart';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  subscription: any;
  imgDomain: string = '';
  cartItems: any[] = [];
  cartLength: number = 0;
  cart: any;
  coupon: string = '';
  couponError: string = '';

  constructor(
    private _GlobalService: GlobalService,
    private _CartService: CartService,
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private _SnackbarService: SnackbarService
  ) {}

  applyCouponForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  loadCart() {
    this.subscription = this._CartService.getCart().subscribe((res) => {
      this.cart = res.data;
      this.cartItems = res.data.cartItems;
      this.cartLength = res.data.cartLength;
    });
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._GlobalService.productImg;
    this.loadCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  increaseQuantity = (product: any, currentQ: number) => {
    this._CartService
      .updateProductQuantity(product, ++currentQ)
      .subscribe((res) => {
        this.loadCart();
        this.coupon = '';
      });
  };
  decreaseQuantity = (product: any, currentQ: number) => {
    if (currentQ == 1) this.removeProductFromCart(product);
    else
      this._CartService
        .updateProductQuantity(product, --currentQ)
        .subscribe((res) => {
          this.loadCart();
          this.coupon = '';
        });
  };
  removeProductFromCart = (product: any) => {
    this._CartService.removeProductFromCart(product).subscribe((res) => {
      this.loadCart();
      this.coupon = '';
      this._SnackbarService.showSnackbar('Product removed from cart');
    });
  };
  applyCoupon = (formData: FormGroup) => {
    this._CartService.applyCoupon(formData.value).subscribe({
      next: (res) => {
        this.loadCart();
        this.coupon = formData.value.code;
        this._SnackbarService.showSnackbar('Coupon applied');
      },
      error: (err) => {
        this.couponError = err.error.message;
      },
    });
  };
  clearCart = () => {
    this._CartService.clearCart().subscribe((res) => {
      this.cart = null;
      this.cartItems = [];
    });
  };
  checkout() {
    this._Router.navigate(['/placeOrder']);
  }
}
