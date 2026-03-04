import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatRadioGroup } from "@angular/material/radio";
import { MatRadioButton } from '@angular/material/radio';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanelDirective, MatIcon, MatRadioGroup, MatRadioButton],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent {

}
