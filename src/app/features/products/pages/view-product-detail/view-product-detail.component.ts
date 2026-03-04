import { Component, input, inject, computed } from '@angular/core';
import { ProductsStore } from '../../store/productsStore';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { ProductInfoComponent } from "../../components/product-info/product-info.component";
import { ViewReviewsComponent } from "../../components/view-reviews/view-reviews.component";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButtonComponent, ProductInfoComponent, ViewReviewsComponent],
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId = input.required<string>();
  store = inject(ProductsStore);

  constructor() {
    this.store.setProductId(this.productId);
  }

  backRoute = computed(() => ['products', this.store.selectedCategory()]);

}
