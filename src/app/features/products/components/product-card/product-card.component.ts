import { Component, input, output, inject, computed, effect } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { ProductsStore } from '../../store/productsStore';
import { shortDescription } from '../../../../shared/utils/shortDescription';
import { RouterLink } from "@angular/router";
import { StartRatingComponent } from "../start-rating/start-rating.component";


@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIconModule, RouterLink, StartRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  // productToCart = output<Product>();

  store = inject(ProductsStore);

  // addToCart(product: Product) {
  //   this.productToCart.emit(product);
  // }

  getShortDescription() {
    return shortDescription(this.product().description);
  }

}
