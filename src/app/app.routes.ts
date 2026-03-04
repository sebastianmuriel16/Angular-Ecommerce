import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { MyWishlistComponent } from './features/products/pages/my-wishlist/my-wishlist.component';
import { ViewCartComponent } from './features/products/pages/view-cart/view-cart.component';
import { CheckoutComponent } from './features/order/components/checkout/checkout.component';
import { OrderSuccesComponent } from './features/order/components/order-succes/order-succes.component';
import { ViewProductDetailComponent } from './features/products/pages/view-product-detail/view-product-detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products/all',
        pathMatch: 'full'
    },
    {
        path: 'products/:category',
        component: ProductsComponent
    },
    {
        path: 'product/:productId',
        component: ViewProductDetailComponent
    },
    {
        path: 'my-wishlist',
        component: MyWishlistComponent
    },
    {
        path: 'cart',
        component: ViewCartComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'order-succes',
        component: OrderSuccesComponent
    },
    {
        path: '**',
        redirectTo: 'products/all'
    }
];
