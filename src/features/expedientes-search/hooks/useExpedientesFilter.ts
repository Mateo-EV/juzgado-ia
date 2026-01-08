import { useState, useMemo, useEffect } from 'react';
import type { Expediente, SearchFilters, ComboboxOption, ColumnConfig, SortConfig } from '../types';
import expedientesData from '@/assets/datos.json';
import { juzgadosApi } from '../services/juzgadosApi';

// Función para obtener la fecha de hace un año
const getOneYearAgoDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().split('T')[0];
};

// Función para obtener la fecha actual
const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Configuración inicial de columnas visibles
const initialColumns: ColumnConfig[] = [
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

export const useExpedientesFilter = () => {
  const oneYearAgo = getOneYearAgoDate();
  const currentDate = getCurrentDate();

  const [filters, setFilters] = useState<SearchFilters>({
    juzgado: '',
    actoProcesal: '',
    especialidad: '',
    materia: '',
    proceso: '',
    estado: '',
    fechaInicio: oneYearAgo,
    fechaFin: currentDate,
  });

  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    juzgado: '',
    actoProcesal: '',
    especialidad: '',
    materia: '',
    proceso: '',
    estado: '',
    fechaInicio: oneYearAgo,
    fechaFin: currentDate,
  });

  // Estado para columnas visibles
  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns);

  // Estado para ordenamiento
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'Fecha_descargo',
    direction: 'desc',
  });

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Estado para los juzgados desde la API
  const [juzgadosFromApi, setJuzgadosFromApi] = useState<ComboboxOption[]>([]);
  const [isLoadingJuzgados, setIsLoadingJuzgados] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(false);

  const expedientes = expedientesData as Expediente[];

  // Cargar juzgados desde la API al montar el componente
  useEffect(() => {
    const cargarJuzgados = async () => {
      setIsLoadingJuzgados(true);
      
      // Verificar si la API está disponible
      const isAvailable = await juzgadosApi.verificarConexion();
      setApiAvailable(isAvailable);

      if (isAvailable) {
        // Si la API está disponible, obtener datos de ella
        const juzgados = await juzgadosApi.obtenerJuzgados();
        setJuzgadosFromApi(juzgados);
        console.log('✅ Juzgados cargados desde la API:', juzgados.length);
      } else {
        console.log('⚠️ API no disponible. Usando datos locales de datos.json');
      }
      
      setIsLoadingJuzgados(false);
    };

    cargarJuzgados();
  }, []);

  // Opciones de juzgados: usar API si está disponible, sino usar datos locales
  const juzgadosOptions = useMemo(() => {
    if (apiAvailable && juzgadosFromApi.length > 0) {
      return juzgadosFromApi;
    } else {
      const unique = [...new Set(expedientes.map((exp) => exp.juzgado))];
      return unique.map((j) => ({ value: j, label: j }));
    }
  }, [apiAvailable, juzgadosFromApi, expedientes]);

  const actosOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.acto_procesal))];
    return unique.map((a) => ({ value: a, label: a }));
  }, [expedientes]);

  const especialidadOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.Especialidad))];
    return unique.map((e) => ({ value: e, label: e }));
  }, [expedientes]);

  const materiaOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.Materia))];
    return unique.map((m) => ({ value: m, label: m }));
  }, [expedientes]);

  const procesoOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.Proceso))];
    return unique.map((p) => ({ value: p, label: p }));
  }, [expedientes]);

  const estadoOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.desc_estado))];
    return unique.map((e) => ({ value: e, label: e }));
  }, [expedientes]);

  // Filtrar expedientes basado en los filtros aplicados
  const filteredExpedientes = useMemo(() => {
    return expedientes.filter((expediente) => {
      // Filtro por juzgado
      if (appliedFilters.juzgado && expediente.juzgado !== appliedFilters.juzgado) {
        return false;
      }

      // Filtro por acto procesal
      if (appliedFilters.actoProcesal && expediente.acto_procesal !== appliedFilters.actoProcesal) {
        return false;
      }

      // Filtro por especialidad
      if (appliedFilters.especialidad && expediente.Especialidad !== appliedFilters.especialidad) {
        return false;
      }

      // Filtro por materia
      if (appliedFilters.materia && expediente.Materia !== appliedFilters.materia) {
        return false;
      }

      // Filtro por proceso
      if (appliedFilters.proceso && expediente.Proceso !== appliedFilters.proceso) {
        return false;
      }

      // Filtro por estado
      if (appliedFilters.estado && expediente.desc_estado !== appliedFilters.estado) {
        return false;
      }

      // Filtro por fecha inicio
      if (appliedFilters.fechaInicio && expediente.Fecha_descargo < appliedFilters.fechaInicio) {
        return false;
      }

      // Filtro por fecha fin
      if (appliedFilters.fechaFin && expediente.Fecha_descargo > appliedFilters.fechaFin) {
        return false;
      }

      return true;
    });
  }, [expedientes, appliedFilters]);

  // Ordenar expedientes
  const sortedExpedientes = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return filteredExpedientes;
    }

    return [...filteredExpedientes].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredExpedientes, sortConfig]);

  // Paginar expedientes
  const paginatedExpedientes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedExpedientes.slice(startIndex, endIndex);
  }, [sortedExpedientes, currentPage]);

  const totalPages = Math.ceil(sortedExpedientes.length / itemsPerPage);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    const emptyFilters = {
      juzgado: '',
      actoProcesal: '',
      especialidad: '',
      materia: '',
      proceso: '',
      estado: '',
      fechaInicio: oneYearAgo,
      fechaFin: currentDate,
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
  };

  const toggleSort = (key: keyof Expediente) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key, direction: 'asc' };
    });
  };

  const toggleColumnVisibility = (key: keyof Expediente) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para recargar juzgados desde la API
  const recargarJuzgados = async () => {
    setIsLoadingJuzgados(true);
    const juzgados = await juzgadosApi.obtenerJuzgados();
    setJuzgadosFromApi(juzgados);
    setIsLoadingJuzgados(false);
    console.log('🔄 Juzgados recargados:', juzgados.length);
  };

  return {
    filters,
    updateFilter,
    applyFilters,
    clearFilters,
    filteredExpedientes: paginatedExpedientes,
    totalFilteredCount: sortedExpedientes.length,
    juzgadosOptions,
    actosOptions,
    especialidadOptions,
    materiaOptions,
    procesoOptions,
    estadoOptions,
    isLoadingJuzgados,
    apiAvailable,
    recargarJuzgados,
    columns,
    toggleColumnVisibility,
    sortConfig,
    toggleSort,
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
  };
};
