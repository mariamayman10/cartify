import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy{
  subscription: any;
  users: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  imgDomain: string = '';
  role: string = 'admin';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _UserService: UserService
  ) {}

  loadUsers() {
    this.subscription = this._UserService
      .getUsers(15, this.page, '-createdAt', this.search, this.role)
      .subscribe({
        next: (res) => {
          this.users = res.data;
          this.pagination = res.pagination;
        },
      });
  }
  
  filterUsers = (role: string) => {
    this.role = role;
    this.loadUsers();
  }

  changePage(page: number) {
    this.page = page;
    this.loadUsers();
  }

  searchData(searchData: string) {
    this.search = searchData;
    this.loadUsers();
  }

  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._UserService.userImg;
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
