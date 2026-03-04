import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  templateUrl: './stock-status.component.html',
  styleUrl: './stock-status.component.scss'
})
export class StockStatusComponent {
  inStock = input(false);
}
