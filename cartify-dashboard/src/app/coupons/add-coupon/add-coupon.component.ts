import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.scss',
})
export class AddCouponComponent implements OnInit {
  couponError: string = '';
  couponForm = new FormGroup({
    code: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
    expireDate: new FormControl(null, [Validators.required])
  });
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CouponService: CouponService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  createCoupon = (formData: FormGroup) => {
    this._CouponService.createCoupon(formData.value).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Coupon created successfully');
        this._Router.navigate(['/coupons']);
      },
      error: (err) => {
        this.couponError = err.error.errors[0].msg;
      },
    });
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
  }
}
