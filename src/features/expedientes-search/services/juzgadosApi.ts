/**
 * Servicio para consumir la API de Juzgados
 * Maneja todas las peticiones HTTP relacionadas con juzgados
 */
import { API_CONFIG, buildUrl, getAuthHeaders } from './apiConfig';
import type { ComboboxOption } from '../types';

/**
 * Respuesta estándar de la API
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

/**
 * Datos completos de un juzgado desde la API
 */
export interface JuzgadoAPI {
  id?: string;
  nombre: string;
  tipo?: string;
  direccion?: string;
  telefono?: string;
  [key: string]: any; // Otros campos que pueda tener tu API
}

/**
 * Clase para manejar las peticiones a la API de Juzgados
 */
class JuzgadosApiService {
  /**
   * Obtiene todos los juzgados desde la API
   */
  async obtenerJuzgados(tipo?: string): Promise<ComboboxOption[]> {
    try {
      const url = tipo 
        ? `${buildUrl(API_CONFIG.ENDPOINTS.JUZGADOS)}?tipo=${encodeURIComponent(tipo)}`
        : buildUrl(API_CONFIG.ENDPOINTS.JUZGADOS);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const result: ApiResponse<ComboboxOption[]> = await response.json();

      if (result.success && result.data) {
        return result.data;
      } else {
        console.warn('⚠️ API respondió sin éxito:', result.message || result.error);
        return [];
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('❌ Timeout: La petición tardó demasiado');
        } else {
          console.error('❌ Error al obtener juzgados desde la API:', error.message);
        }
      }
      // Retornar array vacío en caso de error
      return [];
    }
  }

  /**
   * Obtiene un juzgado específico por ID
   */
  async obtenerJuzgadoPorId(id: string): Promise<JuzgadoAPI | null> {
    try {
      const url = buildUrl(API_CONFIG.ENDPOINTS.JUZGADO_BY_ID(id));

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: ApiResponse<JuzgadoAPI> = await response.json();

      if (result.success && result.data) {
        return result.data;
      }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error al obtener juzgado ${id}:`, error.message);
      }
      return null;
    }
  }

  /**
   * Sincroniza los datos desde la API al archivo local
   * (Útil para desarrollo o cuando la API no está disponible)
   */
  async sincronizarDatos(): Promise<boolean> {
    try {
      const url = buildUrl(API_CONFIG.ENDPOINTS.SINCRONIZAR);

      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: ApiResponse<any> = await response.json();

      if (result.success) {
        console.log('✅ Datos sincronizados correctamente');
        return true;
      } else {
        console.warn('⚠️ No se pudieron sincronizar los datos');
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ Error al sincronizar datos:', error.message);
      }
      return false;
    }
  }

  /**
   * Verifica el estado de salud de la API
   */
  async verificarConexion(): Promise<boolean> {
    try {
      const url = buildUrl(API_CONFIG.ENDPOINTS.HEALTH);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return response.ok;
    } catch (error) {
      console.warn('⚠️ API no disponible. Usando datos locales.');
      return false;
    }
  }
}

// Exportar instancia única (Singleton)
export const juzgadosApi = new JuzgadosApiService();
