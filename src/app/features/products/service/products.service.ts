import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { FakeStoreProduct, mapToProduct } from '../models/fakeStoreProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com';

  getProducts() {
    return this.http.get<FakeStoreProduct[]>(`${this.baseUrl}/products`).pipe(
      map(products => products.map(mapToProduct))
    );
  }

  getProductById(id: string) {
    return this.http.get<FakeStoreProduct>(`${this.baseUrl}/products/${id}`).pipe(
      map(mapToProduct)
    )
  }

  getCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

}
