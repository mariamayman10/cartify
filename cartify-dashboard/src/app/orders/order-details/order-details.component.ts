import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  providers:[DatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription: any;
  order: any = {};
  imgDomain: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductsService,
    private _OrderService: OrderService,
    private _DatePipe:DatePipe
  ) {}

  loadOrder = () => {
    this.subscription = this._OrderService.getOrder(this.id).subscribe({
      next: (res) => {
        this.order = res.data;
      },
    });
  };
  extractTime(date: Date): string {
    return this._DatePipe.transform(date, 'hh:mm a') ?? ''; 
    
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductService.productImg;
    this.loadOrder();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
