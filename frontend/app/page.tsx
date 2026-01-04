'use client';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { UserService } from '@/services/user.service';
import Link from 'next/link';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await UserService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await UserService.delete(id);
      loadUsers();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users List</h1>
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add User
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Full Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.isActive ? (
                    <span className="text-green-600 font-semibold text-sm">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold text-sm">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link href={`/edit/${user.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}