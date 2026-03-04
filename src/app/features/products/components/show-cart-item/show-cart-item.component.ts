import { Component, input, inject, computed } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelectorComponent } from '../qty-selector/qty-selector.component';
import { ProductsStore } from '../../store/productsStore';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelectorComponent, MatIconModule],
  templateUrl: './show-cart-item.component.html',
  styleUrl: './show-cart-item.component.scss'
})
export class ShowCartItemComponent {

  item = input.required<CartItem>()
  store = inject(ProductsStore)

  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2))

}
