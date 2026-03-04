import { Component, input, inject } from '@angular/core';
import { ProductsStore } from '../../store/productsStore';
import { Product } from '../../models/product';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-wishlist-button',
  imports: [MatIconModule],
  templateUrl: './delete-wishlist-button.component.html',
  styleUrl: './delete-wishlist-button.component.scss'
})
export class DeleteWishlistButtonComponent {

  product = input.required<Product>()
  store = inject(ProductsStore)

  removeFromWishlist(product: Product) {
    this.store.removeFromWishlist(product);
  }

}
