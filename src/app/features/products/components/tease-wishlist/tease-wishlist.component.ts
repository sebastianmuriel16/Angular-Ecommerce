import { Component, inject } from '@angular/core';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";
import { MatIcon } from "@angular/material/icon";
import { ProductsStore } from "../../store/productsStore";
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanelDirective, MatIcon, MatButton, RouterLink],
  templateUrl: './tease-wishlist.component.html',
  styleUrl: './tease-wishlist.component.scss'
})
export class TeaseWishlistComponent {

  store = inject(ProductsStore);

}
