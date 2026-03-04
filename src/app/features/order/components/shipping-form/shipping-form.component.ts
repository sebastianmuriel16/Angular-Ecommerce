import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ViewPanelDirective } from '../../../../directives/view-panel.directive';

@Component({
  selector: 'app-shipping-form',
  imports: [MatIcon, ViewPanelDirective, MatFormField, MatInputModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss'
})
export class ShippingFormComponent {

}
