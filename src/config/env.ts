import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Variable de entorno requerida no encontrada: ${key}`);
  }
  return value;
}

export const ENV = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  GEMINI_API_KEY: requireEnv('GEMINI_API_KEY'),
  DATABASE_URL: requireEnv('DATABASE_URL'),
};