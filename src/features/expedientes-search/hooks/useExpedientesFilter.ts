import { useMemo } from 'react';
import type { Expediente, SearchFilters } from '@/features/expedientes-search/types';
import expedientesData from '@/assets/datos.json';
import { useFilters } from '@/features/expedientes-search/hooks/useFilters';
import { useSorting } from '@/features/expedientes-search/hooks/useSorting';
import { usePagination } from '@/features/expedientes-search/hooks/usePagination';
import { useColumns } from '@/features/expedientes-search/hooks/useColumns';

/**
 * Filtra los expedientes según el rango de fechas
 */
const filterExpedientesByDate = (
  expedientes: Expediente[],
  filters: SearchFilters
): Expediente[] => {
  return expedientes.filter((expediente) => {
    // Filtro por fecha inicio
    if (filters.fechaInicio && expediente.Fecha_descargo < filters.fechaInicio) {
      return false;
    }

    // Filtro por fecha fin
    if (filters.fechaFin && expediente.Fecha_descargo > filters.fechaFin) {
      return false;
    }

    return true;
  });
};

/**
 * Hook principal para gestionar el sistema de búsqueda de expedientes
 * Coordina filtros, ordenamiento, paginación y columnas
 */
export const useExpedientesFilter = () => {
  // Datos de expedientes
  const expedientes = expedientesData as Expediente[];

  // Gestión de filtros
  const { filters, appliedFilters, updateFilter, applyFilters } = useFilters();

  // Filtrar expedientes por fecha
  const filteredExpedientes = useMemo(
    () => filterExpedientesByDate(expedientes, appliedFilters),
    [expedientes, appliedFilters]
  );

  // Gestión de ordenamiento
  const { sortConfig, toggleSort, sortedExpedientes } = useSorting(filteredExpedientes);

  // Gestión de paginación
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedExpedientes,
    goToPage,
    resetPagination,
  } = usePagination(sortedExpedientes);

  // Gestión de columnas
  const { columns, toggleColumnVisibility } = useColumns();

  /**
   * Aplica los filtros y reinicia la paginación
   */
  const handleApplyFilters = () => {
    applyFilters();
    resetPagination();
  };

  return {
    // Filtros
    filters,
    updateFilter,
    applyFilters: handleApplyFilters,
    
    // Datos
    filteredExpedientes: paginatedExpedientes,
    totalFilteredCount: sortedExpedientes.length,
    
    // Columnas
    columns,
    toggleColumnVisibility,
    
    // Ordenamiento
    sortConfig,
    toggleSort,
    
    // Paginación
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
  };
};
