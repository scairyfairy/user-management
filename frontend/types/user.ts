export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    isActive?: boolean;
}