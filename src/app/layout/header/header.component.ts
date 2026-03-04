import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActionsComponent } from '../header-actions/header-actions.component';
import { RouterLink } from "@angular/router";
import { ProductsStore } from "../../features/products/store/productsStore";
import { MatIcon } from '@angular/material/icon';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, HeaderActionsComponent, RouterLink, MatIcon, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  store = inject(ProductsStore)

  toggleSidenav() {
    this.store.toogleSidenav()
  }

}
