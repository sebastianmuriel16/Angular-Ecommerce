import { Component, input, signal, inject } from '@angular/core';
import { Product } from '../../models/product';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StockStatusComponent } from '../stock-status/stock-status.component';
import { QtySelectorComponent } from "../qty-selector/qty-selector.component";
import { ProductsStore } from "../../store/productsStore";
import { ToggleWishlistButtonComponent } from "../toggle-wishlist-button/toggle-wishlist-button.component";
import { StartRatingComponent } from '../start-rating/start-rating.component';

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatusComponent, QtySelectorComponent, MatIconModule, MatButtonModule, ToggleWishlistButtonComponent, StartRatingComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {
  product = input.required<Product>();
  store = inject(ProductsStore);

  quantity = signal(1);

  setQuantity(qty: number) {
    this.quantity.set(qty);
  }

  addToCart() {
    this.store.addToCart(this.product(), this.quantity());
  }

  addToWishlist() {
    this.store.addToWishlist(this.product());
  }

}
