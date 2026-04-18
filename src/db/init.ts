import pool from './db';
import { ENV } from '../config/env';

// Importamos dotenv aquí también porque este script
// se ejecuta de forma independiente
import dotenv from 'dotenv';
dotenv.config();

const crearTablas = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    console.log('🔧 Iniciando creación de tablas...');

    await client.query('BEGIN');

    // Tabla: usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id          SERIAL PRIMARY KEY,
        nombre      VARCHAR(100) NOT NULL,
        email       VARCHAR(150) UNIQUE NOT NULL,
        telefono    VARCHAR(20),
        creado_en   TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  ✔ Tabla "usuarios" lista.');

    // Tabla: vehiculos
    await client.query(`
      CREATE TABLE IF NOT EXISTS vehiculos (
        id          SERIAL PRIMARY KEY,
        usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
        marca       VARCHAR(50)  NOT NULL,
        modelo      VARCHAR(50)  NOT NULL,
        anio        INTEGER      NOT NULL,
        version     VARCHAR(50),
        placa       VARCHAR(20)  UNIQUE,
        creado_en   TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  ✔ Tabla "vehiculos" lista.');

    // Tabla: diagnosticos
    await client.query(`
      CREATE TABLE IF NOT EXISTS diagnosticos (
        id                  SERIAL PRIMARY KEY,
        vehiculo_marca      VARCHAR(50)  NOT NULL,
        vehiculo_modelo     VARCHAR(50)  NOT NULL,
        vehiculo_anio       INTEGER      NOT NULL,
        vehiculo_version    VARCHAR(50),
        sintomas            TEXT         NOT NULL,
        falla_detectada     TEXT,
        nivel_urgencia      VARCHAR(20),
        costo_estimado_min  NUMERIC(10,2),
        costo_estimado_max  NUMERIC(10,2),
        recomendacion       TEXT,
        respuesta_raw_ia    TEXT,
        creado_en           TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('  ✔ Tabla "diagnosticos" lista.');

    await client.query('COMMIT');
    console.log('\n🎉 Base de datos inicializada correctamente.');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al crear tablas. Se hizo rollback:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

crearTablas().catch(() => process.exit(1));