import { Router } from 'express';
import {
  crearDiagnostico,
  listarDiagnosticos,
} from '../controllers/diagnostico.controller';

const router = Router();

// ✅ Regla #4 aplicada: endpoint POST obligatorio
router.post('/nuevo', crearDiagnostico);

// Bonus: endpoint GET para consultar historial
router.get('/historial', listarDiagnosticos);

export default router;