'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState('');

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        // AGE VALIDATION - ONLY NUMERIC
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (!/^\d+$/.test(formData.age)) {
            newErrors.age = 'Age must contain only numeric values';
        } else if (Number(formData.age) < 1 || Number(formData.age) > 150) {
            newErrors.age = 'Age must be between 1 and 150';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // PREVENT PAGE RELOAD
        setServerError('');

        if (!validateForm()) return;

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // CLEAR ALL FIELDS after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                age: '',
            });
            setErrors({});

            alert('Registration successful!');
            router.push('/');
        } catch (error: any) {
            setServerError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Registration Form</h1>

                {serverError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">First Name *</label>
                        <input
                            type="text"
                            className={`w-full border p-3 rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Last Name *</label>
                        <input
                            type="text"
                            className={`w-full border p-3 rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email *</label>
                        <input
                            type="email"
                            className={`w-full border p-3 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Age (Numeric Only) *</label>
                        <input
                            type="text"
                            className={`w-full border p-3 rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="Enter numbers only"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                    >
                        Register
                    </button>

                    <Link href="/" className="block text-center text-blue-600 hover:underline mt-4">
                        View All Registered Users
                    </Link>
                </form>
            </div>
        </div>
    );
}