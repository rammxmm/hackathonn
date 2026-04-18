import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env';

// Tipos para la respuesta estructurada
export interface DiagnosticoIA {
  falla_detectada: string;
  nivel_urgencia: 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  costo_estimado_min: number;
  costo_estimado_max: number;
  recomendacion: string;
}

export interface DatosVehiculo {
  marca: string;
  modelo: string;
  anio: number;
  version?: string;
  sintomas: string;
}

// ✅ Regla #2 aplicada: modelo "gemini-pro" para evitar errores 404
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export const obtenerDiagnosticoIA = async (
  datos: DatosVehiculo
): Promise<DiagnosticoIA> => {

  const prompt = `
Eres un mecánico automotriz experto con 20 años de experiencia.
Analiza los siguientes síntomas del vehículo y proporciona un diagnóstico profesional.

VEHÍCULO:
- Marca:   ${datos.marca}
- Modelo:  ${datos.modelo}
- Año:     ${datos.anio}
- Versión: ${datos.version || 'No especificada'}

SÍNTOMAS REPORTADOS:
${datos.sintomas}

INSTRUCCIONES CRÍTICAS:
Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional,
sin bloques de código, sin explicaciones fuera del JSON.

El JSON debe tener EXACTAMENTE esta estructura:
{
  "falla_detectada": "descripción técnica clara de la falla probable",
  "nivel_urgencia": "BAJA | MEDIA | ALTA | CRITICA",
  "costo_estimado_min": número en pesos mexicanos (solo número, sin símbolo),
  "costo_estimado_max": número en pesos mexicanos (solo número, sin símbolo),
  "recomendacion": "pasos específicos que debe seguir el dueño del vehículo"
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const texto = response.text().trim();

  // Limpieza defensiva: elimina bloques ```json si Gemini los añade
  const jsonLimpio = texto
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    const diagnostico: DiagnosticoIA = JSON.parse(jsonLimpio);

    // Validación mínima de campos requeridos
    if (!diagnostico.falla_detectada || !diagnostico.nivel_urgencia) {
      throw new Error('Respuesta de IA incompleta o con formato incorrecto.');
    }

    return diagnostico;

  } catch {
    console.error('❌ Respuesta cruda de Gemini:', texto);
    throw new Error(
      'La IA no devolvió un JSON válido. Intenta de nuevo o revisa el prompt.'
    );
  }
};