import { Component } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { AuthenticationService } from '../../services/authentication.service';
import { OrderService } from '../../services/order.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  subscription: any;
  orders: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  imgDomain: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _OrderService: OrderService,
    private _ProductService: ProductsService,
    private _SnackbarService: SnackbarService
  ) {}

  loadOrders() {
    this.subscription = this._OrderService
      .getOrders(15, this.page, '-createdAt', this.search)
      .subscribe({
        next: (res) => {
          this.orders = res.data;
          this.pagination = res.pagination;
        },
      });
  }
  updateDelivered(orderId: string) {
    this._OrderService.updateDeliveredOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        this._SnackbarService.showSnackbar('Order set to be delivered');
      },
    });
  }

  updatePaid(orderId: string) {
    this._OrderService.updatePaidOrder(orderId).subscribe({
      next: (res) => {
        this.loadOrders();
        this._SnackbarService.showSnackbar('Order set to be paid');
      },
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }

  searchData(searchData: string) {
    this.search = searchData;
    this.loadOrders();
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._ProductService.productImg;
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
