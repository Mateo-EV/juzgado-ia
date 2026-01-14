import { useState, useMemo } from 'react';
import type { Expediente, SortConfig } from '@/features/expedientes-search/types';

/**
 * Hook personalizado para manejar el ordenamiento de expedientes
 * Permite ordenar por cualquier campo de forma ascendente o descendente
 */
export const useSorting = (expedientes: Expediente[]) => {
  // Estado del ordenamiento actual
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'Fecha_descargo',
    direction: 'desc',
  });

  /**
   * Alterna el estado de ordenamiento de una columna
   * Ciclo: ascendente -> descendente -> sin ordenamiento
   */
  const toggleSort = (key: keyof Expediente) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Si ya está ordenado por esta columna, cambiar dirección
        if (prev.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      // Si es una nueva columna, ordenar ascendente
      return { key, direction: 'asc' };
    });
  };

  /**
   * Ordena los expedientes según la configuración actual
   */
  const sortedExpedientes = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return expedientes;
    }

    return [...expedientes].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [expedientes, sortConfig]);

  return {
    sortConfig,
    toggleSort,
    sortedExpedientes,
  };
};
