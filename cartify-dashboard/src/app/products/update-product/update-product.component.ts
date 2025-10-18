import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  productSubscription: any;
  categorySubscription: any;
  subcategorySubscription: any;
  id: string = '';
  product: any = {};
  categories: any[] = [];
  subcategories: any[] = [];
  productName: string = '';
  productDescription: string = '';
  productPrice: string = "0";
  productQuantity: string = "0";
  productCategory: string = '';
  productSubcategory: string = '';
  productCover: any;
  productImages: any[] = [];

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CategoryService: CategoryService,
    private _SubcategoryService: SubcategoryService,
    private _SnackbarService: SnackbarService,
    private _Router: Router
  ) {}

  loadProduct = () => {
    this.productSubscription =  this._ProductsService.getProduct(this.id).subscribe({
      next: (res) => {
        this.product = res.data;
        this.productName = this.product.name;
        this.productDescription = this.product.description;
        this.productPrice = this.product.price;
        this.productQuantity = this.product.quantity;
        this.productCategory = this.product.category._id;
        this.productSubcategory = this.product.subcategory._id;
        this.productCover = this.product.cover;
        this.productImages = this.product.images;
        this.loadCategories();
        this.loadSubcategories(this.product.category._id);
      },
    });
  };

  updateProduct = () => {
    console.log('Product Quantity:', this.productQuantity, typeof(this.productQuantity));
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
    this._ProductsService.updateProduct(this.id, formData).subscribe({
      next: (res) => {
        this._SnackbarService.showSnackbar('Product updated successfully');
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
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.loadProduct();
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe()
    this.categorySubscription.unsubscribe();
    if (this.subcategorySubscription) {
      this.subcategorySubscription.unsubscribe();
    }
  }
}
