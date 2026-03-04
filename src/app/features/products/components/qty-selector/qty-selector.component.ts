import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIconModule],
  templateUrl: './qty-selector.component.html',
  styleUrl: './qty-selector.component.scss'
})
export class QtySelectorComponent {
  quantity = input(0);
  qtyUpdated = output<number>();

  updateQty(qty: number) {
    this.qtyUpdated.emit(this.quantity() + qty);
  }
}
