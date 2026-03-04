import { Component, inject, computed } from '@angular/core';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";
import { ProductsStore } from "../../store/productsStore";


@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanelDirective],
  templateUrl: './summarize-order.component.html',
  styleUrl: './summarize-order.component.scss'
})
export class SummarizeOrderComponent {

  store = inject(ProductsStore);

  subtotal = computed(() => Math.round(this.store.cartItems().reduce((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc
  }, 0)))

  tax = computed(() => Math.round(this.subtotal() * 0.10))

  total = computed(() => this.subtotal() + this.tax())

}
