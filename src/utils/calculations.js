/**
 * Cálculos para el método del flotador
 * Fórmula: Q = A × V × Fc
 * Donde:
 * Q = Caudal (m³/s)
 * A = Área de la sección transversal (m²)
 * V = Velocidad media del flujo (m/s)
 * Fc = Factor de corrección (generalmente 0.8 a 0.9)
 */

/**
 * Calcula el área de la sección transversal del canal
 * Asumiendo un canal trapezoidal
 * A = h × (b + (b + 2×h×tan(θ))/2)
 * Para simplificar, usamos: A = h × (b + m×h)
 * Donde m es la pendiente lateral (base_menor se usa como aproximación)
 * 
 * @param {number} tirante - Altura del agua en metros (h)
 * @param {number} base_menor - Ancho superior del canal en metros
 * @param {number} espejo_agua - Ancho del espejo de agua en metros
 * @returns {number} Área en m²
 */
const calcularArea = (tirante, base_menor, espejo_agua) => {
  // Para un trapecio: A = h × (b1 + b2) / 2
  // b1 = base_menor, b2 = espejo_agua, h = tirante
  const area = tirante * (base_menor + espejo_agua) / 2;
  return area;
};

/**
 * Calcula la velocidad promedio a partir de los tiempos registrados
 * V = distancia / tiempo_promedio
 * 
 * @param {number} distancia - Distancia recorrida por el flotador en metros
 * @param {array} tiempos - Array de tiempos en segundos
 * @returns {number} Velocidad promedio en m/s
 */
const calcularVelocidadPromedio = (distancia, tiempos) => {
  if (!tiempos || tiempos.length === 0) return 0;
  
  const tiempoPromedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
  const velocidad = distancia / tiempoPromedio;
  
  return velocidad;
};

/**
 * Calcula el caudal usando la fórmula: Q = A × V × Fc
 * 
 * @param {number} area - Área de la sección transversal en m²
 * @param {number} velocidad - Velocidad media en m/s
 * @param {number} factorCorreccion - Factor de corrección (0.8-0.9)
 * @returns {number} Caudal en m³/s
 */
const calcularCaudal = (area, velocidad, factorCorreccion = 0.85) => {
  const caudal = area * velocidad * factorCorreccion;
  return caudal;
};

/**
 * Calcula estadísticas de las velocidades
 * 
 * @param {array} velocidades - Array de velocidades en m/s
 * @returns {object} Objeto con estadísticas
 */
const calcularEstadisticas = (velocidades) => {
  if (!velocidades || velocidades.length === 0) {
    return {
      promedio: 0,
      minima: 0,
      maxima: 0,
      desviacion: 0,
    };
  }

  const promedio = velocidades.reduce((a, b) => a + b, 0) / velocidades.length;
  const minima = Math.min(...velocidades);
  const maxima = Math.max(...velocidades);
  
  const varianza = velocidades.reduce((sum, v) => sum + Math.pow(v - promedio, 2), 0) / velocidades.length;
  const desviacion = Math.sqrt(varianza);

  return {
    promedio: parseFloat(promedio.toFixed(4)),
    minima: parseFloat(minima.toFixed(4)),
    maxima: parseFloat(maxima.toFixed(4)),
    desviacion: parseFloat(desviacion.toFixed(4)),
  };
};

/**
 * Calcula la velocidad a partir de distancia y tiempo
 * 
 * @param {number} distancia - Distancia en metros
 * @param {number} tiempo - Tiempo en segundos
 * @returns {number} Velocidad en m/s
 */
const calcularVelocidad = (distancia, tiempo) => {
  if (tiempo === 0) return 0;
  return distancia / tiempo;
};

/**
 * Convierte segundos a formato mm:ss
 * 
 * @param {number} segundos - Tiempo en segundos
 * @returns {string} Tiempo formateado
 */
const formatoTiempo = (segundos) => {
  const minutos = Math.floor(segundos / 60);
  const segs = Math.floor(segundos % 60);
  return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
};

export {
  calcularArea,
  calcularVelocidadPromedio,
  calcularCaudal,
  calcularEstadisticas,
  calcularVelocidad,
  formatoTiempo,
};
