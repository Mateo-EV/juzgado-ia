import { useState } from 'react';
import type { SearchFilters } from '@/features/expedientes-search/types';

// Función auxiliar: Obtener la fecha de hace una semana
const getOneWeekAgoDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
};

// Función auxiliar: Obtener la fecha actual
const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Hook personalizado para manejar el estado de los filtros
 * Gestiona los filtros de fecha (inicio y fin) y su aplicación
 */
export const useFilters = () => {
  const oneWeekAgo = getOneWeekAgoDate();
  const currentDate = getCurrentDate();

  // Estado de filtros actuales (en el formulario)
  const [filters, setFilters] = useState<SearchFilters>({
    fechaInicio: oneWeekAgo,
    fechaFin: currentDate,
  });

  // Estado de filtros aplicados (filtros activos en la búsqueda)
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    fechaInicio: oneWeekAgo,
    fechaFin: currentDate,
  });

  /**
   * Actualiza un campo específico de los filtros
   */
  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Aplica los filtros actuales a la búsqueda
   */
  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  return {
    filters,
    appliedFilters,
    updateFilter,
    applyFilters,
  };
};
