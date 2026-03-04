import { Component, computed, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-start-rating',
  imports: [MatIcon],
  templateUrl: './start-rating.component.html',
  styleUrl: './start-rating.component.scss'
})
export class StartRatingComponent {

  rating = input.required<number>();

  startArray = computed(() => {
    const fullStars = Math.floor(this.rating());
    return Array(5).fill(false).map((_, index) => index < fullStars);
  })

}
