import { Request, Response } from 'express';
import pool from '../db/db';
import { obtenerDiagnosticoIA, DatosVehiculo } from '../services/ia.service';

interface CuerpoSolicitud {
  marca: string;
  modelo: string;
  anio: number;
  version?: string;
  sintomas: string;
}

export const crearDiagnostico = async (
  req: Request,
  res: Response
): Promise<void> => {

  // 1. Extraer y validar campos del body
  const { marca, modelo, anio, version, sintomas }: CuerpoSolicitud = req.body;

  if (!marca || !modelo || !anio || !sintomas) {
    res.status(400).json({
      ok: false,
      mensaje: 'Faltan campos requeridos: marca, modelo, anio, sintomas.',
    });
    return;
  }

  if (typeof anio !== 'number' || anio < 1886 || anio > new Date().getFullYear() + 1) {
    res.status(400).json({
      ok: false,
      mensaje: `El campo "anio" debe ser un número válido (ej. 2014).`,
    });
    return;
  }

  try {
    // 2. Consultar a Gemini
    console.log(`🔍 Consultando IA para: ${marca} ${modelo} ${anio}...`);

    const datosVehiculo: DatosVehiculo = { marca, modelo, anio, version, sintomas };
    const diagnosticoIA = await obtenerDiagnosticoIA(datosVehiculo);

    console.log('✅ Diagnóstico de IA recibido:', diagnosticoIA.nivel_urgencia);

    // 3. Guardar en PostgreSQL
    const querySQL = `
      INSERT INTO diagnosticos (
        vehiculo_marca,
        vehiculo_modelo,
        vehiculo_anio,
        vehiculo_version,
        sintomas,
        falla_detectada,
        nivel_urgencia,
        costo_estimado_min,
        costo_estimado_max,
        recomendacion,
        respuesta_raw_ia
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;

    const valores = [
      marca,
      modelo,
      anio,
      version || null,
      sintomas,
      diagnosticoIA.falla_detectada,
      diagnosticoIA.nivel_urgencia,
      diagnosticoIA.costo_estimado_min,
      diagnosticoIA.costo_estimado_max,
      diagnosticoIA.recomendacion,
      JSON.stringify(diagnosticoIA),
    ];

    const resultado = await pool.query(querySQL, valores);
    const registroGuardado = resultado.rows[0];

    // 4. Responder al cliente
    res.status(201).json({
      ok: true,
      mensaje: 'Diagnóstico generado y guardado exitosamente.',
      diagnostico: {
        id:                 registroGuardado.id,
        vehiculo:           `${marca} ${modelo} ${version || ''} ${anio}`.trim(),
        falla_detectada:    diagnosticoIA.falla_detectada,
        nivel_urgencia:     diagnosticoIA.nivel_urgencia,
        costo_estimado:     {
          min: diagnosticoIA.costo_estimado_min,
          max: diagnosticoIA.costo_estimado_max,
          moneda: 'MXN',
        },
        recomendacion:      diagnosticoIA.recomendacion,
        creado_en:          registroGuardado.creado_en,
      },
    });

  } catch (error: unknown) {
    const mensaje =
      error instanceof Error ? error.message : 'Error interno desconocido.';

    console.error('❌ Error en crearDiagnostico:', mensaje);

    res.status(500).json({
      ok: false,
      mensaje: 'Error al procesar el diagnóstico.',
      detalle: mensaje,
    });
  }
};

// Controlador extra: listar todos los diagnósticos guardados
export const listarDiagnosticos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM diagnosticos ORDER BY creado_en DESC LIMIT 50;'
    );
    res.status(200).json({
      ok: true,
      total: resultado.rowCount,
      diagnosticos: resultado.rows,
    });
  } catch (error: unknown) {
    const mensaje =
      error instanceof Error ? error.message : 'Error desconocido.';
    res.status(500).json({ ok: false, mensaje });
  }
};