export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
}

export interface SingUpParams {
    name: string;
    email: string;
    password: string;
    checkout?: boolean
    dialogId: string
}

export interface SignInParams {
    email: string;
    password: string;
    checkout?: boolean
    dialogId: string
}