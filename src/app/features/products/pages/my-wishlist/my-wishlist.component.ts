import { Component, inject } from '@angular/core';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { ProductsStore } from "../../store/productsStore";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { DeleteWishlistButtonComponent } from "../../components/delete-wishlist-button/delete-wishlist-button.component";
import { EmptyWishlistComponent } from "./empty-wishlist/empty-wishlist.component";


@Component({
  selector: 'app-my-wishlist',
  imports: [BackButtonComponent, ProductCardComponent, DeleteWishlistButtonComponent, EmptyWishlistComponent],
  templateUrl: './my-wishlist.component.html',
  styleUrl: './my-wishlist.component.scss'
})
export class MyWishlistComponent {

  store = inject(ProductsStore)

}
