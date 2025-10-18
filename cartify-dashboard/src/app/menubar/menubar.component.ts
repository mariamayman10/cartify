import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
})
export class MenubarComponent implements OnInit {
  user: any = {};
  isManager: boolean = false;
  imgDomain: string = '';
  menuVisible: boolean = false;

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _ProfileService: ProfileService,
    private _Router: Router
  ) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  logout(){
        this._AuthenticationService.logout();
        this._Router.navigate(['/signin']);
  }
  ngOnInit(): void {
    this._AuthenticationService.checkToken();
    this.imgDomain = this._ProfileService.userImage;
    this._ProfileService.getSignedInUser().subscribe({
      next: (res) => {
        this.user = res.data;
        if (this.user.role === 'manager') this.isManager = true;
      },
    });
  }
}
