'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/services/user.service';

export default function CreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        isActive: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await UserService.create(formData);
            router.push('/');
        } catch (error) {
            alert('Failed to create user');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Create New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">First Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border p-2 rounded"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1">Last Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border p-2 rounded"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full border p-2 rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <label>Is Active?</label>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Save User
                </button>
            </form>
        </div>
    );
}