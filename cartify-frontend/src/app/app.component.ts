import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit{
  title = 'cartify';
  @ViewChild(SnackbarComponent) snackbarComponent!: SnackbarComponent;

  constructor(private _SnackbarService: SnackbarService) {}

  ngAfterViewInit() {
    this._SnackbarService.setComponent(this.snackbarComponent);
  }
}
