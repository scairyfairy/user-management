import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'your_password',  // CHANGE THIS
    database: 'registration_db',
});

export default pool;