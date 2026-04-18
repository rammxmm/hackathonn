import { Pool } from 'pg';
import { ENV } from '../config/env';

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('✅ Conexión a PostgreSQL establecida.');
});

pool.on('error', (err: Error) => {
  console.error('❌ Error inesperado en el pool de PostgreSQL:', err);
  process.exit(1);
});

export default pool;