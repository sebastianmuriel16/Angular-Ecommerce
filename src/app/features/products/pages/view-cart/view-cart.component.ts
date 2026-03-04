import { Component, inject } from '@angular/core';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { ListCartItemsComponent } from './list-cart-items/list-cart-items.component';
import { TeaseWishlistComponent } from "../../components/tease-wishlist/tease-wishlist.component";
import { SummarizeOrderComponent } from "../../components/summarize-order/summarize-order.component";
import { MatButton } from "@angular/material/button";
import { ProductsStore } from "../../store/productsStore";

@Component({
  selector: 'app-view-cart',
  imports: [BackButtonComponent, ListCartItemsComponent, TeaseWishlistComponent, SummarizeOrderComponent, MatButton],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss'
})
export class ViewCartComponent {

  store = inject(ProductsStore)

}
