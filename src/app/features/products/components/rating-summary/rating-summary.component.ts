import { Component, input, computed } from '@angular/core';
import { Product } from '../../models/product';
import { StartRatingComponent } from '../start-rating/start-rating.component';

@Component({
  selector: 'app-rating-summary',
  imports: [StartRatingComponent],
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.scss'
})
export class RatingSummaryComponent {

  product = input.required<Product>();

  totalReviews = computed(() => this.product().reviews || []);

  recentReviews = computed(() => {
    const reviews = this.totalReviews();
    if (reviews.length === 0) return [];

    return [...reviews]
      .sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())
      .slice(0, 10);
  })

  ratingBasedOnLastTenReviews = computed(() => {
    const sumRating = this.recentReviews().reduce((acc, review) => acc + review.rating, 0)
    return sumRating / this.recentReviews().length
  })

  ratingBreakdown = computed(() => {
    const reviews = this.recentReviews();
    const total = reviews.length;

    if (total === 0) return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: 0,
      percentage: 0
    }));

    const counts = [5, 4, 3, 2, 1].map((starts) => {
      const count = this.product().reviews.filter((review) => review.rating === starts).length;
      return {
        stars: starts,
        count,
        percentage: (count / total) * 100
      }
    })

    return counts
  })

}
