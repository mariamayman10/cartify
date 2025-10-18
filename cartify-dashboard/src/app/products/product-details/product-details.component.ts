import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}

  subscription: any;
  imgDomain: string = '';
  product: any = {};
  id: string = '';
  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStars: number = 5;

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductsService.productImg;
    this.loadProduct();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProduct() {
    this.subscription = this._ProductsService
      .getProduct(this.id)
      .subscribe((res) => {
        this.product = res.data;
        console.log(this.product);
        const rating = this.product.ratingAverage;
        this.fullStars = Math.floor(rating);
        this.halfStar = rating % 1 >= 0.5;
        this.emptyStars = 5 - this.fullStars - (this.halfStar ? 1 : 0);
      });
  }
}
