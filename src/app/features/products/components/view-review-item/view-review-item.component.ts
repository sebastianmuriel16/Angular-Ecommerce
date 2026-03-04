import { Component, input } from '@angular/core';
import { UserReview } from '../../models/user-review';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";
import { StartRatingComponent } from '../start-rating/start-rating.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanelDirective, StartRatingComponent, DatePipe],
  templateUrl: './view-review-item.component.html',
  styleUrl: './view-review-item.component.scss'
})
export class ViewReviewItemComponent {

  review = input.required<UserReview>()

}
