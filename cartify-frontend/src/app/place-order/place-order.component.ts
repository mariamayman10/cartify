import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalService } from '../services/global.service';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _GlobalService: GlobalService,
    private _CartService: CartService,
    private _OrdersService: OrdersService,
    private _UserService: UserService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  subscription: any;
  imgDomain: string = '';
  cart: any = {};
  cartItems: any[] = [];
  cartLength: number = 0;
  userAddresses: any[] = [];

  addressForm = new FormGroup({
    address: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._GlobalService.productImg;
    this.loadOrder();
    this._UserService.getAddresses().subscribe({
      next: (res) => {
        this.userAddresses = res.data;
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadOrder() {
    this.subscription = this._CartService.getCart().subscribe((res) => {
      this.cart = res.data;
      this.cartItems = res.data.cartItems;
      this.cartLength = res.data.cartLength;
    });
  }

  createOrder() {
    const selectedAddress:any = this.addressForm.get('address')?.value;
    if (!selectedAddress) {
      console.error('No address selected');
      return;
    }
    this._OrdersService.createOrder(selectedAddress).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Ordered placed successfully');
        this._Router.navigate(['/myOrders']);
      },
      error: (err) => {
        console.log(err)
      },
    });
  }
}
