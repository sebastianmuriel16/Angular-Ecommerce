import { computed, inject, signal } from "@angular/core";
import { Product } from "../models/product";
import { ProductsService } from "../service/products.service";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ToastService } from "../../../service/toast.service";
import { CartItem } from "../models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialogComponent } from "../../user/components/sign-in-dialog/sign-in-dialog.component";
import { SignInParams, User, SingUpParams } from "../../user/models/user";
import { Router } from "@angular/router";
import { Order } from "../../order/models/order";
import { AddReviewParams } from "../models/user-review";
import { UserReview } from "../models/user-review";
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { map } from 'rxjs/operators';


interface ProductsState {
    products: Product[];
    categories: string[];
    wishlistItems: Product[];
    cartItems: CartItem[];
    selectedCategory: string;
    loading: boolean;
    error: string | null;
    user: User | undefined;
    selectedProductId: string | undefined;
    writeReview: boolean;
    showSidenav: boolean;
    searchQuery: string;
}

const initialState: ProductsState = {
    products: [],
    categories: [],
    wishlistItems: [],
    cartItems: [],
    selectedCategory: 'all',
    loading: false,
    error: null,
    user: undefined,
    selectedProductId: undefined,
    writeReview: false,
    showSidenav: true,
    searchQuery: ''

}

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withStorageSync({ key: 'modern-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }) }),
    withComputed(({ products, selectedCategory, wishlistItems, cartItems, selectedProductId, searchQuery }) => {
        const productsByCategory = computed(() => {
            const category = selectedCategory();
            if (category === 'all') return products();
            return products().filter(product => product.category === category.toLowerCase());
        });
        const filteredProducts = computed(() => {
            const query = searchQuery().toLowerCase();
            const byCategory = productsByCategory();
            if (!query) return byCategory;
            return byCategory.filter(product => product.name.toLowerCase().includes(query));

        });
        const isInWishlist = computed(() => (productId: string) => wishlistItems().find(product => product.id === productId));
        const wishlistCount = computed(() => wishlistItems().length);
        const cartCount = computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0));
        const selectedProduct = computed(() => products().find(product => product.id === selectedProductId()));

        return {
            filteredProducts,
            productsByCategory,
            isInWishlist,
            wishlistCount,
            cartCount,
            selectedProduct
        }
    }),
    withMethods((store, toaster = inject(ToastService), productsService = inject(ProductsService), dialog = inject(MatDialog), router = inject(Router)) => ({
        loadProducts: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true, error: null })),
                switchMap(() => productsService.getProducts().pipe(

                    map((apiProducts) =>
                        apiProducts.map((apiProduct, index) => {
                            const totalProducts = apiProducts.length;
                            const outOfStock = 2;
                            const isOutOfStock = index >= (totalProducts - outOfStock);


                            const fakeReviews: UserReview[] = [
                                {
                                    id: crypto.randomUUID(),
                                    userName: 'Alice Johnson',
                                    productId: String(apiProduct.id),
                                    userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
                                    rating: 5,
                                    reviewTitle: "Simply Amazing!", // <--- Nuevo campo
                                    comment: 'Absolutely stunning! Exceeded all my expectations.',
                                    reviewDate: new Date().toISOString()
                                },
                                {
                                    id: crypto.randomUUID(),
                                    userName: 'Bob Smith',
                                    productId: String(apiProduct.id),
                                    userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
                                    rating: 4,
                                    reviewTitle: "Great Value", // <--- Nuevo campo
                                    comment: 'Really good quality for the price. Shipping was fast.',
                                    reviewDate: new Date().toISOString()
                                },
                                {
                                    id: crypto.randomUUID(),
                                    userName: 'Charlie Davis',
                                    productId: String(apiProduct.id),
                                    userImageUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
                                    rating: 5,
                                    reviewTitle: "My New Favorite", // <--- Nuevo campo
                                    comment: 'I love this product! Will definitely buy again.',
                                    reviewDate: new Date().toISOString()
                                },
                                {
                                    id: crypto.randomUUID(),
                                    userName: 'Diana Evans',
                                    productId: String(apiProduct.id),
                                    userImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
                                    rating: 3,
                                    reviewTitle: "Just Okay", // <--- Nuevo campo
                                    comment: 'It is okay, but the material feels a bit cheap.',
                                    reviewDate: new Date().toISOString()
                                },
                                {
                                    id: crypto.randomUUID(),
                                    userName: 'Frank Wilson',
                                    productId: String(apiProduct.id),
                                    userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
                                    rating: 5,
                                    reviewTitle: "Perfect Fit", // <--- Nuevo campo
                                    comment: 'Perfect fit and looks exactly like the pictures.',
                                    reviewDate: new Date().toISOString()
                                }
                            ];


                            return {
                                ...apiProduct,
                                inStock: !isOutOfStock,
                                reviews: fakeReviews
                            };

                        })),

                    tapResponse({
                        next: (products) => patchState(store, { products, loading: false }),
                        error: (error: Error) => patchState(store, { error: error.message, loading: false })
                    })
                ))
            )
        ),
        loadCategories: rxMethod<void>(
            pipe(
                switchMap(() => productsService.getCategories()
                    .pipe(
                        tapResponse({
                            next: (categories) => patchState(store, { categories: ['all', ...categories] }),
                            error: (error: Error) => patchState(store, { error: error.message })
                        })
                    )
                )
            )
        ),
        toogleSidenav: () => {
            patchState(store, { showSidenav: !store.showSidenav() })
        },
        setProductId: signalMethod<string>((productId: string) => {
            patchState(store, { selectedProductId: productId });
        }),
        addToWishlist(product: Product) {
            patchState(store, {
                wishlistItems: [...store.wishlistItems(), product]
            })
            toaster.success(`${product.name} added to wishlist`);
        },
        removeFromWishlist(product: Product) {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter(item => item.id !== product.id)
            })
            toaster.success(`${product.name} removed from wishlist`);
        },
        clearWishlist() {
            patchState(store, {
                wishlistItems: []
            })
            toaster.error(`Wishlist cleared`);
        },
        setCategory(category: string) {
            patchState(store, { selectedCategory: category });
        },
        setSearchQuery(query: string) {
            patchState(store, { searchQuery: query });
        },

        addToCart(product: Product, quantity: number = 1) {
            const existingItem = store.cartItems().find(item => item.product.id === product.id);

            if (existingItem) {
                patchState(store, {
                    cartItems: store.cartItems().map(item => {
                        return item.product.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    })
                })
            } else {
                patchState(store, {
                    cartItems: [...store.cartItems(), { product, quantity: quantity }]
                })
            }

            if (existingItem) {

                toaster.success(`Added ${quantity} more ${product.name} to cart`);
            } else {

                toaster.success(`${product.name} added to cart`);
            }
        },
        setItemQuantity(params: { productId: string, quantity: number }) {
            const { productId, quantity } = params;
            patchState(store, {
                cartItems: store.cartItems().map(item => {
                    return item.product.id === productId
                        ? { ...item, quantity }
                        : item
                })
            })
        },
        addAllWishlistToCart() {
            const wishlistItems = store.wishlistItems();
            const cartItems = store.cartItems();

            const newCartItems = wishlistItems.reduce((acc, product) => {
                const existingItem = cartItems.find(item => item.product.id === product.id);

                if (existingItem) {
                    return acc.map(item => {
                        return item.product.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    })
                }

                return [...acc, { product, quantity: 1 }]
            }, cartItems)

            patchState(store, {
                cartItems: newCartItems,
                wishlistItems: []
            })
        },
        removeFromCart(product: Product) {
            patchState(store, {
                cartItems: store.cartItems().filter(item => item.product.id !== product.id)
            })
        },
        moveToWishlist(product: Product) {
            const updatedCartItems = store.cartItems().filter(item => item.product.id !== product.id);

            const updatedWishlistItems = store.wishlistItems().find(item => item.id === product.id)
                ? store.wishlistItems()
                : [...store.wishlistItems(), product]

            patchState(store, {
                cartItems: updatedCartItems,
                wishlistItems: updatedWishlistItems
            })
        },
        proceedToCheckout: () => {
            if (!store.user()) {
                dialog.open(SignInDialogComponent, {
                    disableClose: true,
                    data: {
                        checkout: true
                    }
                })
                return;
            }

            router.navigate(['/checkout']);

        },
        signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    name: 'John Doe',
                    email,
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
                }
            })
            dialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        signOut() {
            patchState(store, {
                user: undefined
            })
            // router.navigate(['/products/all']);
        },
        signUp: ({ email, password, checkout, dialogId }: SingUpParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    email,
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
                }
            })
            dialog.getDialogById(dialogId)?.close();
            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        placeOrder: async () => {
            patchState(store, { loading: true })

            const user = store.user();

            if (!user) {
                toaster.error('Please login before placing order')
                patchState(store, { loading: false })
                return;
            }

            const order: Order = {
                id: crypto.randomUUID(),
                userId: user.id,
                total: Math.round(store
                    .cartItems()
                    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
                items: store.cartItems(),
                paymentStatus: 'succes'
            }
            await new Promise((resolve) => setTimeout(resolve, 1000))

            patchState(store, { loading: false, cartItems: [] })
            router.navigate(['order-succes'])
        },
        showWriteReview: () => patchState(store, { writeReview: true }),
        hideWriteReview: () => patchState(store, { writeReview: false }),

        addReview: async ({ reviewTitle, comment, rating }: AddReviewParams) => {
            patchState(store, { loading: false })
            const product = store.products().find((p) => p.id === store.selectedProductId())
            if (!product) {
                toaster.error('Product not found')
                patchState(store, { loading: false })
                return;
            }

            const review: UserReview = {
                id: crypto.randomUUID(),
                reviewTitle,
                comment,
                rating,
                productId: product.id,
                userName: store.user()?.name || '',
                userImageUrl: store.user()?.imageUrl || '',
                reviewDate: new Date().toISOString(),
            }

            const updatedProducts = store.products().map((p) => {
                if (p.id === product.id) {
                    return {
                        ...p,
                        reviews: [review, ...p.reviews]
                    }
                }
                return p
            })

            patchState(store, {
                loading: false,
                products: updatedProducts,
                writeReview: false
            })
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toaster.success('Review submitted successfully')

        },


    })),

    withHooks({
        onInit({ loadProducts, loadCategories }) {
            loadProducts();
            loadCategories();

        }
    })

)