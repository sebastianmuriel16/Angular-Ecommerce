import { Product } from "./product";
export interface FakeStoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const mapToProduct = (item: FakeStoreProduct): Product => ({
    id: String(item.id),
    name: item.title,
    description: item.description,
    price: item.price,
    imageUrl: item.image,
    rating: item.rating.rate,
    reviewCount: item.rating.count,
    inStock: true,
    category: item.category,
    reviews: []
})