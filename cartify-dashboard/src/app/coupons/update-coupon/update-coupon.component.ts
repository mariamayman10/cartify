import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './update-coupon.component.html',
  styleUrl: './update-coupon.component.scss',
})
export class UpdateCouponComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  coupon: any = {};
  couponCodeError: string = '';
  couponDiscountError: string = '';
  couponDateError: string = '';
  couponForm = new FormGroup({
    code: new FormControl(null),
    discount: new FormControl(null, [Validators.min(1), Validators.max(100)]),
    expireDate: new FormControl(null),
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ActivatedRoute: ActivatedRoute,
    private _CouponService: CouponService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  loadCoupon = () => {
    this.subscription = this._CouponService.getCoupon(this.id).subscribe({
      next: (res) => {
        this.coupon = res.data;
      },
    });
  };
  updateCoupon = (formData: FormGroup) => {
    if (
      formData.value.code === null &&
      formData.value.discount === null &&
      formData.value.expireDate === null
    ) {
      this._Router.navigate(['/coupons']);
    } else {
      if (formData.value.code === null) {
        formData.value.code = this.coupon.code;
      }
      if (formData.value.discount === null) {
        formData.value.discount = this.coupon.discount;
      }
      if (formData.value.expireDate === null) {
        formData.value.expireDate = new DatePipe(
          this.coupon.expireDate
        ).transform;
      }
      this._CouponService.updateCoupon(this.id, formData.value).subscribe({
        next: (res) => {
          this._SnackbarService.showSnackbar('Coupon created successfully');
          this._Router.navigate(['/coupons']);
        },
        error: (err) => {
          err.error.errors.map((error: any) => {
            if (error.path === 'code') {
              this.couponCodeError = error.msg;
            }
            if (error.path === 'discount') {
              this.couponDiscountError = error.msg;
            }
            if (error.path === 'expireDate') {
              this.couponDateError = error.msg;
            }
          });
        },
      });
    }
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadCoupon();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
