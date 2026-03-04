import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-order-succes',
  imports: [MatIcon, MatButtonModule, RouterLink],
  templateUrl: './order-succes.component.html',
  styleUrl: './order-succes.component.scss'
})
export class OrderSuccesComponent {

}
