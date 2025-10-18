import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home-first',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-first.component.html',
  styleUrl: './home-first.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeFirstComponent {
  data: any = [
    {
      id: 1,
      title: 'Find What You Love',
      description:
        'Explore a wide variety of products tailored just for you. Choose from the best and shop confidently!',
      image: 'images/choose-product.png',
    },
    {
      id: 2,
      title: 'Save it for Later!',
      description:
        "Love it but not ready to buy? Add it to your wishlist and shop when you're ready.",
      image: 'images/wishlist.png',
    },
    {
      id: 3,
      title: 'Add to Cart with Ease!',
      description:
        'Shop your favorite items in just a few clicks. A seamless shopping experience awaits!',
      image: 'images/add-to-cart.png',
    },
    {
      id: 4,
      title: 'Exciting Discounts Just for You!',
      description:
        'Save big with our exclusive offers and unbeatable prices. Don’t miss out!',
      image: 'images/discount.png',
    },
    {
      id: 5,
      title: 'Fast & Reliable Delivery',
      description:
        'Get your products delivered to your doorstep quickly and safely. Enjoy hassle-free shopping!',
      image: 'images/order-arrived.png',
    },
    {
      id: 6,
      title: 'Your Opinion Matters',
      description:
        'Share your thoughts and help others make the right choice. Review your purchased products now!',
      image: 'images/reviews.png',
    },
  ];


}
