import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarComponent: any;

  setComponent(snackbarComponent: any) {
    this.snackbarComponent = snackbarComponent;
  }

  showSnackbar(message: string) {
    if (this.snackbarComponent) {
      this.snackbarComponent.show(message);
    }
  }
}
