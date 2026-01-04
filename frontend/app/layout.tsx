import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management',
  description: 'NestJS + Next.js Lab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">User System</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/create" className="hover:text-gray-300">Create User</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}