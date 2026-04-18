import express, { Application, Request, Response } from 'express';
import { ENV } from './config/env';
import diagnosticoRoutes from './routes/diagnostico.routes';

const app: Application = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de salud — útil para verificar que el servidor responde
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    servicio: 'Taller Inteligente API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Rutas del dominio
app.use('/api/diagnosticos', diagnosticoRoutes);

// Arrancar servidor
app.listen(ENV.PORT, () => {
  console.log('');
  console.log('🚗 ===================================');
  console.log(`🚗  Taller Inteligente API corriendo`);
  console.log(`🚗  http://localhost:${ENV.PORT}`);
  console.log('🚗 ===================================');
  console.log('');
});

export default app;