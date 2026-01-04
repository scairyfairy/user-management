import { User, CreateUserDto } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const UserService = {
    async getAll(): Promise<User[]> {
        const res = await fetch(`${API_URL}/users`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    async getOne(id: number): Promise<User> {
        const res = await fetch(`${API_URL}/users/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
    },

    async create(data: CreateUserDto): Promise<User> {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create user');
        return res.json();
    },

    async update(id: number, data: Partial<CreateUserDto>): Promise<User> {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update user');
        return res.json();
    },

    async delete(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete user');
    },
};