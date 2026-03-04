import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { ProductsStore } from "../../../store/productsStore";

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './empty-wishlist.component.html',
  styleUrl: './empty-wishlist.component.scss'
})
export class EmptyWishlistComponent {

  store = inject(ProductsStore);

}
