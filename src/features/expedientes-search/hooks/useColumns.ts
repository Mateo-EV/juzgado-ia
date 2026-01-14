import { useState } from 'react';
import type { Expediente, ColumnConfig } from '@/features/expedientes-search/types';

// Configuración inicial de columnas visibles
const INITIAL_COLUMNS: ColumnConfig[] = [
  { key: 'Foliodocente', label: 'Expediente', visible: true, sortable: true },
  { key: 'Proceso', label: 'Proceso', visible: true, sortable: true },
  { key: 'Especialidad', label: 'Especialidad', visible: true, sortable: true },
  { key: 'Materia', label: 'Materia', visible: true, sortable: true },
  { key: 'acto_procesal', label: 'Acto Procesal', visible: true, sortable: true },
  { key: 'Fecha_descargo', label: 'Fecha Descargo', visible: true, sortable: true },
  { key: 'desc_estado', label: 'Estado', visible: true, sortable: true },
  { key: 'N_resolucion', label: 'N° Resolución', visible: true, sortable: true },
  { key: 'n_numero_pdf', label: 'Archivo PDF', visible: true, sortable: false },
  { key: 'Motivo_ingreso', label: 'Motivo Ingreso', visible: false, sortable: true },
  { key: 'Sub_especialidad', label: 'Subespecialidad', visible: false, sortable: true },
  { key: 's_resolucion', label: 'Resolución', visible: false, sortable: true },
  { key: 'hito_estadistico', label: 'Hito Estadístico', visible: false, sortable: true },
  { key: 'fin_y_sumilla', label: 'Sumilla', visible: false, sortable: true },
  { key: 'Claves', label: 'Apelación', visible: false, sortable: true },
  { key: 's_ruta_ftp', label: 'Ruta Archivo', visible: false, sortable: true },
];

/**
 * Hook personalizado para manejar la visibilidad de columnas en la tabla
 * Permite mostrar/ocultar columnas dinámicamente
 */
export const useColumns = () => {
  const [columns, setColumns] = useState<ColumnConfig[]>(INITIAL_COLUMNS);

  /**
   * Alterna la visibilidad de una columna
   */
  const toggleColumnVisibility = (key: keyof Expediente) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return {
    columns,
    toggleColumnVisibility,
  };
};
