import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLogin: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    authenticationService.currentUser.subscribe(() => {
      if (authenticationService.currentUser.getValue() !== null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/signin']);
  }
  selectedNav: string = 'home';
  selectNav(nav: string): void {
    this.selectedNav = nav;
  }
}
