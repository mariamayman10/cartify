import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ReviewsService } from '../services/reviews.service';
import { GlobalService } from '../services/global.service';
import { Pagination } from '../interfaces/pagination';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit, OnDestroy {
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ReviewsService: ReviewsService,
    private _GlobalService: GlobalService
  ) {}
  subscription: any;
  pagination: Pagination = {};
  search: string = '';
  page: number = 1;
  imgDomain: string = '';
  reviews: any[] = [];
  reviewsLength: number = 0;
  selectedReview: any = {};

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._GlobalService.productImg;
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  loadReviews = () => {
    this.subscription = this._ReviewsService
      .getUserReviews(undefined, this.page, '-createdAt', this.search)
      .subscribe({
        next: (res) => {
          this.reviews = res.data;
          this.pagination = res.Pagination;
          this.reviewsLength = res.length;
        },
      });
  };
  updateReview = (reviewId: string, formData: FormGroup) => {
    this._ReviewsService.updateUserReview(reviewId, formData.value).subscribe({
      next: (res) => {
        this.loadReviews();
      },
    });
  };
  deleteReview = (reviewId: string) => {
    this._ReviewsService.deleteUserReview(reviewId).subscribe({
      next: (res) => {
        this.loadReviews();
      },
    });
  };
  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }
}
