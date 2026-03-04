import { Component, inject, signal } from '@angular/core';
import { ViewPanelDirective } from "../../../../directives/view-panel.directive";
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { ProductsStore } from '../../store/productsStore';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OptionItem } from '../../models/option-item';
import { AddReviewParams } from "../../models/user-review";

@Component({
  selector: 'app-write-review',
  imports: [ViewPanelDirective, MatFormField, MatInput, MatLabel, MatSelect, MatOption, ReactiveFormsModule, MatButton],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  store = inject(ProductsStore)

  fb = inject(NonNullableFormBuilder)

  ratingOptions = signal<OptionItem[]>(
    [
      { label: '5 stars', value: 5 },
      { label: '4 stars', value: 4 },
      { label: '3 stars', value: 3 },
      { label: '2 stars', value: 2 },
      { label: '1 star', value: 1 }
    ]
  )

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    rating: [5, Validators.required],
    comment: ['', Validators.required]
  })

  saveReview() {
    console.log(this.reviewForm.value)
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return
    }
    const { title, rating, comment } = this.reviewForm.value
    this.store.addReview({ reviewTitle: title, comment, rating } as AddReviewParams)
    console.log("Products", this.store.products())

  }

}
