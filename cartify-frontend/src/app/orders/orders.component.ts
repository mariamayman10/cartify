import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrdersService } from '../services/orders.service';
import { GlobalService } from '../services/global.service';
import { Pagination } from '../interfaces/pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _OrdersService: OrdersService,
    private _GlobalService: GlobalService,
    private _Router: Router
  ) {}

  subscription: any;
  orders: any[] = [];
  ordersLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = '';
  imgDomain: string = '';

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._GlobalService.productImg;
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadOrders() {
    this.subscription = this._OrdersService
      .getUserOrders(undefined, this.page, '-createdAt', this.search)
      .subscribe({
        next: (res) => {
          this.orders = res.data;
          this.ordersLength = res.length;
          this.pagination = res.pagination;
        },
        error: (err) => {},
      });
  }
  getOrder = (orderId: string) => {
    this._OrdersService.getOrder(orderId).subscribe({
      next: (res) => {
        this._Router.navigate([`/order/${orderId}`]);
      },
    });
  };

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }
}
