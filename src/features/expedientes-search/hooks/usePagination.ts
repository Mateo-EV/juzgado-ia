import { useState, useMemo } from 'react';
import type { Expediente } from '@/features/expedientes-search/types';

/**
 * Hook personalizado para manejar la paginación de expedientes
 * Divide los expedientes en páginas de tamaño fijo
 */
export const usePagination = (expedientes: Expediente[], itemsPerPage: number = 25) => {
  // Página actual (inicia en 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(expedientes.length / itemsPerPage);

  /**
   * Obtiene los expedientes de la página actual
   */
  const paginatedExpedientes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expedientes.slice(startIndex, endIndex);
  }, [expedientes, currentPage, itemsPerPage]);

  /**
   * Navega a una página específica
   */
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Reinicia la paginación a la primera página
   */
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedExpedientes,
    goToPage,
    resetPagination,
  };
};
