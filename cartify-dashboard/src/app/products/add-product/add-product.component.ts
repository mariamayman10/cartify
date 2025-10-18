import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  categorySubscription: any;
  subcategorySubscription: any;
  categories: any[] = [];
  subcategories: any[] = [];
  productName: string = '';
  productDescription: string = '';
  productPrice: string = '0';
  productQuantity: string = '0';
  productCategory: string = '';
  productSubcategory: string = '';
  productCover: any;
  productImages: any[] = [];

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ProductsService: ProductsService,
    private _CategoryService: CategoryService,
    private _SubcategoryService: SubcategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  createProduct = () => {
    const formData = new FormData();
    formData.append('name', this.productName);
    formData.append('description', this.productDescription);
    formData.append('category', this.productCategory);
    formData.append('subcategory', this.productSubcategory);
    formData.append('price', this.productPrice);
    formData.append('quantity', this.productQuantity);
    if (this.productCover) {
      formData.append('cover', this.productCover);
    }
    if (this.productImages && this.productImages.length > 0) {
      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }
    }
    this._ProductsService.createProduct(formData).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product created successfully');
        this._Router.navigate(['/products']);
      },
    });
  };

  setProductCover(event: any) {
    const cover = event.target.files[0];
    if (cover) {
      this.productCover = cover;
    }
  }
  setProductImages(event: any) {
    const images = event.target.files;
    if (images) {
      this.productImages = images;
    }
  }

  loadCategories = () => {
    this.categorySubscription = this._CategoryService
      .getCategories(200, 1, 'name', '')
      .subscribe({
        next: (res) => {
          this.categories = res.data;
        },
      });
  };

  loadSubcategories = (categoryId: string) => {
    this.productCategory = categoryId;
    this.subcategorySubscription = this._SubcategoryService
      .getSpecificSubcategories(categoryId)
      .subscribe({
        next: (res) => {
          this.subcategories = res.data;
        },
      });
  };

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.loadCategories();
  }
  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.subcategorySubscription) {
      this.subcategorySubscription.unsubscribe();
    }
  }
}
