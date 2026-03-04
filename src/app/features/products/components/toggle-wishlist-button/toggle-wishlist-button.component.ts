import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsStore } from '../../store/productsStore';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconModule],
  templateUrl: './toggle-wishlist-button.component.html',
  styleUrl: './toggle-wishlist-button.component.scss'
})
export class ToggleWishlistButtonComponent {

  product = input.required<Product>();

  store = inject(ProductsStore);


  toggleWishlist(product: Product) {
    if (this.store.isInWishlist()(product.id)) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }

}
