export interface Expediente {
  id: string;
  Foliodocente: string; // Expediente
  Motivo_ingreso: string; // Motivo de ingreso
  Proceso: string; // Proceso
  Especialidad: string; // Especialidad
  Sub_especialidad: string; // Subespecialidad
  Materia: string; // Materia
  N_resolucion: string; // N° Resolución
  s_resolucion: string; // Resolución o "Tipo Crimen de resolución"
  acto_procesal: string; // Acto procesal
  hito_estadistico: string; // Hito estadístico
  Fecha_descargo: string; // Fecha de descargo (ISO date)
  desc_estado: string; // Estado (causado o si aplica)
  fin_y_sumilla: string; // Sumilla
  Claves: string; // Condición de apelación (¿Apelado? / No apelado?)
  n_numero_pdf: string; // Archivo PDF
  s_ruta_ftp: string; // Ruta del archivo (opcional, puede mostrarse solo si diario)
  juzgado: string; // Para mantener compatibilidad
}

export interface SearchFilters {
  juzgado: string;
  actoProcesal: string;
  especialidad: string;
  materia: string;
  proceso: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ColumnConfig {
  key: keyof Expediente;
  label: string;
  visible: boolean;
  sortable: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: keyof Expediente | null;
  direction: SortDirection;
}
