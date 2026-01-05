import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all users
export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

// POST create user
export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, age } = await request.json();

        // Validate
        if (!firstName || !lastName || !email || !age) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if email exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        // Insert user
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, age, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [firstName, lastName, email, age]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}