export interface UserReview {
    id: string
    userName: string
    productId: string
    userImageUrl: string
    rating: number
    reviewTitle: string
    comment: string
    reviewDate: string
}

export interface AddReviewParams {
    reviewTitle: string;
    comment: string;
    rating: number;
}