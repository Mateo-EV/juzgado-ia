import { useState, useMemo, useEffect } from 'react';
import type { Expediente, SearchFilters, ComboboxOption } from '../types';
import expedientesData from '@/assets/datos.json';
import { juzgadosApi } from '../services/juzgadosApi';

// Función para obtener la fecha actual en formato YYYY-MM-DD
const getCurrentDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const useExpedientesFilter = () => {
  const currentDate = getCurrentDate();

  const [filters, setFilters] = useState<SearchFilters>({
    juzgado: '',
    actoProcesal: '',
    fechaInicio: currentDate,
    fechaFin: currentDate,
  });

  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    juzgado: '',
    actoProcesal: '',
    fechaInicio: currentDate,
    fechaFin: currentDate,
  });

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
      // Usar datos de la API
      return juzgadosFromApi;
    } else {
      // Fallback: usar datos locales
      const unique = [...new Set(expedientes.map((exp) => exp.juzgado))];
      return unique.map((j) => ({ value: j, label: j }));
    }
  }, [apiAvailable, juzgadosFromApi, expedientes]);

  const actosOptions = useMemo(() => {
    const unique = [...new Set(expedientes.map((exp) => exp.actoProcesal))];
    return unique.map((a) => ({ value: a, label: a }));
  }, [expedientes]);

  // Filtrar expedientes basado en los filtros aplicados
  const filteredExpedientes = useMemo(() => {
    return expedientes.filter((expediente) => {
      // Filtro por juzgado
      if (appliedFilters.juzgado && expediente.juzgado !== appliedFilters.juzgado) {
        return false;
      }

      // Filtro por acto procesal
      if (appliedFilters.actoProcesal && expediente.actoProcesal !== appliedFilters.actoProcesal) {
        return false;
      }

      // Filtro por fecha inicio
      if (appliedFilters.fechaInicio && expediente.fecha < appliedFilters.fechaInicio) {
        return false;
      }

      // Filtro por fecha fin
      if (appliedFilters.fechaFin && expediente.fecha > appliedFilters.fechaFin) {
        return false;
      }

      return true;
    });
  }, [expedientes, appliedFilters]);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      juzgado: '',
      actoProcesal: '',
      fechaInicio: currentDate,
      fechaFin: currentDate,
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
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
    filteredExpedientes,
    juzgadosOptions,
    actosOptions,
    isLoadingJuzgados,
    apiAvailable,
    recargarJuzgados,
  };
};
