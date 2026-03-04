import { Component, input, inject } from '@angular/core';
import { Product } from '../../models/product';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";
import { RatingSummaryComponent } from "../rating-summary/rating-summary.component";
import { ViewReviewItemComponent } from "../view-review-item/view-review-item.component";
import { ProductsStore } from "../../store/productsStore";
import { MatButton } from "@angular/material/button";
import { WriteReviewComponent } from '../write-review/write-review.component';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanelDirective, RatingSummaryComponent, ViewReviewItemComponent, MatButton, WriteReviewComponent],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.scss'
})
export class ViewReviewsComponent {

  product = input.required<Product>();

  store = inject(ProductsStore);
}
