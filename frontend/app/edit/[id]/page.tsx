'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UserService } from '@/services/user.service';

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        isActive: true,
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const user = await UserService.getOne(id);
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActive: user.isActive,
            });
        } catch (error) {
            alert('User not found');
            router.push('/');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await UserService.update(id, formData);
            router.push('/');
        } catch (error) {
            alert('Failed to update user');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Edit User #{id}</h2>
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

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Update User
                </button>
            </form>
        </div>
    );
}