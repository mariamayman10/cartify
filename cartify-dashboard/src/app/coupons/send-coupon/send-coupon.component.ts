import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CouponService } from '../../services/coupon.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-send-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './send-coupon.component.html',
  styleUrl: './send-coupon.component.scss',
})
export class SendCouponComponent implements OnInit, OnDestroy {
  couponSubscription: any;
  couponError: string = '';
  coupon: any = {};
  id: string = '';
  email: string = '';

  userForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CouponService: CouponService,
    private _ActivatedRoute: ActivatedRoute,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  loadCoupon = () => {
    this.couponSubscription = this._CouponService.getCoupon(this.id).subscribe({
      next: (res) => {
        this.coupon = res.data;
      },
    });
  };

  sendCoupon = (formData: FormGroup) => {
    this._CouponService.sendCoupon(formData.value, this.id).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Coupon sent successfully');
        this._Router.navigate(['/coupons']);
      },error: (err)=>{
        this.couponError = err.error.errors[0].msg;
      }
    });
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadCoupon();
  }
  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe();
  }
}
