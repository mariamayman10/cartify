import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { authenticationGuard } from './guards/authentication.guard';
import { SigninComponent } from './authentication/signin/signin.component';
import { rolesGuard } from './guards/rolesGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signin', title: 'login', component: SigninComponent },
  // home
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [authenticationGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  //users
  {
    path: 'users',
    canActivate: [authenticationGuard, rolesGuard],
    children: [
      {
        path: '',
        title: 'All Users',
        loadComponent: () =>
          import('./users/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'create',
        title: 'Create User',
        loadComponent: () =>
          import('./users/add-user/add-user.component').then(
            (m) => m.AddUserComponent
          ),
      },
      {
        path: ':id/details',
        title: 'User details',
        loadComponent: () =>
          import('./users/user-details/user-details.component').then(
            (m) => m.UserDetailsComponent
          ),
      },
    ],
  },
  // categories
  {
    path: 'categories',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        title: 'All Categories',
        loadComponent: () =>
          import('./categories/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'create',
        title: 'create Category',
        loadComponent: () =>
          import('./categories/add-category/add-category.component').then(
            (m) => m.AddCategoryComponent
          ),
      },
      {
        path: ':id/update',
        title: 'update Category',
        loadComponent: () =>
          import('./categories/update-category/update-category.component').then(
            (m) => m.UpdateCategoryComponent
          ),
      },
    ],
  },
  // subcategories
  {
    path: 'subcategories',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        title: 'All Subcategories',
        loadComponent: () =>
          import('./subcategories/subcategories/subcategories.component').then(
            (m) => m.SubcategoriesComponent
          ),
      },
      {
        path: 'create',
        title: 'create Subcategory',
        loadComponent: () =>
          import(
            './subcategories/add-subcategory/add-subcategory.component'
          ).then((m) => m.AddSubcategoryComponent),
      },
      {
        path: ':id/update',
        title: 'update Subcategory',
        loadComponent: () =>
          import(
            './subcategories/update-subcategory/update-subcategory.component'
          ).then((m) => m.UpdateSubcategoryComponent),
      },
    ],
  },
  // coupons
  {
    path: 'coupons',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        title: 'All Coupons',
        loadComponent: () =>
          import('./coupons/coupons/coupons.component').then(
            (m) => m.CouponsComponent
          ),
      },
      {
        path: 'create',
        title: 'create Coupon',
        loadComponent: () =>
          import('./coupons/add-coupon/add-coupon.component').then(
            (m) => m.AddCouponComponent
          ),
      },
      {
        path: ':id/send',
        title: 'send Coupon',
        loadComponent: () =>
          import('./coupons/send-coupon/send-coupon.component').then(
            (m) => m.SendCouponComponent
          ),
      },
      {
        path: ':id/update',
        title: 'update Coupon',
        loadComponent: () =>
          import('./coupons/update-coupon/update-coupon.component').then(
            (m) => m.UpdateCouponComponent
          ),
      },
    ],
  },
  // products
  {
    path: 'products',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        title: 'All Products',
        loadComponent: () =>
          import('./products/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'create',
        title: 'create Product',
        loadComponent: () =>
          import('./products/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: ':id/details',
        title: 'details Product',
        loadComponent: () =>
          import('./products/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
      {
        path: ':id/update',
        title: 'update Product',
        loadComponent: () =>
          import('./products/update-product/update-product.component').then(
            (m) => m.UpdateProductComponent
          ),
      },
    ],
  },
  // orders
  {
    path: 'orders',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        title: 'All Orders',
        loadComponent: () =>
          import('./orders/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: ':id/details',
        title: 'Order Details',
        loadComponent: () =>
          import('./orders/order-details/order-details.component').then(
            (m) => m.OrderDetailsComponent
          ),
      },
    ],
  },
  // forget password
  {
    path: 'forgetPassword',
    title: 'forget password',
    loadComponent: () =>
      import('./authentication/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
  // profile
  {
    path: 'profile',
    title: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },
];
