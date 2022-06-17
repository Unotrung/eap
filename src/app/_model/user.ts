export interface User {
    _id?: string;
    username?: string;
    email?: string;
    phone?: string;
    admin?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    password?: string;
    citizenId?: string;
    refreshToken?: string
}

export enum InputType {
    number,
    name
}
