import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { AuthenticationService } from '../../services/authentication.service';
import { CouponService } from '../../services/coupon.service';
import { SnackbarService } from '../../services/snackbar.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent implements OnInit, OnDestroy {
  subscription: any;
  coupons: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CouponService: CouponService,
    private _SnackbarService: SnackbarService
  ) {}

  searchCoupons = (data: any) => {
    this.search = data;
    this.loadCoupons();
  };

  loadCoupons = () => {
    this.subscription = this._CouponService
      .getCoupons(undefined, this.page, undefined, this.search)
      .subscribe({
        next: (res) => {
          this.coupons = res.data;
          this.pagination = res.pagination;
        },
      });
  };

  deleteCoupon = (couponId: string) => {
    this._CouponService.deleteCoupon(couponId).subscribe({
      next: (res) => {
        this.loadCoupons();
        this._SnackbarService.showSnackbar('Coupon deleted successfully');
      },
    });
  };
  changePage = (page: number) => {
    this.page = page;
    this.loadCoupons();
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.loadCoupons();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
