import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ProductsStore } from '../../store/productsStore';
import { ToggleWishlistButtonComponent } from "../../components/toggle-wishlist-button/toggle-wishlist-button.component";
import { map } from 'rxjs';



@Component({
  selector: 'app-products',
  imports: [
    ProductCardComponent,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButtonComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  store = inject(ProductsStore);
  route = inject(ActivatedRoute);


  constructor() {
    const urlSearchQuery = toSignal(
      this.route.queryParamMap.pipe(
        map(params => params.get('search') || ''),
      ));


    effect(() => {
      const query = urlSearchQuery();
      if (query !== undefined) {
        this.store.setSearchQuery(query);
      }
    })
  }
}



