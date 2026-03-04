import { CartItem } from "../../products/models/cart";

export interface Order {
    id: string,
    userId: string;
    total: number;
    items: CartItem[];
    paymentStatus: 'succes' | 'failure';
}