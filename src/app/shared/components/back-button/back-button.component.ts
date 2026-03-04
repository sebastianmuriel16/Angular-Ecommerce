import { Component, input, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ProductsStore } from '../../../features/products/store/productsStore';


@Component({
  selector: 'app-back-button',
  imports: [MatButton, MatIcon],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  clearSearch = input<boolean>(true);
  navigateTo = input<string[]>();
  store = inject(ProductsStore);
  router = inject(Router);

  goBack() {
    if (this.clearSearch()) {
      this.store.setSearchQuery('');
      this.store.setCategory('all');
      this.router.navigate(this.navigateTo() ?? [], {
        queryParams: { search: null },
        queryParamsHandling: 'merge'
      });
    } else {
      const currentQuery = this.store.searchQuery();
      this.router.navigate(this.navigateTo() ?? [], {
        queryParams: currentQuery ? { search: currentQuery } : {},
        queryParamsHandling: 'merge'
      });
    }
  }

  // goBack() {
  //   if (this.clearSearch()) {
  //     this.store.setSearchQuery('');
  //   }
  //   console.log('here is the query', this.store.searchQuery())
  //   this.router.navigate([this.navigateTo()], {
  //     queryParams: this.clearSearch() ? { search: null } : undefined,
  //     queryParamsHandling: this.clearSearch() ? 'merge' : 'preserve'
  //   });
  // }
}

