import { Component, signal, inject, input, effect } from '@angular/core';
import { MatPrefix } from "@angular/material/form-field";
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsStore } from '../../features/products/store/productsStore';


@Component({
  selector: 'app-search-bar',
  imports: [MatIcon, MatPrefix, MatInputModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  searchQuery = signal('');
  clearSearch = input<boolean>(true);
  store = inject(ProductsStore);
  router = inject(Router);

  constructor() {
    effect(() => {
      this.searchQuery.set(this.store.searchQuery());
    });
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const query = this.searchQuery().trim();
      this.store.setSearchQuery(query);
      this.router.navigate(['products'], {
        queryParams: { search: query }
      })
    }
  }

  cancelSearch() {
    this.searchQuery.set('');
    this.store.setSearchQuery('');
    this.router.navigate(['products'], {
      queryParams: { search: null }
    });
  }

}
