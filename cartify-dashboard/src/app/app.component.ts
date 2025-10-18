import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { MenubarComponent } from './menubar/menubar.component';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cartify-dashboard';
  isLogin: boolean = false;
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _SnackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._AuthenticationService.currentUser.subscribe({
      next: () => {
        if (this._AuthenticationService.currentUser.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  @ViewChild(SnackbarComponent) snackbarComponent!: SnackbarComponent;

  ngAfterViewInit() {
    this._SnackbarService.setComponent(this.snackbarComponent);
  }
}
