import { Component, inject } from '@angular/core';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { PaymentFormComponent } from "../payment-form/payment-form.component";
import { ShippingFormComponent } from "../shipping-form/shipping-form.component";
import { SummarizeOrderComponent } from "../../../products/components/summarize-order/summarize-order.component";
import { ProductsStore } from '../../../products/store/productsStore';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  imports: [BackButtonComponent, PaymentFormComponent, ShippingFormComponent, SummarizeOrderComponent, MatButton],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  store = inject(ProductsStore)
}
