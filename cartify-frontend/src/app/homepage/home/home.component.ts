import { Component } from '@angular/core';
import { BestSellingComponent } from "../best-selling/best-selling.component"
import { HomeFirstComponent } from "../home-first/home-first.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BestSellingComponent, HomeFirstComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
