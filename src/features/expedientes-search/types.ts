export interface Expediente {
  id: string;
  expediente: string;
  juzgado: string;
  actoProcesal: string;
  fecha: string;
  estado: string;
}

export interface SearchFilters {
  juzgado: string;
  actoProcesal: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface ComboboxOption {
  value: string;
  label: string;
}
