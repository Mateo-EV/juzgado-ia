/**
 * Configuración de la API externa
 * Centraliza todas las URLs y configuraciones de conexión
 */

// URL base de la API Python (servidor Flask)
// Cambiar según tu configuración
export const API_CONFIG = {
  // URL del servidor Python Flask
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Endpoints específicos
  ENDPOINTS: {
    JUZGADOS: '/api/juzgados',
    JUZGADO_BY_ID: (id: string) => `/api/juzgados/${id}`,
    SINCRONIZAR: '/api/juzgados/sincronizar',
    HEALTH: '/health'
  },
  
  // Configuración de peticiones
  TIMEOUT: 30000, // 30 segundos
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Obtiene los headers configurados para las peticiones
 * Aquí puedes agregar tokens de autenticación si los necesitas
 */
export const getAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = { ...API_CONFIG.DEFAULT_HEADERS };
  
  // Si tienes un token de autenticación, agrégalo aquí
  const token = import.meta.env.VITE_API_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Construye la URL completa para un endpoint
 */
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
